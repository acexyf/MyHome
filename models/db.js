import mysql from 'mysql';
let database='corner';
let connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  port: '3306',
  database: database,
});
module.exports=connection;