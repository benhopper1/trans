var fs = require('fs');
var path = require('path');
var basePath = path.dirname(require.main.filename);
var configData = fs.readFileSync(basePath + '/main.conf', 'utf8');
configData = JSON.parse(configData);

var extend = require(basePath + '/node_modules/node.extend');
var Connection = require(__dirname + '/connection.js');
var uuid = require(basePath + '/node_modules/node-uuid');
var finish = require(basePath + '/node_modules/finish');

var Model = function(){
	var _this = this;

	this.getLast = function(inParams, inPostFunction){
		console.log('-----getLast-----------------------------------------------------');
		var fieldData = 
			{
				userId:false,
				limit:'1000',
				queryOption:'everyday',
				status:'%'
			}
		fieldData = extend(fieldData, inParams);
		if(!(fieldData.userId)){
			console.log('ERROR _> no USERID!!!!');
			if(inPostFunction){
				var err = 'No User Id, records will not be added(contactModel.addContact)';
				inPostFunction(err, false, false);
			}
		}

		var sqlString; 
		if(fieldData.phoneNumber){


			if(fieldData.queryOption == 'everyday'){
				sqlString = 
					"SELECT FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) AS entryDateTime, LEFT(callDate, 10) AS epochEntry,TIMESTAMPDIFF(WEEK, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS weeksOld,TIMESTAMPDIFF(DAY, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS daysOld,TIMESTAMPDIFF(MINUTE, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS minutesOld,TIMESTAMPDIFF(SECOND, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS secondsOld,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE())AS today,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY))AS yesterday,t1.*,t2.name,t2.emailAddress,t2.companyName,t2.title,t2.department,t2.ext,t2.imageUrl, CONVERT(phoneLogId, UNSIGNED INTEGER) AS sortOrder FROM tb_phoneLog AS t1"	+ " " +
						"LEFT JOIN tb_storedContacts as t2 ON t1.phoneNumber = t2.phoneNumber AND t1.userId = t2.userId"		+ " " +
							"WHERE t1.userId = " + connection.escape(parseInt(fieldData.userId))								+ " " +
							"AND t1.phoneNumber = " + connection.escape(fieldData.phoneNumber) 									+ " " +
							"AND t1.status LIKE " + connection.escape(fieldData.status) 										+ " " +
							"ORDER BY t1.callDate DESC"																			+ " " +
					"LIMIT " + connection.escape(parseInt(fieldData.limit))														+ " "
				;
			}
			if(fieldData.queryOption == 'today'){
				sqlString = 
					"SELECT FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) AS entryDateTime, LEFT(callDate, 10) AS epochEntry,TIMESTAMPDIFF(WEEK, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS weeksOld,TIMESTAMPDIFF(DAY, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS daysOld,TIMESTAMPDIFF(MINUTE, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS minutesOld,TIMESTAMPDIFF(SECOND, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS secondsOld,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE())AS today,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY))AS yesterday,t1.*,t2.name,t2.emailAddress,t2.companyName,t2.title,t2.department,t2.ext,t2.imageUrl, CONVERT(phoneLogId, UNSIGNED INTEGER) AS sortOrder FROM tb_phoneLog AS t1"	+ " " +
						"LEFT JOIN tb_storedContacts as t2 ON t1.phoneNumber = t2.phoneNumber AND t1.userId = t2.userId"		+ " " +
							"WHERE t1.userId = " + connection.escape(parseInt(fieldData.userId))								+ " " +
							"AND t1.phoneNumber = " + connection.escape(fieldData.phoneNumber) 									+ " " +
							"AND (DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE()) = 1"	+ " " +
							"AND t1.status LIKE " + connection.escape(fieldData.status) 										+ " " +
							"ORDER BY t1.callDate DESC"																			+ " " +
					"LIMIT " + connection.escape(parseInt(fieldData.limit))														+ " "
				;
			}
			if(fieldData.queryOption == 'yesterday'){
				sqlString = 
					"SELECT FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) AS entryDateTime, LEFT(callDate, 10) AS epochEntry,TIMESTAMPDIFF(WEEK, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS weeksOld,TIMESTAMPDIFF(DAY, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS daysOld,TIMESTAMPDIFF(MINUTE, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS minutesOld,TIMESTAMPDIFF(SECOND, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS secondsOld,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE())AS today,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY))AS yesterday,t1.*,t2.name,t2.emailAddress,t2.companyName,t2.title,t2.department,t2.ext,t2.imageUrl, CONVERT(phoneLogId, UNSIGNED INTEGER) AS sortOrder FROM tb_phoneLog AS t1"	+ " " +
						"LEFT JOIN tb_storedContacts as t2 ON t1.phoneNumber = t2.phoneNumber AND t1.userId = t2.userId"								+ " " +
							"WHERE t1.userId = " + connection.escape(parseInt(fieldData.userId))														+ " " +
							"AND t1.phoneNumber = " + connection.escape(fieldData.phoneNumber) 															+ " " +
							"AND (DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY)) = 1"	+ " " +
							"AND t1.status LIKE " + connection.escape(fieldData.status) 										+ " " +
							"ORDER BY t1.callDate DESC"																									+ " " +
					"LIMIT " + connection.escape(parseInt(fieldData.limit))																				+ " "
				;
			}



		}else{


			if(fieldData.queryOption == 'everyday'){
				sqlString = 
					"SELECT FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) AS entryDateTime, LEFT(callDate, 10) AS epochEntry,TIMESTAMPDIFF(WEEK, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS weeksOld,TIMESTAMPDIFF(DAY, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS daysOld,TIMESTAMPDIFF(MINUTE, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS minutesOld,TIMESTAMPDIFF(SECOND, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS secondsOld,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE())AS today,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY))AS yesterday,t1.*,t2.name,t2.emailAddress,t2.companyName,t2.title,t2.department,t2.ext,t2.imageUrl, CONVERT(phoneLogId, UNSIGNED INTEGER) AS sortOrder FROM tb_phoneLog AS t1"	+ " " +
						"LEFT JOIN tb_storedContacts as t2 ON t1.phoneNumber = t2.phoneNumber AND t1.userId = t2.userId"		+ " " +
							"WHERE t1.userId = " + connection.escape(parseInt(fieldData.userId))								+ " " +
							"AND t1.status LIKE " + connection.escape(fieldData.status) 										+ " " +
							"ORDER BY t1.callDate DESC"																			+ " " +
					"LIMIT " + connection.escape(parseInt(fieldData.limit))														+ " "
				;
			}
			if(fieldData.queryOption == 'today'){
				sqlString = 
					"SELECT FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) AS entryDateTime, LEFT(callDate, 10) AS epochEntry,TIMESTAMPDIFF(WEEK, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS weeksOld,TIMESTAMPDIFF(DAY, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS daysOld,TIMESTAMPDIFF(MINUTE, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS minutesOld,TIMESTAMPDIFF(SECOND, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS secondsOld,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE())AS today,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY))AS yesterday,t1.*,t2.name,t2.emailAddress,t2.companyName,t2.title,t2.department,t2.ext,t2.imageUrl, CONVERT(phoneLogId, UNSIGNED INTEGER) AS sortOrder FROM tb_phoneLog AS t1"	+ " " +
						"LEFT JOIN tb_storedContacts as t2 ON t1.phoneNumber = t2.phoneNumber AND t1.userId = t2.userId"		+ " " +
							"WHERE t1.userId = " + connection.escape(parseInt(fieldData.userId))								+ " " +
							"AND (DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE()) = 1"	+ " " +
							"AND t1.status LIKE " + connection.escape(fieldData.status) 										+ " " +
							"ORDER BY t1.callDate DESC"																			+ " " +
					"LIMIT " + connection.escape(parseInt(fieldData.limit))														+ " "
				;
			}
			if(fieldData.queryOption == 'yesterday'){
				sqlString = 
					"SELECT FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) AS entryDateTime, LEFT(callDate, 10) AS epochEntry,TIMESTAMPDIFF(WEEK, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS weeksOld,TIMESTAMPDIFF(DAY, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS daysOld,TIMESTAMPDIFF(MINUTE, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS minutesOld,TIMESTAMPDIFF(SECOND, FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)),NOW()) AS secondsOld,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = CURDATE())AS today,(DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY))AS yesterday,t1.*,t2.name,t2.emailAddress,t2.companyName,t2.title,t2.department,t2.ext,t2.imageUrl, CONVERT(phoneLogId, UNSIGNED INTEGER) AS sortOrder FROM tb_phoneLog AS t1"	+ " " +
						"LEFT JOIN tb_storedContacts as t2 ON t1.phoneNumber = t2.phoneNumber AND t1.userId = t2.userId"								+ " " +
							"WHERE t1.userId = " + connection.escape(parseInt(fieldData.userId))														+ " " +
							"AND (DATE(FROM_UNIXTIME(CONVERT(  LEFT(callDate , 10)   , UNSIGNED INTEGER)) ) = DATE_SUB(CURDATE(),INTERVAL 1 DAY)) = 1"	+ " " +
							"AND t1.status LIKE " + connection.escape(fieldData.status) 																+ " " +
							"ORDER BY t1.callDate DESC"																									+ " " +
					"LIMIT " + connection.escape(parseInt(fieldData.limit))																				+ " "
				;
			}


		}


		console.log('SQL:' + sqlString);
		connection.query(sqlString, function(err, result){
			if(inPostFunction){inPostFunction(err, removeNulls(result));}
		});
	}

	this.getPhoneLogLastId = function(inParams, inPostFunction){
		console.log('-----getCallLogLastId ENETERED-----------------------------------------------------');
		var fieldData = 
			{
				userId:false
			}
		fieldData = extend(fieldData, inParams);
		if(!(fieldData.userId)){
			console.log('ERROR _> no USERID!!!!');
			if(inPostFunction){
				var err = 'No User Id, records will not be added(contactModel.addContact)';
				inPostFunction(err, false, false);
			}
		}

		var sqlString = 
			"SELECT phoneLogId, CONVERT(phoneLogId, UNSIGNED INTEGER) AS sortOrder FROM tb_phoneLog WHERE " +
				"userId = " + connection.escape(fieldData.userId) 	+ " " +
			"ORDER BY sortOrder DESC LIMIT 1"
		;
		console.log('SQL:' + sqlString);
		connection.query(sqlString, function(err, result){
			console.log('error' + err);
			if(!(err)){
				var phoneLogId = 0;
				if(result[0]){
					phoneLogId = result[0].phoneLogId
				}
				result = 
					{
						lastId:phoneLogId
					}
				if(inPostFunction){inPostFunction(err, result);}
				return;
			}
			result = 
					{
						lastId:0
					}
			if(inPostFunction){inPostFunction(err, result);}
		});


	}

	this.addManyPhoneLog = function(inParams, inPostFunction){
		console.log('---------------addManyPhoneLog starting------------------------------------------');
		//validate input
		for(index in inParams.dataArray){
			inParams.dataArray[index].userId = inParams.userId;
		}
		var theArray = inParams.dataArray;

		finish.map(theArray, function(value, done){
			_this.addPhoneLog(value, function(inErr, inResult){
				done(null, value);
			});
		},

		//completed Function--------------------------------
		function(err, results){
			console.log('--------------------------------------------------------');
			console.log('addManyPhoneLog complete err/result:');
			if(inPostFunction){
				inPostFunction();
			}
		});

	}


	this.addPhoneLog = function(inParams, inPostFunction){
		console.log('-------------------------------------------');
		console.log('addSms entered');
		var fieldData = 
			{
				callDate:"",
				callDayTime:"",
				callDuration:"",
				deviceId:"",
				id:"",
				phoneNumber:"",
				status: inParams.id,
				userId:false
			}
		fieldData = extend(fieldData, inParams);

		if(!(fieldData.userId)){
			if(inPostFunction){
				var err = 'No User Id, records will not be added(contactModel.addContact)';
				inPostFunction(err, false, false);
			}
		}

		var sqlString = 
			"INSERT INTO `tb_phoneLog` ( callDate, callDayTime, callDuration, deviceId, phoneLogId, phoneNumber, status, userId) VALUES " + 
				"(" 																				  +
					connection.escape(fieldData.callDate) 										+ "," +
					connection.escape(fieldData.callDayTime)									+ "," +
					connection.escape(fieldData.callDuration) 									+ "," +
					connection.escape(fieldData.deviceId)										+ "," +
					connection.escape(fieldData.id) 											+ "," +
					connection.escape(cleanPhoneNumber(fieldData.phoneNumber)) 					+ "," +
					connection.escape(fieldData.status) 										+ "," +
					connection.escape(fieldData.userId) 											  +
				" );"
		;
		console.log('sql:' + sqlString);
		connection.query(sqlString, function(err, result){//cleanPhoneNumber(fieldData.phoneNumber)
			console.log('error' + err);
			if(inPostFunction){inPostFunction(err, result);}
		});
	}

	this.getUPhoneNumbers = function(inParams, inPostFunction){
		var fieldData = 
			{
				userId:false,
				limit:'1000'
			}
		fieldData = extend(fieldData, inParams);

		if(!(fieldData.userId)){
			if(inPostFunction){
				var err = 'No User Id, records will not be added(contactModel.addContact)';
				inPostFunction(err, false, false);
			}
		}

		var sqlString = 
			"SELECT * FROM ( SELECT phoneNumber, userId, max(NAME) AS name, max(imageUrl) as imageUrl  FROM (SELECT t1.phoneNumber, t1.userId, ('') AS NAME, ('') AS imageUrl FROM tb_phoneLog AS t1" + " " +
				"WHERE t1.userId = 1" + connection.escape(parseInt(fieldData.userId)) + " " +
					"GROUP BY t1.phoneNumber UNION ALL SELECT t2.phoneNumber, t2.userId, max(t2.name), max(t2.imageUrl) FROM tb_storedContacts AS t2" + " " +
				"WHERE t2.userId = " + connection.escape(parseInt(fieldData.userId)) + " " +
					"GROUP BY t2.phoneNumber) AS t3 GROUP BY phoneNumber) AS t4 ORDER BY IF(NAME = '' OR NAME IS NULL,1,0),NAME" + " " +
				"LIMIT " + connection.escape(parseInt(fieldData.limit))
		;
		console.log('sql:' + sqlString);
		connection.query(sqlString, function(err, result){
			console.log('error' + err);
			if(inPostFunction){inPostFunction(err, result);}
		});
	}


	var cleanPhoneNumber =function(inNumber){
		//US ONLY-----
		var standardNo = inNumber.replace(/[^\d]/g,'');
		if(standardNo.charAt(0) != '1'){
			standardNo = "1" + standardNo;
		}
		return standardNo.slice(0,11);
	}

	var removeNulls = function(inRows){
		if(!(inRows)){return false;}
		for(var rowIndex in inRows){
			var theRow = inRows[rowIndex];
			for(fieldKey in theRow){
				if(theRow[fieldKey] == null){
					//delete theRow[fieldKey];
					theRow[fieldKey] = '';
				}
			}
		}
		return inRows;
	}
}
module.exports = Model;