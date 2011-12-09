var fs = require('fs');

fs.open('./booklist', 'w', function(err, fd){
    //var firstline = '#book_no | category | title | press | year | author | price | total' + '\n';
    var alp = ['a', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var year= [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1999, 2011];
    var lines = '';
    for (i=0; i<30; i++){
	var total = Math.floor(Math.random()*100+15);
	lines = lines + i + ',' +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] + ',' +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] + ',' +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] + ',' +
		year[Math.floor(Math.random()*9)] + ',' +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] +
		alp[Math.floor(Math.random()*9)] + ',' +
		Math.floor(Math.random()*100+15) + ',' +
		total + ',' +
		total 
		if(i < 29){
		    lines = lines + '\n';
		}
    }
    fs.write(fd, lines);
});

