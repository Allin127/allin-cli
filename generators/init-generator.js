var Generator = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
// var entryQuestions = require('./../util/entry-questions');
const {Input, List, Confirm} = require('./util/inquirer-tool');

let entry = require('./webpack/entry');
let output = require('./webpack/output');
let mode = require('./webpack/mode');
let moduleSetting = require('./webpack/module.js');
let plugins = require('./webpack/plugins.js');

class initGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this._private_initConfig();
        this.isProd = false;
        (this.usingDefaults = false),
            (this.dependencies = [
                "webpack",
                "webpack-cli",
                "uglifyjs-webpack-plugin",
                "babel-plugin-syntax-dynamic-import"
            ]);
    }

    _private_initConfig(){
        this.configuration = {
            config: {
                webpackOptions: {
                    development: {
                        entry:[],
                        module: {
                            rules: []
                        },
                        plugins:["new webpack.HotModuleReplacementPlugin()",
                            "new webpack.NamedModulesPlugin()"]
                    },
                    production: {
                        entry:[],
                        module: {
                            rules: []
                        },
                        plugins:["new UglifyJSPlugin()"]
                    }
                }, /*webpack配置*/
                topScope: []  /*配置上的*/
            }
        };
        this.configuration.config.topScope.push(
            "const webpack = require('webpack');",
            "const path = require('path');",
            "const UglifyJSPlugin = require('uglifyjs-webpack-plugin');",
            "const HtmlWebpackPlugin = require('html-webpack-plugin');",
            "\n"
        );
    }
    path(){
        // // this.sourceRoot('./');
        // console.log(this.destinationPath())
        //
        // console.log(this.destinationPath())
    }

    prompting() {
        const done = this.async();


        entry(this)
            .then(() => output(this))
            .then(() => mode(this))
            .then(() => moduleSetting(this))
            .then(() => plugins(this))
            .then(() => {
                console.log(this.configuration.config);
                done();
            });

    }

    installPlugins() {
        //先不执行安装，纯手动安装
        // const packager = "npm";
        // const opts = packager === "yarn" ? {dev: true} : {"save-dev": true};
        // this.runInstall(packager, this.dependencies, opts);
    }

    writing() {
        // let self = this;
        // this.fs.writeJSON(
        //     this.templatePath("hello.js"),
        //     this.configuration.config.webpackOptions
        // );
        // console.log(this.configuration.config);

        this.config.set("configuration", this.configuration.config);
        // this.fs.copyTpl(
        //     this.templatePath('index.html'),
        //     this.destinationPath('public/index.html'),
        //     { data: this.configuration.config }
        // );
    }
}
;

module.exports = initGenerator;