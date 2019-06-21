const {createDir, readDir, readFile, writeFile, packageToPath} = require("../../../utils/helper");
const _ = require('lodash');
const path = require('path');
const readLine = require('readline');
const fs = require('fs');
module.exports = function () {
    /** 1. 根据tempalate和配置生成generatorConfig.xml **/
    const cwd = process.cwd();
    let template = readFile(path.resolve(cwd,"template", "generatorConfig-template.xml"));
    const config = JSON.parse(readFile(path.resolve(cwd, "config.json")));
    _.forEach(config, function (value, key) {
        template = template.replace(new RegExp("\\$\{" + key + "\}", "gm"), value);
    });
    writeFile(path.resolve(cwd, "generatorConfig.xml"), template);

    /** 2. 执行shell脚本来生成file **/
    var childProcess = require('child_process');
    (new Promise(function (resolve, reject) {
        childProcess.execFile('./generator.sh', [], null, function (err, stdout, stderr) {
            if (err) {
                reject('error');
            } else {
                resolve('success')
            }
        });
    })).then(function (result) {
        return new Promise(function (resolve, reject) {
            /** 3. format dao下面的文件 因为需要lombok的 builder方便使用，当然也可以不用这么做，具体配置看DaoModifiers **/
            let files = readDir(path.resolve(cwd, "src"));
            const daoFiles = files.filter(path => path.indexOf("/dao/") > 0);
            let successCount=0;
            daoFiles.forEach(function (daoFilePath) {
                var lineReader = readLine.createInterface({
                    input: fs.createReadStream(daoFilePath)
                });
                let contents = [];
                let daoModifiers = require("./DaoModifiers").slice(0);//要copy，否则每次 require都是同一个对象
                let modifier = daoModifiers.shift();
                lineReader.on('line', function (line) {
                    contents.push(line);
                    if (modifier) {
                        let _testModifier = function(_modifier){
                            if(_modifier.testReg.test(line)){
                                if (_modifier.mode === "after") {
                                    contents.push(_modifier.content);
                                } else if (_modifier.mode === "before") {
                                    contents.splice(contents.length - 1, 0, _modifier.content);
                                }
                                return true;
                            }
                        }
                        if(modifier.length>0){
                            for (let _index in modifier){
                               if(_testModifier(modifier[_index])){
                                   modifier = daoModifiers.shift();
                                   break;
                               }
                            }
                        }else{
                            if(_testModifier(modifier)){
                                modifier = daoModifiers.shift();
                            }
                        }
                    }
                });
                lineReader.on('close', function () {
                    writeFile(daoFilePath, contents.join("\n"));
                    successCount++;
                    if(successCount===daoFiles.length){
                        resolve("success");
                    }
                });
            });
        });
    }).then(function (result) {
        /** 4. config模板文件生成 **/
        if(config.isConfigDatabase) {
            let dbConfigFileName = 'DatabaseConfiguration.java';
            let dbConfig = readFile(path.resolve(cwd, 'template', dbConfigFileName));
            _.forEach(config, function (value, key) {
                dbConfig = dbConfig.replace(new RegExp("\\$\{" + key + "\}", "gm"), value);
            });
            let dbConfigDir = path.resolve(cwd, `src/main/java/${packageToPath(config["java.package"])}/config/`);
            childProcess.spawnSync('mkdir', ['-p', dbConfigDir]);
            writeFile(path.resolve(dbConfigDir, dbConfigFileName), dbConfig);
        }
        /** 5. copy到java对应项目下 **/
        if (config['project.root'])
            childProcess.spawnSync('cp', ['-r', path.resolve(cwd, 'src'), config['project.root']]);
    });
};
