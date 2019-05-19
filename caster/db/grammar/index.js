const {rename, readDir, readFile, writeFile} = require("../../../utils/helper");
const tapable = require("./tapable");

module.exports = function (path) {
    let source = JSON.parse(readFile(path));
    tapable.tableName(source.tableName)
        .load(source)
        .register("column")
        .register("fieldType")
        .register("defaultDBValue")
        .register("nullable")
        .register("comments")
        .registerIndexAnaylzer("indexKey")
        .applyAnaylse()
        .display();
};


/**
 indexDatas:[{

 }],
 tableDatas:[
 {
     "id":1,                         //无语法意义
     "column":"字段名2",              //列名
     "fieldType":"VARCHAR(32)",      //字段类型
     "nullable":"NOT NULL",          //是否为空
     "defaultDBValue":"",            //默认db值
     "comments":""                   //字段解释
 },
 …………
 ]

 转换成

 create table wmc_mgw_app_config (
 ID                   BIGINT(20)     auto_increment                 NOT NULL
 COMMENT '主键',
 CREATED_AT           DATETIME                                      NOT NULL
 COMMENT '创建时间',
 CREATED_BY           VARCHAR(128)   default 'SYS'                  NOT NULL
 COMMENT '创建人',
 UPDATED_AT           DATETIME                                      NOT NULL
 COMMENT '修改时间',
 UPDATED_BY           VARCHAR(128)   default 'SYS'                  NOT NULL
 )
 */