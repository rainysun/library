var db_opt = {
    host: 'localhost',
    port: 3306,
    user: 'rainy',
	password: 'rainy',
    database: 'library'
};

var mysql = new require('mysql'), db = null;
if(mysql.createClient){
    db = mysql.createClient(db_opt);
}else{
    db = new mysql.Client(db_opt);
    db.connect(function(err){
	if(err){
	    console.error("connect db " + db.host + " error: " + err);
	    process.exit();
	}
    });
}
exports.db = db;
