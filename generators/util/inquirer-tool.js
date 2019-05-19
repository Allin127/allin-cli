
function Input(name, message,defaultVal) {
    let result = {
        type: "input",
        name,
        message
    };
    if (defaultVal !== undefined) {
        result = Object.assign(result, {default: defaultVal});
    }
    return result;
}
function Confirm(name, message) {
    return {
        type: "confirm",
        name,
        message
    };
}


function List(name, message, choices) {
    return {
        type: "list",
        name,
        message,
        choices
    };
}

function InputValidate(name, message, cb, defaultVal) {
    let result = {
        type: "input",
        name,
        message,
        validate: cb
    };
    if (defaultVal !== undefined) {
        result = Object.assign(result, {default: defaultVal});
    }
    return result;
}

var validate = value => {
    const pass = value.length;
    if (pass) {
        return true;
    }
    return "Please specify an answer!";
};


module.exports = {
    Input,validate,InputValidate,List,Confirm
}