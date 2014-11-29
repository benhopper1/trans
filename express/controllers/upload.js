var path = require('path');
var basePath = path.dirname(require.main.filename);
var Model = require('../models/uploadmodel');
var model = new Model();
var fs = require('fs');
var multiparty = require(basePath + '/node_modules/multiparty');
var finish = require(basePath + '/node_modules/finish');
var uuid = require(basePath + '/node_modules/node-uuid');

var configData = fs.readFileSync(path.dirname(require.main.filename) + '/main.conf', 'utf8');
configData = JSON.parse(configData);

module.exports.controller = function(app){

	var tmpFilesHash = {};

	//-----G E T ----------------------------------------
	app.get('/upload', function(req, res){
		console.log("get")  ;
		console.log("HOST:"+req.hostname);
		console.log("UserName:"+req.session.userName);
		console.log(req.body);
		console.log("MODELTEST:" + model.test());

		res.render('upload/upload_get.jade',
			{
				data:'',
				customData:req.custom
			}
		);
	});



		//-----P O S T ---------------------------------
	app.post('/upload', function(req, res){
		console.log('USERID=>:' + req.cookies.userId);

		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files){
			if(files.uploadedFile){
				var fieldsHash = {};
				var tmpFilePath = files.uploadedFile[0].path;
				var fileName = files.uploadedFile[0].originalFilename;
				var encoding = '';
				var mimeType = '';
				var fieldName ='';

				var file = fs.createReadStream(tmpFilePath);

				Object.keys(fields).forEach(function(name){
					fieldsHash[name] = fields[name][0];
				});

				model.processUploadedFile(
					{
						request:'',
						response:'',
						file:file,
						fileName:fileName,
						encoding:encoding,
						mimeType:mimeType,
						data:fieldsHash,
						onComplete:function(inData, err){
							console.log('onComplete of processUploadedFile');
							console.dir(inData);
							console.log('----------error-----------');
							console.dir(err);

							res.setHeader('Content-Type', 'application/json');
							res.end(JSON.stringify(inData));


						}
					}
				);
			}else{
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({}));
			}
			
		});

	});




		//-----P O S T ---------------------------------
	app.post('/uploadAsTemp', function(req, res){
		console.log('USERID=>:' + req.cookies.userId);

		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files){
			if(!(files)){
				//files empty send error
				//res.send(err.message, 500);
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({error:'error'}));
				return false;
			}
			if(files.uploadedFile){
				var fieldsHash = {};
				var tmpFilePath = files.uploadedFile[0].path;
				var fileName = files.uploadedFile[0].originalFilename;
				var encoding = '';
				var mimeType = '';
				var fieldName ='';

				var file = fs.createReadStream(tmpFilePath);

				Object.keys(fields).forEach(function(name){
					fieldsHash[name] = fields[name][0];
				});

				var fileData = 
					{
						request:'',
						response:'',
						file:file,
						fileName:fileName,
						encoding:encoding,
						mimeType:mimeType,
						data:fieldsHash
					}

				if(fieldsHash['forceExt']){
					fileName = fileName + "." + fieldsHash['forceExt'];
				}

				var inFileNamePath;
				if(fieldsHash['forceName']){
					fileName = fieldsHash['forceName'];
					inFileNamePath = fileName;
				}else{
					inFileNamePath = fileName.replace(path.basename(fileName, path.extname(fileName)), uuid.v1());
				}
				var saveTo = path.join(basePath + '/public/temp', path.basename(inFileNamePath));
	  			file.pipe(fs.createWriteStream(saveTo));
	  			file.on('close', function(){
	  					var tempFileData = 
	  						{
	  							fileName:path.basename(inFileNamePath),
	  							domainFilePath:configData.domain.address + ':' + configData.domain.port + '/public/temp' + '/' + path.basename(inFileNamePath),
	  							fileNameNoExt:path.basename(inFileNamePath, path.extname(inFileNamePath)),
	  							fileExt:path.extname(inFileNamePath).replace(".","")
	  						}
	  					console.log('temp file done!!!:');
	  					console.dir(tempFileData);

						res.setHeader('Content-Type', 'application/json');
						res.end(JSON.stringify(tempFileData));
				});

			}
		});

	});

















}
