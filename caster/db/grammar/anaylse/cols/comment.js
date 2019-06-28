

module.exports= function(value){
    return value?`COMMENT '${value.toUpperCase()}'`:"";
}