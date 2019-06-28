var exec = require('child_process').exec;
var chalk = require('chalk');
module.exports = function (source,dest,mainClassPath) {
    let callback =  function (error, stdout, stderr){
        console.log(chalk.green('stdout: ' + stdout));
        if(error !== null){
            console.log(chalk.red('exec error: ' + error));
        }
    };
    if(mainClassPath){ //指定mainClass
        exec('java -classpath lib-tool.jar '+mainClassPath,callback);
    }else{//默认的mainClass执行
        exec(`java -jar lib-tool.jar ${source} ${dest}`,callback);
    }
};
