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
	check.is_adm(adm_id, pwd, function callback(chc, result){
	    if (chc === 'yes'){
		req.session = {'sta': 'yes', 'adm_id': adm_id, 'adm_name': result[0].name};
		res.redirect('/adm');
		res.end();
	    }else{
		res.redirect('/adm/login');
		res.end();
	    };
	});
    });
    app.get('/adm/logout', function(req, res){
	//auth(req, res);
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
	auth(req, res);
	var body = req.body;
	book.book_in(body, function callback(err){
	    if (err){
		throw err;
	    }
	    res.redirect('/adm')
	});

    });
    app.get('/adm/books_in', function(req, res){
	log(req, res, 'books_in');
    });
    app.get('/adm/borrow', function(req, res){
	log(req, res, 'borrow');
    });
    app.post('/adm/borrow', function(req, res){ // <== Bug here :)
	auth(req, res);
	var card_no = req.body.card_no;
	var book_no = req.body.book_no;
	var adm_id  = req.session.adm_id;
	
	adm.card_exist(card_no, function call(check){
	    if(check === 'no'){
		res.send('Not a Card No!');
	    };
	    adm.book_stock(book_no, function call(stock){
		if(stock === 'null'){
		    res.send('no such book!');
		    return;
		}else if(stock === 0){
		    adm.get_return_date(book_no, function call(results){
			res.send('Book ' + results['book_no'] + ' will be reurn at: ' + results['return_date']
			    + '<br/>' + '<a href="/adm">Back to Adm Panel</a>');
			return;
		    });
		}else{
		    adm.book_borrowed(book_no);
		    adm.borrow_record(card_no, book_no, adm_id, function call(err){
			if(err){throw err};
		    });
		    var sel = {'book_no': book_no, 'order': 'title'};
			console.log('record added');
			res.redirect('/adm/mybooklist/'+card_no)
		    return;
		};
	    });
	    /*
	    	    */
	
	});
    });

    app.get('/adm/return', function(req, res){
	log(req, res, 'return');
    });
    app.post('/adm/return', function(req, res){
	auth(req, res);
	var card_no = req.body.card_no;
	var book_no = req.body.book_no;
	var adm_id  = req.session.adm_id;
	adm.card_exist(card_no, function call(check){
	    if(check === 'no'){
		res.send('no card');
	    };
	    adm.book_returned(book_no);
	    adm.return_record(card_no, book_no, adm_id);
	    adm.get_borrowed_books(card_no, function call(results){
		res.render('results', {layout: 'layout', results: results, h1: 'My Book List'});
	    });
	 
	});
    });
	app.get('/adm/new_card', function(req, res){
	    auth(req, res);
	    res.render('new_card', {title: 'Library', layout: 'layout'});
	});
	app.post('/adm/new_card', function(req, res){
	    auth(req, res);
	    var info = req.body;
	    adm.new_card(info, function call(result){
		res.send('Your Card No is: ' + result.insertId + '<br/>' + "<a href='/adm'>Back to Adm Panel</a>");
	    });
	});
	app.get('/adm/del_card', function(req, res){
	    auth(req, res);
	    res.render('del_card', {title: 'Library', layout: 'layout'});
	});
	app.post('/adm/del_card', function(req, res){
	    auth(req, res);
	    var card_no = req.body.card_no;
	    adm.del_card(card_no, function call(){
		res.send('Card ' + card_no + ' Has been Deleted!'+
		    '<br/>'+'<a href="/adm">Back to Adm Panel</a>');
	    });
	});
	app.get('/adm/mybooklist/:card_no',function(req, res){
	    var card_no = req.params.card_no;
	    adm.get_borrowed_books(card_no, function call(results){
		console.log('get borrowed books');
		res.render('results', {layout: 'layout', results: results, h1: 'My Book List'});
		//res.send(results);
	    });

	});

    //render
    function log(req, res, render){
	if (req.session && req.session['sta'] === 'yes'){
	    res.render(render, {title: 'Library', adm_name: req.session.adm_name, layout:'layout'});
	}else{
	    res.redirect('/adm/login');
	};
    };
    function auth(req, res){
	if (req.session && req.session.sta === 'yes'){
	    return;
	}else{
	    res.redirect('/adm/login');
	};
    };
};
