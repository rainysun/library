var db = require('../config').db;
function book_in(book, callback){
    db.query('insert into book' + 
	    ' set book_no = ?, category = ?, title = ?, press = ?, year = ?, author = ?, price = ?, total = ?, stock = ?', [book.book_no, book.category, book.title, book.press, parseInt(book.year), book.author, parseFloat(book.price), parseInt(book.total), parseInt(book.total)] , function(err){
	callback(err);
    });
};

exports.book_in = book_in;
