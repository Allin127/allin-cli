const path = require('path');

module.exports = function (ctx) {
    ctx.dependencies.push(
        "html-webpack-plugin"
    );
    let pluginHtml =   `new HtmlWebpackPlugin({
        template:  './template.html',
        filename: 'index.html'
    })`;
    ctx.configuration.config.webpackOptions.development.plugins.push(pluginHtml);
    ctx.configuration.config.webpackOptions.production.plugins.push(pluginHtml);
}
