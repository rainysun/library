var db = require('../config').db
function is_adm (adm_id, pwd, callback){
    db.query('select pwd from adm where adm_id = ' + adm_id, function check(err, res){
	if(err){throw err};
	var check = res[0]['pwd'] === pwd ? 'yes':'no';
	callback(check, adm_id);
    });
};

exports.is_adm = is_adm;
