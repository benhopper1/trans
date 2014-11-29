var path = require('path');
var fs = require('fs');
var configData = fs.readFileSync(path.dirname(require.main.filename) + '/main.conf', 'utf8');
configData = JSON.parse(configData);
var basePath = path.dirname(require.main.filename);



module.exports.controller = function(app){

	app.post('/security/process', function(req, res){
		var waitingDeviceTokenId = req.body.waitingDeviceTokenId;
		securityCheck(req, res, waitingDeviceTokenId, function(inSecurityOk, inUserId){
			if(inSecurityOk){
				res.cookie('canProcess', "true", { maxAge: (60000 * 60 * 24), httpOnly: true });

				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(
					{
						userId:inUserId
					}
				));
			}else{
				res.cookie('canProcess', "false", { maxAge: (60000 * 60 * 240000), httpOnly: true });
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(
					{
						error:
							{
								caption:"security did not get verified"
							}
					}
				));
			}
		});

	});











	var securityCheck = function(req, res, inWaitingDeviceTokenId, inPostFunction){
		console.log('securityCheck-----:');
		var TcpClient = require(basePath + '/library/tcpservices/tcpclient.js');
		tcpClient = new TcpClient(
			{
				host:'192.168.0.16',
				port:30400
			}
		);
		console.log('tcpClient----------------------------------------------------------');
		tcpClient.send(
			{
				message:
					{
						request:"getUserIdAndDeviceId",
						deviceTokenId:inWaitingDeviceTokenId
					},
				onMessage:function(inMessage){
					console.log('onMessage back from TCP server in security check in controller...:' + inMessage);
					if(inMessage){

						if(inMessage.response == 'bad'){
							console.log('--------  bad response from tcp bridge -------------');
							console.log('--------  bad DONNOT ALLOW ACCESS ------------------');
							inPostFunction(false, false);
						}
						if(inMessage.userId){
							res.cookie('userId', inMessage.userId, { maxAge: (60000 * 60 * 24), httpOnly: true });
							if(inPostFunction){
								inPostFunction(true, inMessage.userId);
							}
						}

					}
				}
			}
		);

		return true;
	}


}