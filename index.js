const path = require("path");//path parser
const chalk = require("chalk"); //formatter
const pkg = require("./package.json");
const cmd = require("commander");//命令行工具
var logger = require('tracer').console();
const generatorCmd = require("./generators/cmd"); // 生成模板的cmd


const transform = require("./generators/util/transform");
const command = require("./command");
const casterCommand = require("./caster/command")(cmd);

const {rename, readDir, readFile,writeFile} = require("./utils/helper");
const gitClone = require('gitclone');
const {Functor} = require('./utils/Functor')
// var process = require('child_process');

// version
cmd.command('version').action(function () {
    console.log("version is " + chalk.red(pkg.version));
});

// Useful Skills!!! al test 触发 bin/al-test.js
cmd.command('test', 'test sub commander');




//初始化webpack项目
cmd.command('init [projectName]')
    .usage('[projectName] \n' +
        '\t projectName:项目文件夹名字\n'
    ).action(function (projectName) {
    if (projectName)
        generatorCmd.init(projectName);
    else
        logger.error("projectName 不能为空");
});

//启动调试webpack项目
cmd.command('start')
    .option('-p, --production', 'development tag')
    .action(function (cmd) {
        generatorCmd.start(!!cmd.production);
    });

//打包
cmd.command('build')
    .action(function () {
        generatorCmd.start(true);
    });

//al transform wx 转换微信小程序的格式
cmd.command('format [project]')
    .usage('[project] \n' +
        '\t 转换对应的项目wx\n'
    ).action(function () {
    command.format();
});

//工具
cmd.command('rename <directory> <source> <replacement>')
    .usage('<directory> <source> <replacement> \n' +
        '\t 搜索某个文件夹下的文件名一部分replace成制定内容\n' +
        '\t directory:轮询的目录 \n' +
        '\t source:被替换的string \n' +
        '\t replacement:替换成string \n' +
        '\t allin rename ~/workspace/ AL ALBase\n'
    ).option('-r, --recursive', 'Remove recursively')
    .action(function (dir, source, replacement, cmd) {
        let __path = path.resolve(process.cwd(), "../", dir);
        console.log(`读取文件${chalk.green.bold(__path)}`);
        //read&replace
        Functor.of(__path)
            .map(readDir)
            .map(rename(source, replacement));
    });

var babel = require("@babel/core");
// var traverse = require("@babel/traverse").default;
// var generator = require("@babel/generator").default;

cmd.command('demo [option] [option2]')
    .option('-t, --test', 'test router')
    .action(function (option, option2, cmd) {
        logger.log('start');
        // console.log(cmd.t); // -的选择
        // console.log(option); // 额外参数
        // console.log(option2); //额外参数2
        let funx = require("./transform/wx");
        funx(option);
        logger.log('end');
    });

cmd.command('yuyu')
    .action(function (option) {
        logger.log('start');
        let funx = require("./transform/wx");
        funx(option);
        logger.log('end');
    });

cmd.command('transform')
    .option('-t, --test', 'test router').action(function (cmd, source, replacement) {
    console.log(cmd.test);
    let configContent = require(path.resolve(__dirname, ".yo-rc2.json"));
    let patch = cmd.test ? require('./generators/util/transfer2') : require('./generators/util/transfer');
    const {code} = babel.transform("module.exports={}", {
        // presets:["flow"],
        plugins: [patch(configContent)]
    });
    //     this.callback(null,code);
    // }
    console.log(code);
    // traverse(ast, {
    //     enter(path) {
    //         if (path.isAssignmentExpression()) {
    //             // console.log(path.node.specifiers.forEach(function(el,index,elms){
    //             //     console.log(el);
    //             // }));
    //             // value
    //             path.traverse({
    //                 //默认import
    //                 ObjectExpression(path){
    //                     console.log(path.insert);
    //                     path.get('body').pushContainer('body', t.expressionStatement(t.stringLiteral('after')));
    //
    //                 }
    //             })
    //             //source
    //            // console.log(path.node.source.value);
    //
    //             // path.node.name = "x";
    //         }
    //     }
    // });
    //
    // console.log(generator(ast));

    //al transform wx 转换微信小程序的格式

});


cmd.parse(process.argv);