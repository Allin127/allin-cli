var exec = require('child_process').exec;
var chalk = require('chalk');
module.exports = function (source,dest,mainClassPath) {
    let callback =  function (error, stdout, stderr){
        console.log(chalk.green('stdout: ' + stdout));
        // console.log('stderr: ' + stderr);
        if(error !== null){
            console.log(chalk.red('exec error: ' + error));
        }
    };
    if(mainClassPath){
        exec('java -classpath lib-tool.jar '+mainClassPath,callback);
    }else{
        exec(`java -jar lib-tool.jar ${source} ${dest}`,callback);
    }
};
