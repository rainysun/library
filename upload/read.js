var db = require('../config').db;
require('fs').readFileSync('virtualLibrary').toString().split('\n').forEach(function(line){
    var arr = new Array();
    if (line === ''){return;}
    arr = line.split(',');
    console.log(arr);
    db.query('insert into book' + ' set book_no = ?, category = ?, title = ?, press = ?, year = ?, author = ?, price = ?, total = ?, stock = ?', arr, function(err){
		if(err){throw err;}
		console.log('done');
	    });
});
