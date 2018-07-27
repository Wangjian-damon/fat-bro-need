
let XLSX = require('xlsx');
let fs = require('fs');
let path = require('path');
let outputDataPath = "./real.json";
/* 自己定义的excel文件 */
let xlsList = ['real.xls'];
let worksheetList = [] ;
let worksheets = [] ; //所有的工作表 
//得到所有文件
xlsList.forEach(e=>{
    let workbook = XLSX.readFile(e);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]] ;
    worksheets.push(worksheet) ;
    worksheetList.push(worksheet);
})
console.log('读取文件成功');
let TotalData = [] ;
let yearList = [] ;
worksheetList.forEach(worksheet=>{
    for(let i in worksheet){
        let cell = worksheet[i];
        let col = i.charAt(0);
        let row = parseInt(i.slice(1));   
        if(!/!/.test(i)){
            if(row <= 3){
                if(row == 2){
                    switch (col) {
                        case 'D':
                        case 'F':
                        case 'H':
                            yearList.push(parseInt(cell.v));
                            break;
                    }
                }
                continue;
            }
            if(row-4 >= TotalData.length){
                let item = {
                    area:'',
                    school:'',
                    major: '',
                    scoreList: [],
                    scoreLineList: [],
                    yearList: yearList             
                };
                TotalData.push(item);
            }
            // console.log(row-4);
            //列数据处理
            switch (col) {
                /* 所在地区 */
                case 'A':
                    TotalData[row-4].area = cell.v ;
                    break;
                /* 院校名称 */
                case 'B':
                    TotalData[row-4].school = cell.v ;
                    break;
                /* 专业名称 */
                case 'C':
                    TotalData[row-4].major = cell.v ;
                    break;
                /* 实录线 */
                case 'D':
                case 'F':
                case 'H':
                    TotalData[row-4].scoreList.push(cell.v);
                    break;
                /* 实录线 等位分 */
                case 'E':
                case 'G':
                case 'I':
                    let currentVal = 'D'+cell.v ;
                    if((/S/g).test(currentVal)){
                        currentVal = currentVal.replace(/S/g,'5')
                    }
                    if((/J/g).test(currentVal)){
                        // console.log(currentVal);
                    }
                    currentVal = currentVal.match(/\d|\./g);
                    if(currentVal){
                        currentVal = parseFloat(currentVal.join('')) ;
                        currentVal = isNaN(currentVal) ? null : currentVal ;         
                    }
                    TotalData[row-4].scoreLineList.push(currentVal);
                    break;
            }
        }
        
    }
})
TotalData = TotalData.map((e,i)=>{
    if(!e.area){
        e.area = TotalData[i-1].area ;
    }
    if(!e.school){
        e.school = TotalData[i-1].school ;
    }
    return e
})
console.log('循环完成......')
TotalData = JSON.stringify(TotalData, null , '  ');
worksheets = JSON.stringify(worksheets, null , '  ');
fs.writeFile(path.join(__dirname, outputDataPath),TotalData, err => {
    !err && console.log('写入data成功');
});
fs.writeFile(path.join(__dirname, './hehe.json'),worksheets, err => {
    !err && console.log('写入原data成功');
});