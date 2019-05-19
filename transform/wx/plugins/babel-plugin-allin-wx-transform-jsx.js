/**
 * aljsx  转微信小程序  wxml
 */
const _ = require("lodash");
const Utils = require('../utils/index.js');
const wxTagTraverse = require("./tag-traverse");

module.exports = function (babel) {
    const {types: t, template: tp} = babel;
    let tagFormat = wxTagTraverse(babel);
    const MyVisitor = {
        ExportDefaultDeclaration: function (path) {
            path.remove();
        },
        JSXOpeningElement: function (path) {
            //将一些h5标签转换成wx支持的
            tagFormat.replaceTag(path);
        },
        JSXClosingElement: function (path) {
            //将一些h5标签转换成wx支持的
            tagFormat.replaceTag(path);
        },
        JSXAttribute: function (path) {
            //attribute的databinding重置
            tagFormat.replaceDataBinding(path);
        },
        JSXExpressionContainer: function (path) {
            tagFormat.replaceAttributeExpression(path);
        },
        ImportDeclaration: function (path, state) {
            //如果引入components
            let name = _.get(state, "opts.filename");
            if (path.get("source").node.value.indexOf("components/") > -1) {
                let val = path.get("source").node.value;
                let key = path.get("specifiers")[0].get("local").node.name;
                val = val.split("/").filter(el => el !== "." && el !== "..").join("/");
                val = val.startsWith("/") ? val : "/" + val;
                state.opts.components[key] = val;
            }
            path.remove();
        },
        ReturnStatement: function (path) {
            //TODO: 这个会影响重复解析？
            // console.log("return");
            let jsxExpression = t.expressionStatement(path.get("argument").node);
            let programPath = path.findParent((path) => path.isProgram());
            programPath.get("body").forEach(function (el) {
                el.remove();
            });
            //换种方式，下面的方式会重绘
            programPath.node["body"].push(jsxExpression);
            //TODO:造成重新解析，我日日日
            // programPath.pushContainer("body",jsxExpression);
        }
    }
    return {
        visitor: MyVisitor
    };
};
