var check = require('../models/check');
var book  = require('../models/book');
var adm   = require('../models/adm');
var search = require('../models/search');
var fs    = require('fs');
var form  = require('connect-form');

module.exports = function(app){
    app.get('/adm/login', function(req, res){
	res.render('login', {title: 'Library', layout: 'layout'});
    });
    app.post('/adm/login', function(req, res){
	var adm_id = req.body.adm_id;
	var pwd    = req.body.pwd;
	check.is_adm(adm_id, pwd, function callback(chc, adm_id){
	    if (chc === 'yes'){
		req.session = {'sta': 'yes', 'adm_id': adm_id};
		res.redirect('/adm');
		res.end();
	    }else{
		res.redirect('/adm/login');
		res.end();
	    };
	});
    });
    app.get('/adm/logout', function(req, res){
	delete req.session;
	    res.redirect('/');
    });
    app.get('/adm', function(req, res){
	log(req, res, 'adm');
    });
    app.get('/adm/book_in', function(req, res){
	log(req, res, 'book_in');
    });
    app.post('/adm/book_in', function(req, res){  // <== Bug here :)
	var body = req.body;
	book.book_in(body, function callback(err){
	    if (err){
		throw err;
	    }
	    res.redirect('/adm')
	});

    });

/*
    app.get('/adm/books_in', function(req, res){
	log(req, res, 'books_in');
    });
    app.post('/adm/books_in', function(req, res){ // <= Bug here too :)
	console.log('about to parse');
	req.form.complete(function(err, fields, files){
	    console.log('parsed');
	    //fs.renameSync(files.book_list.path);
	    //console.log(files.book_list.path);
	    res.redirect('/adm');
	});
    });
*/

    app.get('/adm/borrow', function(req, res){
	log(req, res, 'borrow')
    });
    app.post('/adm/borrow', function(req, res){ // <== Bug here :)
	var card_no = req.body.card_no;
	var book_no = req.body.book_no;
	var adm_id  = req.session.adm_id;
	
	adm.card_exist(card_no, function call(check){
	    if(check === 'no'){
		res.send('no card');
	    };
	    adm.book_stock(book_no, function call(stock){
		if(stock === 0){
		    adm.get_return_date(book_no, function call(results){
			res.send(results);
		    });
		}else{
		    adm.book_borrowed(book_no);
		    adm.borrow_record(card_no, book_no, adm_id, function call(err){
			if(err){throw err};
		    });
		    var sel = {'book_no': book_no, 'order': 'title'};
		    search.search(sel, function call(results, fields){
			res.send(results);
		    });
		};
	    });
	});

    });

    //render
    function log(req, res, render){
	if (req.session && req.session['sta'] === 'yes'){
	    res.render(render, {title: 'Library', adm_id: req.session.adm_id, layout:'layout'});
	}else{
	    res.redirect('/adm/login');
	};
    };
};
