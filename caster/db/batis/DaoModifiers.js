/**
 * 简单的匹配，匹配到一个，pop一个
 * 支持一组匹配，一组内的只要其中一组匹配到则pop,所以把条件比较强的放前面
 **/

module.exports = [
    {
        "testReg": new RegExp(/package [\w\W]+;/),    /** 匹配的源文件line规则 **/
        "mode": "after",                              /** 放在这个匹配的之前还是之后 **/
        "content": "import lombok.*;"           /** 放入的内容 **/
    },
    [{
        "testReg": new RegExp(/public class [\w\W]+Example/),
        "mode": "before",
        "content": "@Builder @AllArgsConstructor"
    },
    {
        "testReg": new RegExp(/public class/),
        "mode": "before",
        "content": "@Builder"
    }]
];