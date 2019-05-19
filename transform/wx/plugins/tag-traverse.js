/*
 * html5标准的tag转换成微信小程序的tag
 * 比如标注你的是<img>标签  我们转换成 <image>
 * data注释的转换
 * */
const generate = require('@babel/generator').default;
const Utils = require('../utils/index.js');

const AttributeMapping = {
    "onClick": {
        name: "bindtap"
    },
    "className": {
        name: "class"
    },
    "allin-v-for-item": {
        name: "wx:for-item"
    },
    "allin-v-for-index": {
        name: "wx:for-index"
    },
    "allin-v-for": {
        name: "wx:for"
    }
}

module.exports = function (babel) {
    const {types: t, template: tp} = babel;
    const jsxTag = {
        "img": {name: "image"},
        "Button": {name: "button"},
        "ALLIN-V-block": {name: "block"}
    };
    const TEMPLATE = tp("{ s.s.INSATNCE.hello() }"); // OCSuper对象模板

    return {
        //jsxTag变换
        replaceTag: function (path) {
            if (path.get("name").isJSXIdentifier()) {
                let targetPath = path.get("name");
                let tagName = targetPath.node.name;
                if (jsxTag[tagName]) {
                    let name = jsxTag[tagName].name;
                    targetPath.node.name = name;
                }

            }
        },
        replaceDataBinding: function (path) {
            //映射方法名字
            if (AttributeMapping[path.get("name").node.name]) {
                path.get("name").node.name = AttributeMapping[path.get("name").node.name].name;
            }
        },
        replaceAttributeExpression: function (path) {
            let targetPath = path.get("expression");
            path.traverse(
                {
                    MemberExpression: function (path) {
                        if (Utils.isThisStateExpression(path)) {
                            path.replaceWith(t.identifier(path.get("property").node.name))
                        }
                    }
                }
            )

            let selfReplacePath;
            if (Utils.isThisMethodsExpression(targetPath) || Utils.isThisStateExpression(targetPath)) {
                selfReplacePath = "{" + targetPath.get("property").node.name + "}";
                // path.replaceWith(t.stringLiteral("{{" + targetPath.get("property").node.name + "}}"));
            }else if(Utils.isThisExpression(targetPath)){
                console.log(4123123123123);
                selfReplacePath = "{" + targetPath.get("property").node.name + "}";
            } else {
                selfReplacePath = generate(path.node).code;
            }

            let parentPath = path.parentPath;
            // if(path.parentPath.isJSXElement()){
            //     console.log("isJSXElement");
            //     console.log(targetPath.get("property").node.name);
            // }else{
            //     console.log("is not JSXElement");
            //     console.log(targetPath.get("property").node.name);
            // }
            // parentPath.unshiftContainer("children",t.identifier("{"));
            // path.replaceWith(t.stringLiteral("{{" + targetPath.get("property").node + "}}"));

            if (parentPath.isJSXElement() && parentPath.node["children"].length > 0) {
                // // console.log("isJSXElement");
                // // console.log(targetPath.get("property").node.name);
                // // console.log(parentPath.node["children"].length);
                // parentPath.unshiftContainer("children",t.identifier("{"));
                // parentPath.pushContainer("children",t.identifier("}"));
                path.replaceWith(t.identifier(`{${selfReplacePath}}`));
            } else if (Utils.isEventAttribute(parentPath)) {
                path.replaceWith(t.stringLiteral(`${selfReplacePath.replace("{","").replace("}","")}`));
            } else {
                path.replaceWith(t.stringLiteral(`{${selfReplacePath}}`));
            }
        }
    }
}
