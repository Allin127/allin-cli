var path = require('path')
var ddl = require("../db/grammar")
var batis = require("../db/batis")
var gradleCacheTransform = require("../gradle/cache")


const DOMAIN = "caster";
module.exports = function(cmd){
    /** ddl转换 **/
    cmd.command(`${DOMAIN}:ddl [filePath] `).
    usage('[filePath] \n' +
        '\t filePath:ddl的源头json\n'
    ).
    action(function (filePath) {
        ddl(path.resolve(process.cwd(),filePath));
    });

    /** batis-generator **/
    cmd.command(`${DOMAIN}:batis`).
    action(function () {
        batis();
    });

    /** gradle的本地cache转换成maven本地 **/
    cmd.command(`${DOMAIN}:gradle-cache-transfer <source> <dest>`).
    usage('[source] \n' +
        '\t source:gradle cache的目录\n' +
        '[dest] \n' +
        '\t dest: maven转换的路径\n').
    option('-c, --classPath <mainClass>','class path').
    action(function (source,dest,cmd) {
        gradleCacheTransform(source,dest,cmd.classPath);
    });

    /** 后台自动创建service resource batis **/
    cmd.command(`${DOMAIN}:code-less`).
    usage('[source] \n' +
        '\t source:gradle cache的目录\n' +
        '[dest] \n' +
        '\t dest: maven转换的路径\n').
    option('-c, --classPath <mainClass>','class path').
    action(function (source,dest,cmd) {
        gradleCacheTransform(source,dest,cmd.classPath);
    });
};