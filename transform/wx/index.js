const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const chalk = require('chalk');
const babel = require('@babel/core');
const {Functor} = require('../../utils/Functor');
const {readDir,readFile}=require('../../utils/helper');
const {extnameMap}=require('./utils/index');

//plugin import
const transformJS=require("./plugins/babel-plugin-allin-wx-transform-js");
const transformJSX=require("./plugins/babel-plugin-allin-wx-transform-jsx");
const wxAppExtension=require("./plugins/extension-for-app");


// demo
const forStatement=require("../js/forStatement");

// const filterNameRegx = /\.aljsx$|\.aljs$|\.alcss$|\.alconfig$/;// aljsx?$
const filterNameRegx = /\.aljsx?$|\.alcss$|data.js$|util.js$/;
// const filterNameRegx = /index.aljs$/;






module.exports = function(dir){

    //获取src的目录，提取对应文件
    let __path = path.resolve(dir||process.cwd(), "src");
    let jsxFiles = Functor.of(__path)
        .map(readDir)
        .map(function (files) {
            return files.filter(function (__file) {
                return __file.match(filterNameRegx);
                // return __file.endsWith(filterName);
            })
        }).join();
    jsxFiles.forEach(function(__file){
        let desc = path.parse(__file);
        let source = readFile(__file);
        //分发
        /*
            allin2wx's option:
            pages是import的输出格式，需要单独生成文件
            filename当前转换的文件名字
         */

        let option = {filename:desc.name.toLowerCase(),appPages:[],components:{}};
        let extName = extnameMap(desc.ext);
        console.log("file",desc.name.toLowerCase(),desc.ext)
        let plugins ={
            testjs:["syntax-jsx", "syntax-decorators", "syntax-class-properties",
                [forStatement, option]],
            js:["syntax-jsx", "syntax-decorators", "syntax-class-properties",
                [transformJS, option], [wxAppExtension, option]],
            wxml:["syntax-jsx", "syntax-decorators", "syntax-class-properties",
                [transformJSX, option], [wxAppExtension, option]]
        };


        let code;let isTransfred=false;
        if (plugins[extName]) {
            let transformedObj = babel.transform(source, {
                presets: [],
                plugins: plugins[extName] //从左边往右边
            });
            code = transformedObj.code;
            isTransfred=true;
        } else {
            code = source;
        }
        // 末尾会多一个冒号，所以要replace掉？？？？？name
        if(code.endsWith(";")){
            code = code.substring(0,code.length-1);
        }
        // console.log(chalk.blue(code));
        let outputDir = desc.dir.replace("/src","/dist/wx");
        /**
         *  生成app.json结构
         */
        if(option.appPages&&option.appPages.length>0&&isTransfred){
            let appConfig = {
                "pages":option.appPages,
                "window": {
                    "backgroundTextStyle": "light",
                    "navigationBarBackgroundColor": "#F7F0DF",
                    "navigationBarTitleText": "大前端题库",
                    "navigationBarTextStyle": "black"
                }
            }
            let filePath = path.resolve(outputDir,desc.name+".json");
            fs.outputFileSync(filePath,JSON.stringify(appConfig));
        }else if(option.components&&isTransfred){

            /**
             *  生成page.json结构
             */
            let componentsConfig  = {
                "usingComponents":option.components
            }
            let filePath = path.resolve(outputDir,desc.name+".json");
            fs.outputFileSync(filePath,JSON.stringify(componentsConfig));
        }

        // output 生成的js
        let filePath =path.resolve(outputDir,desc.name+"."+(extName.replace(".","")));
        fs.outputFileSync(filePath,code);
    });

    //清理资源
}