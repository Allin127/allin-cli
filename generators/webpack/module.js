module.exports = function (ctx) {
    //babel

    ctx.dependencies.push(
        "@babel/preset-es2015",
        "@babel/preset-react",
        "babel-plugin-syntax-dynamic-import",
        "babel-plugin-transform-decorators-legacy",
        "babel-plugin-transform-class-properties",
        "babel-plugin-transform-object-rest-spread",
        "babel-plugin-lodash"
    );

    ["development","production"].forEach(function(elm){
        ctx.configuration.config.webpackOptions[elm].module.rules.push(
            {
                test: `${new RegExp(/\.jsx?$/)}`,
                include: ["path.resolve(__dirname, 'src')"],
                loader: "'babel-loader'",
                exclude: "'/node_modules/'",
                options: {
                    presets: ["'babel-preset-es2015'","'babel-preset-react'"],
                    plugins: ["'babel-plugin-syntax-dynamic-import'",
                        "'babel-plugin-transform-decorators-legacy'",
                        "'babel-plugin-transform-class-properties'",
                        "'babel-plugin-transform-object-rest-spread'",
                        "'babel-plugin-lodash'"
                    ]
                }
            }
        );
    });


    // ctx.push( {
    //     test: /\.(png|jpg|jpeg|gif)$/,
    //     use: require.resolve('url-loader') + '?limit=100&&name=images/[name].[hash:6].[ext]',
    // }, {
    //     test: /\.(eot|ttf|wav|mp3|svg|woff|woff2)$/,
    //     use: require.resolve('file-loader') + '?name=fonts/[name].[hash:6].[ext]',
    // }, {
    //     test: /\.css$/,
    //     use: ExtractTextPlugin.extract({
    //         allChunks: true,
    //         fallback: require.resolve('style-loader'),
    //         use: [require.resolve('css-loader'), {
    //             loader: require.resolve('postcss-loader'),
    //             options: {
    //                 plugins: (loader) => [
    //                     require('postcss-import')({
    //                         path: [Utils.resolveNodeModulesPath()]
    //                     }),
    //                     require('postcss-mixins')(),
    //                     require('postcss-nested')(),
    //                     require('postcss-cssnext')({
    //                         browsers: AUTOPREFIXER_BROWSERS,
    //                     }),
    //                 ]
    //             }
    //         }]
    //     })
    // })



    // ctx.dependencies.push(
    //     "babel-core",
    //     "babel-loader",
    //     "babel-preset-es2015"
    // );


// style
//     ctx.configuration.config.topScope.push(
//         "const autoprefixer = require('autoprefixer');",
//         "const precss = require('precss');",
//         "\n"
//     );
//     // ctx.dependencies.push(
//     //     "style-loader",
//     //     "css-loader",
//     //     "postcss-loader",
//     //     "precss",
//     //     "autoprefixer"
//     // );
//     regExpForStyles = `${new RegExp(/\.css$/)}`;
//     if (this.isProd) {
//         ExtractUseProps.push(
//             {
//                 loader: "'css-loader'",
//                 options: {
//                     sourceMap: true,
//                     importLoaders: 1
//                 }
//             },
//             {
//                 loader: "'postcss-loader'",
//                 options: {
//                     plugins: `function () {
// 											return [
// 												precss,
// 												autoprefixer
// 											];
// 										}`
//                 }
//             }
//         );
//     }


};

