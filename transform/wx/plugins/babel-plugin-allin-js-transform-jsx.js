/**
 * aljsx  转微信小程序  wxml
 */
const _ = require("lodash");

const wxTagTraverse = require("./tag-traverse");

module.exports = function (babel) {
    const {types: t, template: tp} = babel;
    let tagFormat=wxTagTraverse(babel);
    const MyVisitor = {
        ExportDefaultDeclaration:function(path){
          path.remove();
        },
        JSXOpeningElement:function(path){
            //将一些h5标签转换成wx支持的
            tagFormat.replaceTag(path);
        },
        JSXClosingElement:function(path){
            //将一些h5标签转换成wx支持的
            tagFormat.replaceTag(path);
        },
        JSXAttribute:function(path){
            //attribute的databinding重置
            tagFormat.replaceDataBinding(path);
        },
        ImportDeclaration:function(path,state) {
            //如果引入components
            let name = _.get(state,"opts.filename");
            if(path.get("source").node.value.indexOf("components/")>-1){
                let val = path.get("source").node.value;
                let key = path.get("specifiers")[0].get("local").node.name;
                val = val.split("/").filter(el=>el!=="."&&el!=="..").join("/");
                val = val.startsWith("/")?val:"/"+val;
                state.opts.components[key]=val;
            }
            path.remove();
        },
        ReturnStatement:function(path){
            // path.get("argument").
            //     t.ExpressionStatement.
            // console.log(123);
            let jsxExpression = t.expressionStatement(path.get("argument").node);
            // console.log(jsxExpression.length);
            let programPath = path.findParent((path) => path.isProgram());
            // programPath.replaceWith(t.expressionStatement())
            // console.log(programPath.get("body").length);
            programPath.get("body").forEach(function(el){
                el.remove();
            });
            programPath.pushContainer("body",jsxExpression);
        }

    }
    return {
        visitor: MyVisitor
    };
};
