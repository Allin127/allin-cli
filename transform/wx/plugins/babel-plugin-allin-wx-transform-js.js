/**
 * js  转微信小程序  js
 */
const _ = require('lodash');
const wxTagTraverse = require("./tag-traverse");
const wxClassTraverse = require("./class-traverse");

//将import的pageUrl格式化成wx需要的url格式
let formatImportPageUrlToWxConfig = function(path){
    let _path = path.replace(".js","").split("/").filter((nm)=>nm!==".").join("/");
    _path = _path.startsWith("/")?_path.substring(1,_path.length):_path;
    return _path;
}

module.exports = function (babel) {
    const {types: t, template: tp} = babel;
    let tagFormat=wxTagTraverse(babel);
    let classFormat=wxClassTraverse(babel);
    const MyVisitor = {
        ExportDefaultDeclaration:function(path){
            path.remove();
        },
        ExportNamedDeclaration:function (path) {
            path.remove();
        },
        ImportDeclaration:function (path,state) {
            let name = _.get(state,"opts.filename");
            //只有app的文件需要存储对应的import功能
            if(name === "app" && path.get("source").node.value.indexOf("pages/")>-1){
                state.opts.appPages.push(formatImportPageUrlToWxConfig(path.get("source").node.value));
            }
            path.remove();
        },
        ClassDeclaration:function(path){
            let superClass = path.get("superClass")?path.get("superClass").node.name:"";
            if(superClass&&classFormat[`format${superClass}Class`]){
                classFormat[`format${superClass}Class`](path);
            }
          },
        ObjectProperty:function(path){
          // console.log("demo");
        }

    }
    return {
        visitor: MyVisitor
    };
};
