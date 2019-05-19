/*
 * {
 *   KEY:{
 *   name:"" //to replace name
 *  }
 * }
 * */


const ALLIN_SUPPORT_PREFIX = "allin_support"


// 目前支持wx,h5
function platformSupportDecorator(platform) {
    // 是合法，也是符合平台的
    return function (decorator) {
        if (isAllinSupportDecorator(decorator)&&decorator.split("_").filter(el => el === platform).length) {
            return true;
        } else {
            return false;
        }
    }
}

function platformNotSupportPathRemove(platform) {
    let _platformSupportDecorator = platformSupportDecorator(platform);
    // 是合法，也是符合平台的
    return function (path) {
        // let decorators = path.get("decorators");
        let decorators = path.get("leadingComments");
        if(decorators.length) {
            //获取最后一个
            let decorator = decorators[decorators.length - 1].node.value;
            if (isAllinSupportDecorator(decorator)&&!_platformSupportDecorator(decorator)) {
                decorators[decorators.length - 1].node.value='Handled '+decorators[decorators.length - 1].node.value;
                path.remove();
                return true;
            }
        }
        return false;
    }
}

function isAllinSupportDecorator(decorator){
    return decorator.startsWith(ALLIN_SUPPORT_PREFIX);
}


module.exports = {
    platformSupportDecorator,
    isAllinSupportDecorator,
    platformNotSupportPathRemove
}