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





	app.get('/phone/widget_phoneWindow', function(req, res){
		console.log("/phone/widget_phoneWindow get ");
		res.render('phone/widget_phonewindow.jade',
			{
				userId:req.cookies.userId,
				deviceId:"815",//req.cookies.deviceId,
				URL:configData.domain.address + ":" + configData.domain.port,
				webSocketClient:configData.webSocketClient,
				defaultUserImageUrl:configData.defaultUserImageUrl,
				defaultMemberImageUrl:configData.defaultMemberImageUrl,
				data:
					{
					}
			}
		);
	});


	app.get('/phone/widget_phonePropertyGrid', function(req, res){
		console.log("/phone/widget_phonePropertyGrid get ");
		res.render('phone/widget_phonepropertygrid.jade',
			{
				userId:req.cookies.userId,
				deviceId:"815",//req.cookies.deviceId,
				URL:configData.domain.address + ":" + configData.domain.port,
				webSocketClient:configData.webSocketClient,
				defaultUserImageUrl:configData.defaultUserImageUrl,
				defaultMemberImageUrl:configData.defaultMemberImageUrl,
				data:req.query
			}
		);
	});

	app.get('/phone/json/controllgrid', function(req, res){
		console.log("/widget_phoneWindow post");
		console.dir(req.query);


		//res.setHeader('Content-Type', 'application/json');
		res.json(
			[{
					"id":1,
					"text":"hopper1"
				},{
					"id":2,
					"text":"text2"
				},{
					"id":3,
					"text":"text3",
					"selected":true
				},{
					"id":4,
					"text":"text4"
				},{
					"id":5,
					"text":"text5"
			}]
		);
	});




	app.post('/phone/widget_phoneWindow', function(req, res){
		console.log("/widget_phoneWindow post");
		/*
		console.dir(req.body);
		res.render('phone/widget_phoneContacts.jade',req.body);*/
	});


	//###########################################################################
	//----------------- > D a t a b a s e   I n t e r f a c e < -----------------
	//###########################################################################
	var PhoneLogModel = require('../models/phonelogmodel.js');
	var phoneLogModel = new PhoneLogModel();

	app.post('/database/phonelog/addManyPhoneLog', function(req, res){
		console.log("/database/phonelog/addManyPhoneLog post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId; //parseInt(req.cookies.userId);
		phoneLogModel.addManyPhoneLog(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					/*hadError:((err)? true : false),
					err:err,
					result:result*/
				}
			));
		});
		//res.setHeader('Content-Type', 'application/json');
	});

	app.post('/database/phonelog/getUPhoneNumbers', function(req, res){
		console.log("/database/phonelog/getUPhoneNumbers");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;
		phoneLogModel.getUPhoneNumbers(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err,
					result:result
				}
			));
		});

	});
	
	app.post('/database/phonelog/getPhoneLogLastId', function(req, res){
		console.log("/database/phonelog/getPhoneLogLastId");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;
		phoneLogModel.getPhoneLogLastId(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err,
					result:result
				}
			));
		});

	});

	// optional phoneNumber, if none then returns any phoneNumber's data
	app.post('/database/phonelog/getLast', function(req, res){
		console.log("/database/phonelog/getLast");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId; 
		phoneLogModel.getLast(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err,
					result:result
				}
			));
		});

	});

	app.post('/database/phonelog/getLastForDataGrid', function(req, res){
		console.log("/database/phonelog/getLast");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		console.log('body:');
		console.dir(req.body);
		req.body['userId'] = req.cookies.userId; 
		phoneLogModel.getLast(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result));
		});

	});

}