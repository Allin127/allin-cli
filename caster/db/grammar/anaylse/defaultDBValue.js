

module.exports= function(value){
    if(value){
        return "";
    }else{
        return `DEFAULT '${value.toUpperCase()}'`;
    }
}