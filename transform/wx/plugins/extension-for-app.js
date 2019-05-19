const platformNotSupportPathRemove = require('../../common/util').platformNotSupportPathRemove("wx");

//删除一些不必要的非支持平台的代码
module.exports = function (babel) {
    const {types: t, template: tp} = babel;
    const MyVisitor = {
        VariableDeclaration:function(path){
            platformNotSupportPathRemove(path);
        },
        ExpressionStatement:function(path){
            platformNotSupportPathRemove(path);
        }
    }
    return {
        visitor: MyVisitor
    };
};
