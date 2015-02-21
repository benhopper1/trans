var fs = require('fs');
var path = require('path');
var basePath = path.dirname(require.main.filename);
var configData = fs.readFileSync(basePath + '/main.conf', 'utf8');
configData = JSON.parse(configData);
var finish = require(basePath + '/node_modules/finish');

var extend = require(basePath + '/node_modules/node.extend');


var Connection = require(basePath + '/models/connection.js');
//var nodemailer = require(basePath + '/node_modules/nodemailer');
var uuid = require(basePath + '/node_modules/node-uuid');
var connection = Connection.getMaybeCreate(
	{
		instanceName:'arf',
		host:configData.mysqlServerConnection.host,
		user:configData.mysqlServerConnection.user,
		password:configData.mysqlServerConnection.password,
		database:configData.mysqlServerConnection.database

	}
);



connection = Connection.getInstance('arf').getConnection();
var MaintenanceModel = require(basePath + '/models/maintenancemodel');
var maintenanceModel = new MaintenanceModel();

maintenanceModel.deleteOldPhoneCacheFiles(
	{

	}, function(err, inData){
		console.log('RETRUNED:');
		console.dir(inData);
	}
);

//-=-=-=-=-=-=-==-==-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-==--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	var _this = this;

	/*var getMinuteFromMs = function(inMs){
		return Math.floor(inMs / (1000 * 60));
	}

	var getDayFromMs = function(inMs){
		return Math.floor(inMs / (1000 * 60 * 1440));
	}

	var getHourFromMs = function(inMs){
		return Math.floor(inMs / (1000 * 60 * 60));
	}

	this.deleteOldCacheFiles = function(inOptions){
		var options = 
			{
				minutesOld:5,
			}
		options = extend(options, inOptions);

		var PHONE_CACHE_FOLDER = basePath + configData.phoneCacheStorageFolder;
		var NOW = new Date().getTime();
		var files = fs.readdirSync(PHONE_CACHE_FOLDER);


		// HASH:  key: domainPath, val:physical path
		var oldFilesHash = {};
		for(var filesIndex in files){
			var fileTime =  fs.statSync(path.join(PHONE_CACHE_FOLDER, files[filesIndex])).ctime;
			var fileTimeMs = new Date(fileTime).getTime();

			if(getMinuteFromMs(NOW - fileTimeMs) > options.minutesOld){
				oldFilesHash[configData.phoneCacheStorageFolder + '/' + files[filesIndex]] = path.join(PHONE_CACHE_FOLDER, files[filesIndex]);
			}
		}

		console.dir(oldFilesHash);
	}

	_this.deleteOldCacheFiles();*/
