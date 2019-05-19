let extnameMap = function(ext){
    if(ext === ".aljsx"||ext === "aljsx") return "wxml";
    else if(ext == ".aljs"||ext === "aljs") return "js";
    else if(ext == ".alcss"||ext === "alcss") return "wxss";
    else if(ext == ".altestjs"||ext === "altestjs") return "testjs";
    else return ext;
}

let isThisStateExpression=function(path){
    if(path.isMemberExpression()&&path.get("object").isMemberExpression()
        &&path.get("object").get("object").isThisExpression()
        &&(path.get("object").get("property").node.name=="state"||path.get("object").get("property").node.name=="props")){
        return true;
    }
    return false;
}


let isThisMethodsExpression=function(path){
    if(path.isMemberExpression()&&path.get("object").isMemberExpression()
        &&path.get("object").get("object").isThisExpression()
        &&path.get("object").get("property").node.name=="methods"){
        return true;
    }
    return false;
}
let isThisExpression=function(path){
    if(path.isMemberExpression()&&path.get("object").isThisExpression()){
        return true;
    }
    return false;
}

let isEventAttribute=function(path){
    if(path.isJSXAttribute()&&
        (path.get("name").node.name.startsWith("on")
        ||path.get("name").node.name.startsWith("bind"))){
        return true;
    }
    return false;
}



let isSetStateExpression=function(path){
    if(path.isCallExpression()&&path.get("callee").isMemberExpression()
        &&path.get("callee").get("object").isThisExpression()
        &&path.get("callee").get("property").node.name=="setState"){
        return true;
    }
    return false;
}

module.exports={
    extnameMap,
    isThisStateExpression,
    isThisMethodsExpression,
    isEventAttribute,
    isSetStateExpression,
    isThisExpression
}