const {Input} = require("../util/inquirer-tool")

module.exports = function (ctx) {
    return ctx.prompt([
        Input(
            "outputPath",
            "Which folder will your generated bundles be in? [default: dist]:",
            "dist"
        )
    ]).then(outputTypeAnswer => {
        ["development","production"].forEach(function(elm){
            ctx.configuration.config.webpackOptions[elm].output = {
                filename: "'[name].[hash].js'",
                chunkFilename: "'[name].[hash].js'",
                path: `path.resolve(__dirname, '${outputTypeAnswer["outputPath"]}')`
            };
        });

    });
};