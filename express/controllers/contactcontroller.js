var path = require('path');
var fs = require('fs');
var configData = fs.readFileSync(path.dirname(require.main.filename) + '/main.conf', 'utf8');
configData = JSON.parse(configData);


module.exports.controller = function(app){

	app.get('/widget_contactscollection', function(req, res){
		console.log("/widget_contactscollection get");
		res.render('contacts/widget_contactscollection.jade',
			{

			}
		);
	});

	app.post('/widget_contactscollection', function(req, res){
		console.log("/widget_contactscollection post");
		res.render('contacts/widget_contactscollection.jade',req.body);
	});







	app.get('/widget_contactsform', function(req, res){
		console.log("/widget_contactsform post");
		res.render('contacts/widget_contactsform.jade',{});
	});

	app.post('/widget_contactsform', function(req, res){
		console.log("/widget_contactsform post");
		res.render('contacts/widget_contactsform.jade',req.body);
	});


//###########################################################################
//----------------- > D a t a b a s e   I n t e r f a c e < -----------------
//###########################################################################
	var ContactModel = require('../models/contactmodel.js');
	var contactModel = new ContactModel();
	app.post('/database/addContact', function(req, res){
		console.log("/database/addContact post");
		//res.render('contacts/addcontact.jade',req.body);
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;
		contactModel.addContact(req.body, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err,
					result:result
				}
			));
		});
		res.setHeader('Content-Type', 'application/json');
	});

	app.post('/database/getContacts', function(req, res){
		console.log("/database/getContacts post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;
		contactModel.getContacts(req.body, function(err, rows, fields){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					rows:rows,
					fields:fields
				}
			));
		});
		res.setHeader('Content-Type', 'application/json');
	});

	app.post('/database/editContact', function(req, res){
		console.log("/database/editContact post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;
		contactModel.editContact(req.body, function(err, rows, fields){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false)
				}
			));
		});
		res.setHeader('Content-Type', 'application/json');
	});

	app.post('/database/deleteContact', function(req, res){
		console.log("/database/deleteContact post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;

		contactModel.deleteContact(req.body, function(err, rows, fields){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					err:err
				}
			));
		});
	});





	/*app.get('/getContactsRecords', function(req, res){
		console.log("/getContactsRecords get");
		console.log('queryString:');
		console.dir(req.query);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(
			{
				rows:
					[
						{
							imagePath:"public/images/characters/face1.jpg",
							contactName:"Ben Hopper0",
							contactNumber:"1-256-111-1110",
							emailAddress:"hopperdevelopment@gmail.com"
						},

						{
							imagePath:"public/images/characters/face2.jpg",
							contactName:"Ben Hopper1",
							contactNumber:"12564662496"
						},

						{
							imagePath:"public/images/characters/face3.jpg",
							contactName:"Ben Hopper2",
							contactNumber:"1-256-111-1112"
						}

					]
			}
		));
	});
*/

	app.post('/database/getContactsForCombo', function(req, res){
		console.log("/database/getContacts post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;
		contactModel.getContacts(req.body, function(err, rows, fields){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(rows));
		});
		res.setHeader('Content-Type', 'application/json');
	});

	app.post('/database/getUserData', function(req, res){
		console.log("/database/getUserData post");
		console.log('---------userId---------------------------------:' +  req.cookies.userId);
		req.body['userId'] = req.cookies.userId;
		contactModel.getUserData(req.body, function(err, rows, fields){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(
				{
					hadError:((err)? true : false),
					rows:rows,
					fields:fields
				}
			));
		});
		res.setHeader('Content-Type', 'application/json');
	});





}