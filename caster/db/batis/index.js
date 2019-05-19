const {rename, readDir, readFile, writeFile} = require("../../../utils/helper");
const _ = require('lodash');
const path = require('path');

module.exports = function (xmlPath) {
    let cwd = process.cwd();
    let template = readFile(path.resolve(cwd,xmlPath));
    let config = JSON.parse(readFile(path.resolve(cwd,"batis.json")));
    _.forEach(config,function (value,key) {
        template = template.replace(new RegExp("\\$\{"+key+"\}","gm"),value);
    });
    writeFile(path.resolve(cwd,"generatorConfig.xml"),template);
};
