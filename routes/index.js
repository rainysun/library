var search = require('../models/search');

module.exports = function(app){
    app.get('/', function(req, res){
	res.render('index', {title: 'Virtual Library', layout: 'layout'});
    });
    app.post('/base_search', function(req, res){
	var sb = req.body;
	var sel = {};
	var empty = true;
	for (i in sb){
		sel[i] = sb[i];
	};
	search.search(sel, function call(results, fields){
	//res.send(results);
	    res.render('results', {title: 'Library', layout: 'layout', results: results});
	});
	//res.render('results', {title: 'Library', layout: 'layout', res: sb});
		/*
	var sel = {};
	for (i in sb){
	    if (sb[i] != ''){
		sel[i] = sb[i];
	    }
	}

	search.search(sel, function call(results, fields){
	    res.send(results);
	});
	*/

    });
};
