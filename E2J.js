
let XLSX = require('xlsx');
let fs = require('fs');
let path = require('path');
/* to_json returns an object-mode stream */
let workbook = XLSX.readFile('real.xls');
console.log('读取文件成功');
let outputDataPath = "./real.json";
let worksheet = workbook.Sheets[workbook.SheetNames[0]] ;
let writeData = [] ;
let yearList = [] ;
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
        if(row-4 >= writeData.length){
            let item = {
                id:'',
                area:'',
                school:'',
                major: '',
                scoreList: [],
                scoreLineList: [],
                yaerList:yearList             
            };
            writeData.push(item);
        }
        console.log(row-4);
        writeData[row-4].id = row-4 ;
        //列数据处理
        switch (col) {
            /* 所在地区 */
            case 'A':
                writeData[row-4].area = cell.v ;
                break;
            /* 院校名称 */
            case 'B':
                writeData[row-4].school = cell.v ;
                break;
            /* 专业名称 */
            case 'C':
                writeData[row-4].major = cell.v ;
                break;
            /* 实录线 */
            case 'D':
            case 'F':
            case 'H':
                writeData[row-4].scoreList.push(cell.v);
                break;
            /* 实录线 等位分 */
            case 'E':
            case 'G':
            case 'I':
                writeData[row-4].scoreLineList.push(cell.v);
                break;
        }
    }
    
}
console.log('循环完成......')
writeData = writeData.map((e,i)=>{
    if(!e.area){
        e.area = writeData[i-1].area ;
    }
    if(!e.school){
        e.school = writeData[i-1].school
    }
    return e;
})
writeData = JSON.stringify(writeData, null , '  ');
worksheet = JSON.stringify(worksheet, null , '  ');
fs.writeFile(path.join(__dirname, outputDataPath),writeData, err => {
    !err && console.log('写入data成功');
});
fs.writeFile(path.join(__dirname, './hehe.json'),worksheet, err => {
    !err && console.log('写入原data成功');
});