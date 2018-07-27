var mysql = require('mysql'); 
var fs = require('fs');
var myData = fs.readFileSync('input.txt');


// var connection = mysql.createConnection({    

//   host     : '127.0.0.1',      

//   user     : 'damon',             

//   password : '5iHGLz0OnQdDHMMU',      

//   port: '3306',                  

//   database: '111',

// });
 

// connection.connect();

// var  userAddSql = 'INSERT INTO my_news_test(id,name,age) VALUES(0,?,?)';

// var  userAddSql_Params = ['Wilson', 55];

// connection.query(userAddSql,userAddSql_Params,function (err, result) {

//         if(err){

//          console.log('[INSERT ERROR] - ',err.message);

//          return;

//         }       

//        console.log('-------INSERT----------');

//        //console.log('INSERT ID:',result.insertId);       

//        console.log('INSERT ID:',result);       

//        console.log('#######################'); 

// });

// connection.end();