
var fs = require('fs');
var path = require('path');
var basePath = path.dirname(require.main.filename);
var configData = fs.readFileSync(basePath + '/main.conf', 'utf8');
configData = JSON.parse(configData);
var finish = require(basePath + '/node_modules/finish');

var extend = require(basePath + '/node_modules/node.extend');
var Underscore = require(basePath + '/node_modules/underscore');

var Connection = require(basePath + '/models/connection.js');
//var nodemailer = require(basePath + '/node_modules/nodemailer');

var configData = fs.readFileSync('main.conf', 'utf8');
configData = JSON.parse(configData);

var basePath = path.dirname(require.main.filename);



/*var uuid = require(basePath + '/node_modules/node-uuid');
var WebSocket = require(basePath + '/node_modules/ws');*/

console.log('test App running');

var ws_cfg = {
	ssl: true,
	port: 8080,
	ssl_key: 	fs.readFileSync(	basePath 	+	'/node_modules/key.pem'		),
	ssl_cert: 	fs.readFileSync(	basePath 	+	'/node_modules/cert.pem'	)
};
 
var processRequest = function(req, res) {
	console.log("Request received.")
};
 
var https = require('https');
var app = null;
 
app = https.createServer({
	key: ws_cfg.ssl_key,
	cert: ws_cfg.ssl_cert
}, processRequest).listen(ws_cfg.port);
 
//var WebSocketServer = require('ws').Server, ws_server = new WebSocketServer(ws_cfg);
 
var WebSocketServer = require(basePath + '/node_modules/ws').Server;
var ws_server = new WebSocketServer( {server: app});
