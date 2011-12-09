var db = require('../config').db
function search(sel, call){
    var sql = 'select * from book where ';
    for (i in sel){
	if(i === 'order'){
	    sql = sql.slice(0, -4) + 'order by ' + 
		'"' + sel['order'] + '"';
	}else{
	    sql = sql + i + ' = ' + 
		'"'+ sel[i] +'"' +
		' and ';
	};
    };

    db.query(sql, function(err, results, fields){
	call(results, fields);
    });
};

exports.search = search;
