const yeoman = require('yeoman-environment');
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const gitClone = require('gitclone');//git工具
const spawn = require('cross-spawn');
const ora = require('ora');//loading 美化工具
const shell = require('shelljs');//shell工具
const rimraf = require('rimraf');//shell工具

const initGenerator = require('../init-generator');
const transform = require('../util/transform');

let cloneTemplateProject = function(name){
    const gitBoilerplateUrl = 'https://github.com/Allin127/allin-webpack-boilerplate.git';
    return new Promise(function(resolve,reject){
        gitClone(gitBoilerplateUrl,{"dest": name },(err) => {
            if (err) reject(false);
            else resolve(true);
        });
    });
}



module.exports = function (projectName) {
    let __init = async function(name){
        //1 下载模板
        let loading = ora(`git clone  ${name}`).start();
        let ret = await cloneTemplateProject(name);
        if(ret){
            loading.succeed(`git clone  ${name} success!`);
            shell.cd(name);
            //2 创建yeoman env 准备workflow
            var env = yeoman.createEnv();
            env.registerStub(initGenerator, 'webpack:init');
            //执行init并且转换
            env.run('webpack:init').on("end", transform);
            //安装依赖包
            spawn.sync("npm",["install"],{stdio: 'inherit'});
        }else{
            loading.fail("git clone failed");
        }
    };

    __init(projectName);

}