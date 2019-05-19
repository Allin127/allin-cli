console.log(process.argv);
console.log("Hello world! Test sub commander js!");

let db = require("../mysql");
console.log(db);
db.execute("select count(*) from be_admin_menu",function(a,b,c){console.log(a,b,c)});
db.execute("select count(*) from be_admin_menu",function(a,b,c){console.log(a,b,c)});