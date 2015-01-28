var path = require('path');
var fs = require('fs');
var configData = fs.readFileSync(path.dirname(require.main.filename) + '/main.conf', 'utf8');
configData = JSON.parse(configData);

module.exports.controller = function(app){



	app.get('/jqm/smsManager', function(req, res){
		console.log('cookie userId:' + req.cookies.userId);
		if(req.cookies.userId){
			console.log("/jqm/smsManager");
			res.render('sms/smsmanager.jqm.jade',
				{
					userId:req.cookies.userId,
					deviceId:"815",//req.cookies.deviceId,
					URL:configData.domain.address + ":" + configData.domain.port,
					androidAppRoute:configData.androidAppRoute,
					webSocketClient:configData.webSocketClient,
					defaultUserImageUrl:configData.defaultUserImageUrl,
					defaultMemberImageUrl:configData.defaultMemberImageUrl,
					data:
						{
						}
				}
			);
		}else{
			//============================================================
			//YOUR NOT LOGED IN ------------------------------------------
			//============================================================
			console.log("/jqm/smsManager    YOUR NOT LOGED IN????");
			/*res.render('contacts/widget_contactscollection.jade',
				{

				}
			);*/
		}
	});


	app.get('/jqm/contactselectpopup', function(req, res){
		console.log('cookie userId:' + req.cookies.userId);
		if(req.cookies.userId){
			console.log("/jqm/contactselectpopup");
			res.render('sms/contactselectpopup.jqm.jade',
				{
					userId:req.cookies.userId,
					deviceId:"815",//req.cookies.deviceId,
					URL:configData.domain.address + ":" + configData.domain.port,
					androidAppRoute:configData.androidAppRoute,
					webSocketClient:configData.webSocketClient,
					defaultUserImageUrl:configData.defaultUserImageUrl,
					defaultMemberImageUrl:configData.defaultMemberImageUrl,
					data:
						{
						}
				}
			);
		}else{
			//============================================================
			//YOUR NOT LOGED IN ------------------------------------------
			//============================================================
			console.log("/jqm/contactselectpopup    YOUR NOT LOGED IN????");
			/*res.render('contacts/widget_contactscollection.jade',
				{

				}
			);*/
		}
	});

	app.get('/entity_smsmessage', function(req, res){
		console.log("/entity_smsmessage get");
		res.render('sms/entity_smsmessage.jade',
			{
				sms:
					{
						imagePath:"public/images/characters/face1.jpg",
						threadId:"37",
						name:"Ben hopp22",
						dateStamp:"1415849143563",
						phoneNumber:"12564662496",
						messageBody:"the msg body how is life because this is just a test boy!!!"
					}
			}
		);
	});

	app.post('/entity_smsmessage', function(req, res){
		console.log("/entity_smsmessage post");
		res.render('sms/entity_smsmessage.jade',req.body);
	});






//------------------------------------------------------------
	app.get('/widget_smsMessageWindow', function(req, res){
		console.log("/widget_smsMessageWindow get");
		res.render('sms/widget_smsmessagewindow.jade',req.body);
	});




	//###########################################################################
	//----------------- > D a t a b a s e   I n t e r f a c e < -----------------
	//###########################################################################
	var SmsModel = require('../models/smsmodel.js');
	var smsModel = new SmsModel();

	app.post('/database/sms/addManySms', function(req, res){
		console.log("/database/sms/addManySms post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId; //parseInt(req.cookies.userId);
		smsModel.addManySms(req.body, function(err, result){
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

	app.post('/database/sms/getSmsLastId', function(req, res){
		console.log("/database/sms/getSmsLastId post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId; //parseInt(req.cookies.userId);
		smsModel.getSmsLastId(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err,
					result:result
				}
			));
		});
		//res.setHeader('Content-Type', 'application/json');
	});

	app.post('/database/sms/getAllSmsByPhone', function(req, res){
		console.log("/database/sms/getAllSmsByPhone post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId; //parseInt(req.cookies.userId);
		smsModel.getAllSmsByPhone(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err,
					result:result
				}
			));
		});
		//res.setHeader('Content-Type', 'application/json');
	});

	app.post('/database/sms/getMissingSmsByPhone', function(req, res){
		console.log("/database/sms/getMissingSmsByPhone post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId; //parseInt(req.cookies.userId);
		smsModel.getMissingSmsByPhone(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err,
					result:result
				}
			));
		});
		//res.setHeader('Content-Type', 'application/json');
	});

}