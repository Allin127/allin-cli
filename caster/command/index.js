var path = require('path')
var ddl = require("../db/grammar")
var batis = require("../db/batis")
var gradleCacheTransform = require("../gradle/cache")


const DOMAIN = "caster";
module.exports = function (cmd) {
    /** 将json格式转换成ddl可执行sql **/
    cmd.command(`${DOMAIN}:ddl-path [filePath]`)
        .description("将json格式转换成ddl可执行sql")
        .usage('\n\n \t[filePath] \t filePath:ddl的源头json配置文件路径\n\n')
        .action(function (filePath) {
            ddl({path: path.resolve(process.cwd(), filePath)});
        });

    cmd.command(`${DOMAIN}:ddl [data]`)
        .description("将json格式转换成ddl可执行sql")
        .usage('\n\n \t[data] \t data:ddl的源头json数据\n\n')
        .action(function (data) {
            ddl({data});
        });

    /** batis-generator 和 code-less命令一样 **/
    let codeLess = function () {
        batis();
    };
    cmd.command(`${DOMAIN}:batis`)
        .description("执行batis转换工程")
        .action(codeLess);
    cmd.command(`${DOMAIN}:code-less`)
        .description("执行batis转换工程")
        .action(codeLess);


    /** gradle的本地cache转换成maven本地 **/
    cmd.command(`${DOMAIN}:gradle-cache-transfer <source> <dest>`)
        .description("gradle的本地cache转成maven本地库，.gradle -> .m2")
        .usage('\n\n \t[source]  \t source:gradle cache的目录'
                +'\n \t[dest]    \t dest: maven转换的路径')
        .option('-c, --classPath <mainClass>', 'class path').action(function (source, dest, cmd) {
        gradleCacheTransform(source, dest, cmd.classPath);
    });
};