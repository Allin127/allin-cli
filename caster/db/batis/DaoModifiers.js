/**
 * 只能匹配一次，匹配到后就不会再匹配
 * **/

module.exports = [
    {
        "testReg": new RegExp(/package [\w\W]+;/),    /** 匹配的源文件line规则 **/
        "mode": "after",                              /** 放在这个匹配的之前还是之后 **/
        "content": "import lombok.Builder;"           /** 放入的内容 **/
    },
    {
        "testReg": new RegExp(/public class/),
        "mode": "before",
        "content": "@Builder"
    }
];