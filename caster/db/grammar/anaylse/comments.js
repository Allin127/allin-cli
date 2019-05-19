

module.exports= function(value){
    if(value){
        return "";
    }else{
        return `COMMENT '${value.toUpperCase()}'`;
    }
}