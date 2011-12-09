var db = require('../config').db;
function borrow(record, call){
    db.query(,,function(err){
	call(err);
    });
};
