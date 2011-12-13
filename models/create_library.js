var mysql        = require("mysql");
var DB           = "library";
var TABLE_BOOK   = "book";
var TABLE_CARD   = "card";
var TABLE_ADM    = "adm";
var TABLE_RECORD = "record";

var client = mysql.createClient({
    user: 'rainy',
    password: 'rainy',
});

/*create database*/
client.query('create database ' + DB, function(err){
    if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS){
	throw err;
    }
});
client.query('use ' + DB);

/*create tables*/
var create_table_book = "create table " + TABLE_BOOK +
    "(id INT(11) AUTO_INCREMENT, " +
    "book_no INT(11), " +
    "category VARCHAR(255), " +
    "title VARCHAR(255), " +
    "press VARCHAR(255), " +
    "year INT(5), " +
    "author VARCHAR(25), " +
    "price DECIMAL(6, 2), " +
    "total INT(11), " +
    "stock INT(11), " +
    "PRIMARY KEY (id))"

var create_table_card = "create table " + TABLE_CARD +
    "(id INT(11) AUTO_INCREMENT, " +
    "name VARCHAR(25), " +
    "unit VARCHAR(255), " +
    "category VARCHAR(25), " +
    "PRIMARY KEY (id))"

var create_table_adm = "CREATE TABLE " + TABLE_ADM +
    "(id INT(11) AUTO_INCREMENT, " +
    "adm_id INT(11), " +
    "pwd VARCHAR(25), " +
    "name VARCHAR(25), " +
    "contect VARCHAR(255), " +
    "PRIMARY KEY (id))"

var create_table_record = "CREATE TABLE " + TABLE_RECORD +
    "(id INT(11) AUTO_INCREMENT, " +
    "card_no INT(11), " +
    "borrow_date DATETIME, " +
    "return_date DATETIME, " +
    "adm_id INT(11), " +
    "book_no INT(11), " +
    "returned INT(1) DEFAULT 0, " +
    "r_adm_id INT(11), " +
    "PRIMARY KEY (id))"

client.query(create_table_book, function(err){
    if (err){ throw err;}
});
client.query(create_table_card, function(err){
    if (err){ throw err;}
});
client.query(create_table_adm, function(err){
    if (err){ throw err;}
});
client.query(create_table_record, function(err){
    if (err){ throw err;}
});

console.log("OK!");
