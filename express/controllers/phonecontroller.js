var path = require('path');
var fs = require('fs');
var configData = fs.readFileSync(path.dirname(require.main.filename) + '/main.conf', 'utf8');
configData = JSON.parse(configData);
var basePath = path.dirname(require.main.filename);

module.exports.controller = function(app){

	app.post('/widget_phoneContacts', function(req, res){
		console.log("/widget_phoneContacts post");
		console.dir(req.body);
		res.render('phone/widget_phoneContacts.jade',req.body);
	});

	app.get('/widget_phoneContacts', function(req, res){
		console.log("/widget_phoneContacts get ");
		//console.dir(req.body);
		res.render('phone/widget_phoneContacts.jade',{data:'dataValue'});
	});






	app.get('/widget_keypad', function(req, res){
		console.log("/widget_keypad get ");
		res.render('phone/widget_keypad.jade',{data:'dataValue'});
	});




/*	app.get('/noConnection', function(req, res){
		console.log("/noConnection");
		res.render('demo/noconnection.jade',
			{
				data:
					{
					}
			}

		);
	});*/

}