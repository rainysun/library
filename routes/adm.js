var check = require('../models/check');
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
		//res.render('adm', {title: 'Library', adm_id: req.session.adm_id, layout: 'layout'});
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
	if (req.session && req.session['sta'] === 'yes'){
	    res.render('adm', {title: 'Library', adm_id: req.session.adm_id, layout:'layout'});
	}else{
	    res.redirect('/adm/login');
	};
    });
};
