const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ger30188544',
    database: 'delivery_concordia'

});

db.connect(function(err){
    if (err) throw err; 
    console.log('DATABASE CONNECTED');

});

module.exports = db;