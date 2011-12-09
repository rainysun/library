var db = require('../config').db;
require('fs').readFileSync('booklist').toString().split('\n').forEach(function(line){
    var arr = new Array();
    arr = line.split(',');
    console.log(arr);
    db.query('insert into book' + ' set book_no = ?, category = ?, title = ?, press = ?, year = ?, author = ?, price = ?, total = ?, stock = ?', arr, function(err){
		if(err){throw err;}
		console.log('done');
	    });
});
/*
    db.query('insert into book' +
	    ' set book_no = ?, category = ?, title = ?, press = ?, year = ?, author = ?, price = ?, total = ?, stock = ?', [ '12', 'hac', 'aged', 'adh', '1999', 'dghhb', '20', '78', '78' ], function(err){
		if(err){console.log(err);}
	    });
*/
