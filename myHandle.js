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
            id: idx,
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
});
/* scoreLineList = newData.map((e,i)=>{
    let scoreLineO = {} ;
    if(e.scoreLine){
        scoreLineO['id'] = i ;
        scoreLineO[e.scoreLine] = e ;
    }
    return scoreLineO ;
}) */
// console.log(areaList);
// console.log(schoolList);
console.log(scoreLineList);
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

return false ;

//最后写出文件
newData = JSON.stringify(newData, null , '  ');
fs.writeFile(path.join(__dirname, './newRealData.json'),newData, err => {
    !err && console.log('写出newRealData成功------即源数据');
});