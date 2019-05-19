
let babel = require("@babel/core");
let _ = require("lodash");
module.exports = function(configContent) {
    const {types:t,template:tp} = babel;
    const visitor = {
        AssignmentExpression: function(path){
            // path.get('right').pushContainer('properties', t.ExpressionStatement(t.StringLiteral('after')));
            path.get('right').pushContainer('properties',
                t.ObjectProperty(t.StringLiteral('after-key'),
                t.ArrayExpression([t.Identifier('after'), t.StringLiteral('after'), t.StringLiteral('after')])));
            path.get('right').pushContainer('properties',
                t.ObjectProperty(t.StringLiteral('after-key'),
                    t.ArrayExpression([t.Identifier('after')])));
            // path.get('right').pushContainer('properties', t.ObjectProperty(t.identifier("ss"),t.ObjectExpression([t.ObjectProperty(t.Identifier('after-key'),t.stringLiteral('after'))])));

        }
    }
    return {
        visitor
    }
}