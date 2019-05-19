const webpack = require('webpack');
const path = require("path");

module.exports = function (formatType) {
    const format = require(`../transform/cross-platform/${formatType}`);

}