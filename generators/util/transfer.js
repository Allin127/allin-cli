const babel = require("@babel/core");
const _ = require("lodash");
const {types: t, template: tp} = babel;

let Utility = {
    ObjectKey(val){
        return val.indexOf("-") > -1 ? t.StringLiteral(val) : t.Identifier(val);
    }

}


module.exports = function (configContent,topScope) {
    const visitor = {
        AssignmentExpression: function (path) {
            let walk = function (elms, fn, option = {}) {
                let keys = Object.keys(elms);
                let properties = [];
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let val = elms[key];
                    if (_.isPlainObject(val)) {
                        if (option.isArray) properties.push(walk(val, __props => t.ObjectExpression(__props)));
                        else properties.push(t.ObjectProperty(Utility.ObjectKey(key), walk(val, __props => t.ObjectExpression(__props))));
                    } else if (_.isArray(val)) {
                        console.log("arrayTransfer");
                        properties.push(t.ObjectProperty(Utility.ObjectKey(key), walk(val, __props => {
                                return t.ArrayExpression(__props);
                            }, {isArray: true}))
                        );
                    } else {
                        if (option.isArray) {
                            console.log("array value");
                            properties.push(t.Identifier(val));
                        } else {
                            console.log("object value");
                            properties.push(t.ObjectProperty(Utility.ObjectKey(key), t.Identifier(val)));
                        }

                    }
                }
                return fn(properties);
            }


            let result = walk(configContent, function (__properties) {
                return t.ObjectExpression(__properties)
            });

            path.get('right').replaceWith(result);

            topScope.forEach(function(el){
                path.insertBefore(t.Identifier(el));
            });


            // Object.keys(configContent).forEach(function(key){
            //     console.log(configContent[key]);
            //
            // });
            // console.log(path.get('right').pushContainer('properties', t.expressionStatement(t.stringLiteral('after'))));
            // var callee  = path.node.callee;
            // var callee_name;
            // var callee_obj;
            // if (t.isMemberExpression(callee)){
            //     if (t.isIdentifier(callee.property) ){
            //         callee_name =  t.stringLiteral(callee.property.name);
            //     }
            //     callee_obj = callee.object;
            //     var args = path.node.arguments;
            //     if (callee_name != null){
            //         args.unshift(callee_name);
            //     }
            //     path.node.callee =  t.memberExpression(callee_obj, t.identifier(method_name))
            // }

        }
    }
    return {
        visitor
    }
}
