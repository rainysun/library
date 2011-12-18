var db = require('../config').db
function search(sel, call){
    var sql = 'select * from book where ';
    for (i in sel){
	if(i === 'order'){
	    sql = sql.slice(0, -4) + 'order by ' + 
		sel['order'];
	}else if(i === 'year0'){
	    sql = sql + ' year >= ' + sel[i] + 
		' and ';
	}else if(i === 'year1'){
		sql = sql + 'year <= ' +  sel[i] + 
		' and ';
	}else{
		sql = sql + i + ' = ' +
		'"' + sel[i] + '"' +
		' and ';
	};
	};
	console.log(sql);


    db.query(sql, function(err, results, fields){
	if(results.length != 0 && results[0]['stock'] === 0){
	};
	call(results, fields);
	//call(sql);
    });
};

exports.search = search;
