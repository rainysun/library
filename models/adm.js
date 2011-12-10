var db = require('../config').db;

function card_exist(card_no, call){
    db.query('select * from card where card_no = ' +
	    card_no, function check(err, res){
		if(err){throw err};
		var check = res.length === 0 ? 'no' : 'yes';
		call(check);
	    });
};

function book_stock(book_no, call){
    db.query('select * from book where book_no = ' +
	    book_no, function check(err, res){
		if(err){throw err};
		var stock = res[0]['stock'];
		call(stock);
    });
};

function book_borrowed(book_no){
    db.query('update book set stock = stock - 1 where book_no = ' + book_no, function call(err){
	if(err){throw err};
    });
};

function borrow_record(card_no, book_no, adm_id, call){
    var b_date = new Date();
    var r_date = new Date();
    r_date.setTime(r_date.getTime() + 3456000000);
    var b_d_s = b_date.getFullYear() + '-' + (b_date.getMonth()+1) + '-' + b_date.getDate() + ' ' + b_date.toLocaleTimeString();
    var r_d_s = r_date.getFullYear() + '-' + (r_date.getMonth()+1) + '-' + r_date.getDate() + ' ' + r_date.toLocaleTimeString();
    db.query('insert into record set card_no = ?, book_no = ?, borrow_date = ?, return_date = ?, adm_id = ?', [card_no, book_no, b_d_s, r_d_s, adm_id], function(err){
	call(err);
    });
};

function get_return_date(book_no, call){
    db.query('select * from record where book_no = ' + book_no, function(err, results){
	call(results[0]['return_date']);
    });
};
exports.card_exist = card_exist;
exports.book_stock = book_stock;
exports.book_borrowed = book_borrowed;
exports.borrow_record = borrow_record;
exports.get_return_date = get_return_date;
