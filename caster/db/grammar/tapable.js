let TableWrapper = require('./anaylse/tableWrapper')
let indexKeyAnaylzer = require('./anaylse/index/indexKey')

module.exports = new function () {
    var colParticiples = [];
    var indexParticiples = [];

    var anaylzers = [];
    var source = [];
    var tableWrapper = [];
    this.tableName = (tableObj) =>{
        tableWrapper = TableWrapper(tableObj);
        // for(var i=1;i<100;i++){
        //     setTimeout(function(){console.log("hello"+i)},1000*i);
        // }
        return this;
    }


    this.registerCol = (participle) => {
        colParticiples.push(participle);
        anaylzers.push(require(`./anaylse/cols/${participle}`));
        return this;
    }

    this.registerIndexAnaylzer = (participle) => {
        indexParticiples.push(participle);
        anaylzers.push(require(`./anaylse/index/${participle}`));
        return this;
    }

    this.load = (__source) => {
        source = __source;
        //默认字段添加
        source.columnList.unshift({"name": "ID", "type": "BIGINT(20)", "isNull": 0, "comment": "系统-主键", "autoIncrement": 1}, {"name": "CREATE_TIME", "type": "DATETIME", "isNull": 1, "comment": "系统-创建时间","defaultValue":"current_timestamp"});
        return this;
    }

    this.applyAnaylse = () => {
        let outputs = []; // 按照每个字段存放对应的输出,最后完成整个拼接
        /** 1.生成column定义 **/
        source.columnList.forEach(function (colRow) {
            let array = [];
            colParticiples.forEach(function (el, index, _arr) {
                array.push(anaylzers[index](colRow[el]));
            })
            outputs.push(array.join("\t\t"));
        })
        let content = outputs.join(",\n");

        /** 2.生成索引 **/
        outputs = [];
        source.indexList.forEach(function (indexRow) {
            outputs.push(indexKeyAnaylzer(indexRow));
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