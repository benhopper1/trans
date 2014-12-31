var path = require('path');
var fs = require('fs');
var configData = fs.readFileSync(path.dirname(require.main.filename) + '/main.conf', 'utf8');
configData = JSON.parse(configData);
var basePath = path.dirname(require.main.filename);


module.exports.controller = function(app){



	app.get('/handset/widget_handset', function(req, res){
		console.log("/phone/widget_documentReport get ");
		res.render('handset/handset.jade',
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












	//###########################################################################
	//----------------- > D a t a b a s e   I n t e r f a c e < -----------------
	//###########################################################################
	//var PhoneLogModel = require('../models/phonelogmodel.js');
	//var phoneLogModel = new PhoneLogModel();
}



// -- phone states
	//dialing, alerting, ringing, or waiting"