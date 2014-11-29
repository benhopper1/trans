//transactionToServer

console.log('loading-->----------------------->--  T r a n s a c t i o n   C o n t r o l l e r  --<-----------------------');
var fs = require('fs');
var path = require('path');
var basePath = path.dirname(require.main.filename);
var TransportLayer = require(basePath + '/libs/transportlayer.js');


//------------------>--COMMUNICATION--<-------------
var Controller = function(router){

	router.type('transactionToServer', function(inWss, inWs, inTransportLayer){
		console.log('transactionToServer in router routs!!!!!');
		if(inTransportLayer.toJson().routingLayer.command == 'getResumeJson'){
			var resumeData = fs.readFileSync(path.dirname(require.main.filename) + '/public/json/resume_001.json', 'utf8');
			resumeData = JSON.parse(resumeData);

			var transactionTransportLayer = inTransportLayer.getTransportLayerOnly();
			transactionTransportLayer.addRoutingLayer(
				{
					type:'transactionToClient'
				}
			);
			transactionTransportLayer.addDataLayer(
				{
					resumeData:resumeData
				}
			);

			inWs.send(transactionTransportLayer.toString());
		}
	});




}

module.exports = Controller;