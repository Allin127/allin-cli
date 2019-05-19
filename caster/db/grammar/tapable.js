let TableWrapper = require('./anaylse/tableWrapper')
let indexKeyAnaylzer = require('./anaylse/indexKey')

module.exports = new function () {
    var participles = [];
    var indexParticiples = [];

    var anaylzers = [];
    var source = [];
    var tableWrapper = [];
    this.tableName = (name) =>{
        tableWrapper = TableWrapper(name);
        return this;
    }


    this.register = (participle) => {
        participles.push(participle);
        anaylzers.push(require(`./anaylse/${participle}`));
        return this;
    }

    this.registerIndexAnaylzer = (participle) => {
        indexParticiples.push(participle);
        anaylzers.push(require(`./anaylse/${participle}`));
        return this;
    }

    this.load = (__source) => {
        source = __source;
        return this;
    }

    this.applyAnaylse = () => {
        let outputs = []; // 按照每个字段存放对应的输出,最后完成整个拼接
        /** 1.生成column定义 **/
        source.tableDatas.forEach(function (tableRow) {
            let array = [];
            participles.forEach(function (el, index, _arr) {
                array.push(anaylzers[index](tableRow[el]));
            })
            outputs.push(array.join("\t\t"));
        })
        let content = outputs.join(",\n");

        /** 2.生成索引 **/
        outputs = [];
        source.indexDatas.forEach(function (row) {
            outputs.push(indexKeyAnaylzer(row));
        })
        if(outputs.length>0)
            content+=",\n"+(outputs.join(",\n"))
        /** 3.拼接header头部和尾部 **/
        tableWrapper.splice(2,0,[content]);

        return this;
    }


    this.display = () => {
        console.log(tableWrapper.join("\n"));
        return this;
    }

    this.build =() => {
        return tableWrapper.join("\n");
    }


}