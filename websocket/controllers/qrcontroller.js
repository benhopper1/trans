console.log('loading-->----------------------->--  Q R   C o n t r o l l e r  --<-----------------------');
var fs = require('fs');
var path = require('path');
var basePath = path.dirname(require.main.filename);
var TransportLayer = require(basePath + '/libs/transportlayer.js');
var uuid = require(basePath + '/node_modules/node-uuid');


var hashOfWaitingWs = {};
/*

connectByQr
waitingForScan


*/





//------------------>--COMMUNICATION--<-------------
var Controller = function(router){

	// handled as transaction....   return...routingLayer.type == 'transactionToClient'
	router.type('transactionToServer', function(inWss, inWs, inTransportLayer){
		console.log('qr in router routs!!!!!');

		//---client side waiting for device to scan code--------------------
		if(inTransportLayer.toJson().routingLayer.command == 'waitForQr'){
			var waitingId = uuid.v1();
			inWs.waitingId = waitingId;
			console.log('waitForQr routing command!!!!!' + waitingId);

			//add to waiting hash--------
			hashOfWaitingWs[waitingId] = 
				{
					wss:inWss,
					ws:inWs,
					transportLayer:inTransportLayer
				};

			inWss.waitDeviceTokenIdHash[waitingId] = inWs;

			var transactionTransportLayer = inTransportLayer.getTransportLayerOnly();
			transactionTransportLayer.addRoutingLayer(
				{
					type:'transactionToClient'
				}
			);
			transactionTransportLayer.addDataLayer(
				{
					cmd:'syncMResponse',
					cd:waitingId
				}
			);

			inWs.send(transactionTransportLayer.toString());
		}//end connectByQr------------------------------------------------------


		//device scanned code, asking server to login the waiting client by scan code-----

		if(inTransportLayer.toJson().routingLayer.command == 'connectWaitingQr'){
			console.log('connectWaitingQr');
			console.log('cmd' + inTransportLayer.toJson().dataLayer.cmd);
			console.log('cd' + inTransportLayer.toJson().dataLayer.cd);
			console.log('dump hashOfWaitingWs--------------------');
			console.dir(hashOfWaitingWs);
			console.log('geting from hash:' + inTransportLayer.toJson().dataLayer.cd);
			var waitingData = hashOfWaitingWs[inTransportLayer.toJson().dataLayer.cd];
			if(waitingData){
				var waitingTransportLayer = waitingData.transportLayer;
				waitingTransportLayer.toJson().dataLayer.userName = inWs.userName;
				waitingTransportLayer.toJson().dataLayer.password = inWs.password;
				waitingTransportLayer.toJson().routingLayer.type = "setupToServer";
				console.log('userName:' + inWs.userName);
				console.log('password:' + inWs.password);
				router.reportOnRoute(waitingData.wss, waitingData.ws, waitingTransportLayer);
			}
		}




	});





	//case:user is in hashOfWaitingWs and waiting, decides to unload page,
	//now disconect happens, cleanup here and ignore everywhere else, no userId etc...
	router.onDisconnect(function(inWss, inWs){
		if(!(inWs.waitingId)){return false;}
		if(hashOfWaitingWs[inWs.waitingId]){
			console.log('deleted waiting entry from hashOfWaitingWs');
			delete hashOfWaitingWs[inWs.waitingId];
		}
	});







}

module.exports = Controller;