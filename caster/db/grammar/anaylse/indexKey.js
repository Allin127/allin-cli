// {
//     "id": 1,
//     "keyName": "索引名称1",
//     "constraintType": {
//     "value": "idx",
//         "key": "普通索引"
// },
//     "columnList": [
//     {
//         "value": "col1",
//         "key": "列名1"
//     },
//     {
//         "value": "col2",
//         "key": "列名2"
//     }
// ],
//     "editing": false  //option
// }

//         KEY  WMC_USR_MEMBER_CUSTOMER_UPT     (UPDATED_AT),
// UNIQUE  KEY  UK_WMC_USR_MEMBER_CUSTOMER_UID  (USER_ID),
// PRIMARY KEY  PK_WMC_USR_MEMBER_CUSTOMER      (ID),



module.exports = function (el) {
    let output = "";
    output += (el["constraintType"].value == "uk" ? "UNIQUE\tKEY\t" : "\tKEY\t");
    output += el["keyName"] + "\t";
    output += `(${el["columnList"].map(el => el.value).join(",")})`;
    return output.toUpperCase();
}