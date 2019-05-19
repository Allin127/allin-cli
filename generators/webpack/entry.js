const {InputValidate, validate, Confirm} = require("../util/inquirer-tool")


module.exports = function (ctx) {
    let entryIdentifiers;
    let result;
    return ctx.prompt([
        Confirm("entryType", "Will your application have multiple bundles?")
    ]).then(answer => {
        if (answer["entryType"] === true) {
            result = ctx.prompt([
                InputValidate(
                    "multipleEntries",
                    "Type the names you want for your modules (entry files), separated by comma [example: app,vendor]",
                    validate
                )
            ]).then(multipleEntriesAnswer => {
                let webpackEntryPoint = {};
                entryIdentifiers = multipleEntriesAnswer["multipleEntries"].split(",");
                let quest = function (_prop) {
                    return ctx.prompt([
                        InputValidate(
                            `${_prop}`,
                            `What is the location of "${_prop}"? [example: ./src/${_prop}]`,
                            validate
                        )]);
                };

                let answer = function (n) {
                    if (n) {
                        Object.keys(n).forEach(val => {
                            if (
                                n[val].charAt(0) !== "(" &&
                                n[val].charAt(0) !== "[" &&
                                !n[val].includes("function") &&
                                !n[val].includes("path") &&
                                !n[val].includes("process")
                            ) {
                                n[val] = `\'${n[val].replace(/"|'/g, "").concat(".js")}\'`;
                            }
                            webpackEntryPoint[val] = n[val];
                        });
                    } else {
                        n = {};
                    }
                    return webpackEntryPoint;
                };

                return entryIdentifiers.reduce(function (promise, prop, index) {
                    return promise.then(n => {
                        answer(n);
                        if (index == entryIdentifiers.length - 1) return quest(prop).then(answer);
                        else return quest(prop);
                    });
                }, Promise.resolve());
            });
        } else {
            result = ctx
                .prompt([
                    InputValidate(
                        "singularEntry",
                        "Which module will be the first to enter the application? [default: ./src/index]",
                        validate,
                        "./src/index"
                    )
                ]).then(singularEntryAnswer => {
                    let {singularEntry} = singularEntryAnswer;
                    if (singularEntry.indexOf("\"") >= 0) {
                        singularEntry = singularEntry.replace(/"/g, "'");
                    } else {
                        singularEntry = `'${singularEntry}'`;
                    }
                    return singularEntry;
                });
        }
        return result;
    }).then(entryOptions => {
        if (entryOptions !== "\"\"") {
            ctx.configuration.config.webpackOptions.production.entry = entryOptions;
            ctx.configuration.config.webpackOptions.development.entry =[entryOptions,"'webpack-dev-server/client?http://0.0.0.0'","'webpack/hot/dev-server'"];
        }

        return entryOptions;
    });
};