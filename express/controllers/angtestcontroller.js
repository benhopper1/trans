var path = require('path');
var fs = require('fs');
var configData = fs.readFileSync(path.dirname(require.main.filename) + '/main.conf', 'utf8');
configData = JSON.parse(configData);

module.exports.controller = function(app){

	app.get('/angtest', function(req, res){
		console.log("/angtest");
		res.render('angtest/angtest.jade',{});
	});

	app.post('/angtest', function(req, res){
		console.log("/angtest POST");
		res.render('angtest/angtest.jade',{});
	});

	var counter = 0;
	app.post('/testrest', function(req, res){
		console.log("/testrest post");
		console.dir(req.body);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(
			{
				testKey:'testValue', 
				newName:req.body.contactName,
				body:req.body
			}
		));
	});


	app.get('/testrest', function(req, res){
		console.log("/testrest get");
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(
			{
				testKey:'testValue',
				body:req.body
			}
		));
		//res.end(JSON.stringify({testKey:'testValue',}));
	});

	app.get('/getFiles', function(req, res){
		console.log("/getFiles get");
		console.log('req.query' + req.query);
		console.dir(req.query);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(

				[
					{
						type:'file',
						dir:'someDir2',
						file:'someFile0.txt',
						ext:'.txt'
					},
					{
						type:'dir',
						dir:'someDir2',
						file:'directoryName',
						ext:''
					}
				]

		));
	});
}