var path = require('path')
var ddl = require("../db/grammar")
var batis = require("../db/batis")

const DOMAIN = "caster";
module.exports = function(cmd){
    //ddl转换
    cmd.command(`${DOMAIN}:ddl [filePath] `).
    usage('[filePath] \n' +
        '\t filePath:ddl的源头json\n'
    ).
    action(function (filePath) {
        ddl(path.resolve(process.cwd(),filePath));
    });

    //batis工具生成
    cmd.command(`${DOMAIN}:batis`).
    action(function () {
        batis();
    });
};