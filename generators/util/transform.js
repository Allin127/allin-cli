const path = require('path');
const fs = require('fs');
const babel = require("@babel/core");
const patchForWebpackConfig = require("./transfer");

module.exports = function(){
let configContent = require(path.resolve(process.cwd(),".yo-rc.json"));
let root = Object.keys(configContent)[0];


let topScope = configContent[root].configuration.topScope;
const {code} = babel.transform("module.exports={}",{
    // presets:["flow"],
    plugins:[patchForWebpackConfig(configContent[root].configuration.webpackOptions.development,topScope)]
});
//     this.callback(null,code);
// }
    fs.writeFileSync(path.resolve(process.cwd(),"webpack.development.config.js"),code);

    const transformed = babel.transform("module.exports={}",{
        plugins:[patchForWebpackConfig(configContent[root].configuration.webpackOptions.production,topScope)]
    });
    fs.writeFileSync(path.resolve(process.cwd(),"webpack.production.config.js"),transformed.code);

    //清理资源


}

