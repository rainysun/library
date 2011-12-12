var form = require('connect-form');
var fs   = require('fs');

module.exports = function(app){
    app.post('/adm/books_in', function(req, res){
	console.log('about to parse');
	console.log(req.files);
	fs.rename(req.files.upload.path, './1.json');
	//fs.write(req.files, './1.json');
	console.log('parsed');
    });
}
