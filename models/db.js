var mysql = require('mysql');
var database='corner';
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  port: '3306',
  database: database,
});
module.exports=connection;