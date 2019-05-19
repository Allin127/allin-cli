/*
 * html5标准的tag转换成微信小程序的tag
 * 比如 class MyPage extends Page => Page({...})
 * */
const chalk = require('chalk');
const platformNotSupportPathRemove = require('../../common/util').platformNotSupportPathRemove("wx");
const isSetStateExpression = require('../utils').isSetStateExpression;
const isThisStateExpression = require('../utils').isThisStateExpression;


module.exports = function (babel) {
    const {types: t, template: tp} = babel;
    //Page的Class转换
    //react的ClassMethod映射成对应的方法名称
    let appMethodName =  {
        "constructor":{value:"onLaunch"},
        "componentDidMount": {value: "onShow"},
        "componentWillUnmount": {value: "onHide"}
    };


    let pageMethodName =
        {
            "constructor":{value:"onLoad",params:["options"]},
            "componentDidMount": {value: "onShow"},
            // "componentDidUpdate": {value: "onShow",params:["prevProps"]},
            "componentWillUnmount": {value: "onUnload"}
        };
    let componentMethodName =
        {
            "constructor": {value: "created"},
            "componentDidMount": {value: "attached"},
            "componentDidUpdate": {value: "ready",params:["prevProps"]},
            "componentWillUnmount": {value: "detached"}
        };

    // const decoratorHandler =  function(path){
    //
    // }

    //根据配置将classMethod替换成对应的object方式
    const classMethodReplacementVisitor = function (config) {
        let _config = config;
        return {
            ClassMethod: function (path) {
                // let decorators = path.get("decorators");
                // if(decorators.length) {
                //     let value = decorators[decorators.length - 1].get("expression").node.name;
                //     //存在特定平台支持标签，则删除这个方法并停止执行
                //     if(isAllinSupportDecorator(value)&&!isSupportWX(value)){
                //         path.remove();
                //         return;
                //     }
                // }

                if(platformNotSupportPathRemove(path)) return;

                let targetPath = path.get("key");
                let willReplaceParamsArray = [];
                if(_config[targetPath.node.name]&&_config[targetPath.node.name].params){
                    console.log(_config[targetPath.node.name].params);
                    _config[targetPath.node.name].params.forEach(function (el,index) {
                        willReplaceParamsArray.push(t.identifier(el));
                    })
                }
                console.log(targetPath.node.name,_config[targetPath.node.name],willReplaceParamsArray);


                if (_config[targetPath.node.name] && _config.hasOwnProperty(targetPath.node.name)) {
                    targetPath.replaceWith(t.identifier(_config[targetPath.node.name].value));
                }

                let expression = t.functionExpression(undefined, willReplaceParamsArray, path.get("body").node);
                let property = t.objectProperty(t.identifier(path.get("key").node.name), expression);
                this.appendChild(property);
            },
            ClassProperty: function(path){
                if(platformNotSupportPathRemove(path)) return;
                // let expression = t.objectExpression(path.get("body").node);
                let key = path.get("key").node.name;
                if(key =="state"){
                    key="data";
                }
                let property = t.objectProperty(t.identifier(key), path.node.value);

                // console.log(123,path.get("key").node.name,path.node.value)
                this.appendChild(property);
            },
            CallExpression: function (path) {
                if (path.get("callee").node.type == "Super") {
                    console.log(chalk.red("find super call in code,Please check"));
                    path.remove();
                }
                if(isSetStateExpression(path)){
                    path.get("callee").get("property").node.name="setData"
                }
            },
            MemberExpression:function(path){
                if (path.get("object").node.name == "CrossPlatformAPI") {
                    path.get("object").node.name = "wx";
                }
                if(isThisStateExpression(path)){
                    path.get("object").get("property").node.name="data";
                }
            },
            ArrowFunctionExpression:function(path){
                path.node.type = "FunctionExpression";
            }
        }
    };

    let formatClass = function(targetName,targetVisitor){
        return function(path){
            let objectProperties = [];
            path.traverse(targetVisitor, {
                appendChild: function (child) {
                    objectProperties.push(child);
                }
            });
            let arguments = [t.objectExpression(objectProperties)];
            path.replaceWith(t.expressionStatement(t.callExpression(t.identifier(targetName), arguments)));
        }
    };

    let pageClassVisitor = classMethodReplacementVisitor(pageMethodName);
    let componentClassVisitor = classMethodReplacementVisitor(componentMethodName);
    let appClassVisitor = classMethodReplacementVisitor(appMethodName);


    
    //Class的表述方式改成小程序App({...})方式
    let formatAppClass = formatClass("App",appClassVisitor);
    //Class的表述方式改成小程序Component({...})方式
    let formatComponentClass = formatClass("Component",componentClassVisitor);
    //Class的表述方式改成小程序Page({...})方式
    let formatPageClass = formatClass("Page",pageClassVisitor);



    // let formatPageClass = function (path) {
    //     let objectProperties = [];
    //     path.traverse(pageClassVisitor, {
    //         appendChild: function (child) {
    //             objectProperties.push(child);
    //         }
    //     });
    //     let arguments = [t.objectExpression(objectProperties)];
    //     path.replaceWith(t.expressionStatement(t.callExpression(t.identifier("Page"), arguments)));
    // };
    //
    //
    //
    // let formatComponentClass = function (path) {
    //     let objectProperties = [];
    //     path.traverse(componentClassVisitor, {
    //         appendChild: function (child) {
    //             objectProperties.push(child);
    //         }
    //     });
    //     let arguments = [t.objectExpression(objectProperties)];
    //     path.replaceWith(t.expressionStatement(t.callExpression(t.identifier("Component"), arguments)));
    // };


    //Component的Class转换
    //格式一定要是formatXXXClass  (XXX对应extends类型)
    return {
        formatAppClass,
        formatPageClass,
        formatComponentClass
    }
}