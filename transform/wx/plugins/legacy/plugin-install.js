

/*@@ Desprected @@*/
const path = require("path");
const Helper = require("../../../../utils/helper")
const cachedPlugins={};


module.exports = function (ext) {
    let dir = "";
    if (ext == ".aljs") {
        dir = "js";
    } else if (ext == ".aljsx") {
        dir = "jsx";
    }

    if(!cachedPlugins[dir]){
        let lists = Helper.readDir(path.resolve(__dirname, dir));
        let output = lists.map((el) => {
            let desc = path.parse(el);
            let option = {filename:desc.name.toLowerCase(),pages:[]};
            console.log(`./${dir}/${option.filename}`);
            let module = require(`./${dir}/${option.filename}`);
            return [module,option];
        });
        cachedPlugins[dir]=output;
        return output;
    }else{
        return cachedPlugins[dir];
    }
}