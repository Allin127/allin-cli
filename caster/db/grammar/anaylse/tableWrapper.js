module.exports = function(tableName){
    return [`CREATE TABLE ${tableName}(`,
        `PRIMARY KEY  PK_${tableName.toUpperCase()}_ID        (ID),`.toUpperCase(),
        ')'];
}