var path = require('path')
var ddl = require("../db/grammar")
var batis = require("../db/batis")
var gradleCacheTransform = require("../gradle/cache")


const DOMAIN = "caster";
module.exports = function(cmd){
    /** ddl转换 **/
    cmd.command(`${DOMAIN}:ddl-path [filePath] `).
    usage('[filePath] \n' +
        '\t filePath:ddl的源头json配置\n'
    ).
    action(function (filePath) {
        ddl({path:path.resolve(process.cwd(),filePath)});
    });

    cmd.command(`${DOMAIN}:ddl [data] `).
    usage('[data] \n' +
        '\t data:ddl的源头json数据\n'
    ).
    action(function (data) {
        ddl({data});
    });

    /** batis-generator 和 code-less命令一样 **/
    let codeLess = function(){
        batis();
    }
    cmd.command(`${DOMAIN}:batis`).
    action(codeLess);
    cmd.command(`${DOMAIN}:code-less`).
    action(codeLess);



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
};