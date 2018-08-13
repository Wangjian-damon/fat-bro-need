let fs = require('fs');
let path = require('path');
let data = fs.readFileSync('./real.json','utf-8');
let newData = [] ;
data = JSON.parse(data);
console.log(data.length);
//将年份循环到外层 得到最扁平的数据
data.forEach((e,idx)=>{
    e.yearList.forEach((item,i)=>{
        let yearData = {
            id: idx+''+i,
            area:e.area,
            school:e.school.replace(/\s/g,''),
            major:e.major.replace(/\s/g,''),
            score:e.scoreList[i],
            scoreLine:e.scoreLineList[i],
            year:item,
        }
        newData.push(yearData);
    })
})

//获得地区/学校/实录分数/等位分表
let areaList = [] ;
let schoolList = [];
// let scoreList = [];
let scoreLineList = {};
let majorInfoList = {};
newData.forEach((e)=>{
    //area
    if(areaList.indexOf(e.area) == -1){
        areaList.push(e.area);
    }    
    //school
    if(schoolList.indexOf(e.school) == -1){
        schoolList.push(e.school);
    } 
    if(e.scoreLine){
        scoreLineList[e.scoreLine] = e ;
    }
    if(e.major){
        if(!majorInfoList[e.major]){
            majorInfoList[e.major] = [e];
        }else{
            majorInfoList[e.major].push(e);
        }
    }
});
// console.log(areaList);
// console.log(schoolList);
// console.log(scoreLineList);
//地区对应学校
let areaSchoolList = {};
areaList.forEach(e=>{
    areaSchoolList[e] = [];
})
//得到地区与学校对应表
newData.forEach(e=>{
    areaname = e.area ;
    if(areaSchoolList[areaname].indexOf(e.school) == -1){
        areaSchoolList[areaname].push(e.school);
    }
});
// console.log(areaSchoolList);

//学校->专业对应表
let schoolMajorList = {};
schoolList.forEach(e=>{
    schoolMajorList[e] = [];
})
//出表
newData.forEach(e=>{
    school = e.school ;
    if(schoolMajorList[school].indexOf(e.major) == -1){
        schoolMajorList[school].push(e.major);
    }
});
// console.log(schoolMajorList);

//最后写出文件

newData = 'export default '+ JSON.stringify(newData, null , '  ');
fs.writeFile(path.join(__dirname, './newRealData.js'),newData, err => {
    !err && console.log('写出newRealData成功------即源数据');
});
areaList = 'export default '+ JSON.stringify(areaList, null , '  ');
fs.writeFile(path.join(__dirname, './areaList.js'),areaList, err => {
    !err && console.log('写出areaList成功------即源areaList数据');
});
areaSchoolList = 'export default '+ JSON.stringify(areaSchoolList, null , '  ');
fs.writeFile(path.join(__dirname, './areaSchoolList.js'),areaSchoolList, err => {
    !err && console.log('写出 areaSchoolList 成功------即源 areaSchoolList 数据');
});
schoolMajorList = 'export default '+ JSON.stringify(schoolMajorList, null , '  ');
fs.writeFile(path.join(__dirname, './schoolMajorList.js'),schoolMajorList, err => {
    !err && console.log('写出 schoolMajorList 成功------即源 schoolMajorList 数据');
});
schoolList = 'export default '+ JSON.stringify(schoolList, null , '  ');
fs.writeFile(path.join(__dirname, './schoolList.js'),schoolList, err => {
    !err && console.log('写出 schoolList 成功------即源 schoolList 数据');
});
scoreLineList = 'export default '+ JSON.stringify(scoreLineList, null , '  ');
fs.writeFile(path.join(__dirname, './scoreLineList.js'),scoreLineList, err => {
    !err && console.log('写出 scoreLineList 成功------即源 scoreLineList 数据');
});
majorInfoList = 'export default '+ JSON.stringify(majorInfoList, null , '  ');
fs.writeFile(path.join(__dirname, './majorInfoList.js'),majorInfoList, err => {
    !err && console.log('写出 majorInfoList 成功------即源 majorInfoList 数据');
});