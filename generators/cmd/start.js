const webpack = require('webpack');
const path = require("path");
// const devMiddleware = require('webpack-dev-middleware');
// const hotMiddleware = require('webpack-hot-middleware');
const webpackDevServer = require('webpack-dev-server');
const express = require('express');
const spawn = require('cross-spawn');


module.exports = function (isProduction) {
    let configd = require(path.resolve(process.cwd(), isProduction ? 'webpack.production.config.js' : 'webpack.development.config.js'));


    // const app = express();
    //app.use(express.static(path.join(__dirname, './node_modules/')))
    // app.use(devMiddleware(compiler,{publicPath:"/static/"}));
    //
    // app.use(hotMiddleware(compiler));
    // app.get('*', function(req, res) {
    //     res.sendFile(path.join(process.cwd(), 'template.html'));
    // });

    if(!isProduction) {
        const compiler = webpack(configd);
        const devPort = 3333;
        const host = '0.0.0.0';
        //https://webpack.js.org/configuration/dev-server/
        const options = {
            contentBase: './dist',
            hot: true,
            host: host,
            after: function () {
            },
            before: function (app) {
                console.log("before",path.resolve(process.cwd(), './assets'));
                app.use(express.static(path.resolve(process.cwd(), './assets')));
            }
        };
        webpackDevServer.addDevServerEntrypoints(configd, options);
        const app = new webpackDevServer(compiler, options);
        app.listen(devPort, host, function () {
            console.log(`Listening on port ${devPort}!`);
                spawn.sync('open', [`http://localhost:${devPort}`], {
                    stdio: 'inherit'
                });
        });
    }else{
        webpack(configd,(err, stats) => {
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return;
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
                console.error(info.errors);
            }

            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }

        });
    }

}