/**
 *
 * @param tableObj
 * @returns {[string,*,*]}
 * 数组前两行是头部，数组2个后面是尾部
 */

module.exports = function(tableObj){
    return [`CREATE TABLE ${tableObj.tableName}(`,
        `PRIMARY KEY  PK_${tableObj.tableName.toUpperCase()}_ID        (ID),`.toUpperCase(),
        ')',
        `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC comment='${tableObj.tableDesc}';`
        ];
}