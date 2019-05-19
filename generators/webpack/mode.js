module.exports = function (ctx) {

    ctx.configuration.config.webpackOptions.development.mode = "'development'";
    ctx.configuration.config.webpackOptions.production.mode = "'production'";
};