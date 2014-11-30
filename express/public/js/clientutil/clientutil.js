//#################------> E X A M P L E <- #######################################################
/*
			$postAjax(
				{
					url:'testrest',
					send:
						{
							id:row,
							someData:'yes yes'
						},
					onAjaxSuccess:function(inResponseText){
						alert(inResponseText);
					}
				}
			);
*/
//################################################################################################
var clientUtilModule = new function(){
	console.log('LOADING ->: clientUtilModule');


	this.InputFileObject = function(inServerAddress, inFileFilter){

		//--STATIC---------------------------------------------
		if(typeof clientUtilModule.InputFileObject.indexCounter === 'undefined'){
			clientUtilModule.InputFileObject.indexCounter = 0;
		}else{
			clientUtilModule.InputFileObject.indexCounter += 1;
		}

		//----INSTANCE------------------------------------------
		var _this = this;
		var index = clientUtilModule.InputFileObject.indexCounter;
		var id = 'inputFileArea_' + index;

		var ajaxPostObject = new clientUtilModule.AjaxPostObject(inServerAddress);

		var filter = [];


		//build----------------------
		if(!(typeof inFileFilter === 'undefined')){
			filter = inFileFilter;
			for(index in filter){
				if(filter[index].indexOf('.') == -1){
					filter[index] = '.' + filter[index];
				}
			}
		}


		if (! $('#' + id).length){
			$( "body" ).append('<div id="' + id + '"><input type="file" id="' + id + '_file" style="display:none" accept="' + filter.toString() + '"><div>');
		}else{
			//cleanup prior stuff
			var control = $("#" + id + "_file");
			control.replaceWith( control = control.clone());
		}

		$("#" + id + "_file").trigger( "click" );
		// end of build----------------

		this.showBrowse = function(){
			$("#" + id + "_file").trigger( "click" );
		}

		this.send = function(inHashOfData, inOnResponse){
			ajaxPostObject.uploadFileAndData(id + '_file', inHashOfData, inOnResponse);
		}

		this.setOnFileChange = function(inFunction){
			if(inFunction){
				$("#" + id + "_file").change(function(e){
					inFunction(index, "#" + id + "_file", e);
				});
			}
		}



	}

	//##################################################################################################
	//--  A j a x P o s t O b j e c t ------------------------------------------------------------------
	//##################################################################################################

	this.AjaxPostObject = function(inServerAddress){
		var serverAddress = inServerAddress;
		this.uploadFileAndData = function(inFileElementId, inHashOfData, onResponse){
			var client = new XMLHttpRequest();

			client.onreadystatechange = function() {
				if (client.readyState == 4 && client.status == 200){
					if(onResponse){
						onResponse(client.responseText);
					}
				}
			}

			var file = document.getElementById(inFileElementId);
			var formData = new FormData();
			//console.log(JSON.stringify(file.files[0]));
			formData.append("uploadedFile", file.files[0]);

			for(key in inHashOfData){
			   formData.append(key, inHashOfData[key]);
			}

			client.open("post", serverAddress, true);
			client.send(formData);
		}
	}

	//##################################################################################################
	//--  A j a x J s o n P o s t O b j e c t ----------------------------------------------------------
	//##################################################################################################
	this.AjaxJsonPostObject = function(inData){
		var _this = this;
		var aSync = true;
		var method = 'post';
		var url;
		var function_onSuccess;
		var function_onFail;
		
		if(inData.url){url = inData.url;}
		if(inData.onAjaxSuccess){function_onSuccess = inData.onAjaxSuccess;}
		if(inData.onAjaxFail){function_onFail = inData.onAjaxFail;}

		var xhr = new XMLHttpRequest();


		this.send = function(inData, inOnAjaxSuccess, inOnAjaxFail){
			if(inOnAjaxSuccess){function_onSuccess = inOnAjaxSuccess;console.log('suc  yes man!!!');}
			if(inOnAjaxFail){function_onFail = inOnAjaxFail;}
			console.log('sending');
			xhr.open(method, url, aSync);

			xhr.onload = function(e){
				if (xhr.readyState === 4){
					if(xhr.status === 200){
						if(function_onSuccess){function_onSuccess(xhr.responseText);}
					}else{
						if(function_onFail){function_onFail(e, xhr.statusText);}
					}
				}
			};

			xhr.onerror = function(e){
				if(function_onFail){function_onFail(e, xhr.statusText);}
			};

			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.send(JSON.stringify(inData));
		}

		if(inData.send){
			_this.send(inData.send);
		}

	}



	//##################################################################################################
	//--  B A S I C ------------------------------------------------------------------------------------
	//##################################################################################################
	this.classToHash = function(inClass){
		if(inClass.indexOf('.') == -1){inClass = '.' + inClass;}
		var fieldsHash = {};
		$(inClass).each(function(){
			fieldsHash[this.name] = this.value;
		});
		return fieldsHash
	}


}

$postAjax = function(inData){
	new clientUtilModule.AjaxJsonPostObject(inData);
}


var $getCookie = function(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
}

var $ajaxFilePost = function(inData){
	var _this = this;
	var client = new XMLHttpRequest();
	client.onreadystatechange = function() {
		if (client.readyState == 4 && client.status == 200){
			if(inData.onComplete){
				if(client.responseText){
					inData.onComplete(JSON.parse(client.responseText));
				}
			}
		}
	}

	var file = document.getElementById(inData.fileInputElement);
	var formData = new FormData();
	console.log(JSON.stringify(file.files[0]));
	formData.append("uploadedFile", file.files[0]);

	for(key in inData.options){
		formData.append(key, inData.options[key]);
	}

	client.open("post", "/upload", true);
	client.send(formData);
}

var cleanPhoneNumber =function(inNumber){
	//US ONLY-----
	var standardNo = inNumber.replace(/[^\d]/g,'');
	if(standardNo.charAt(0) != '1'){
		standardNo = "1" + standardNo;
	}
	return standardNo.slice(0,11);
}

var phoneNumberCompare = function(inNumberA, inNumberB){
	return cleanPhoneNumber(inNumberA) == cleanPhoneNumber(inNumberB);
}



//###################################### OBJECT ###############################################
//--------------------- > D e v i c e Q u e r y S y n c < -----------------------------------
//#############################################################################################
var DeviceQuerySync = function(inCommManagerInstance){
	var _this = this;
	var commManager = inCommManagerInstance;


	/*
	*	param0	String 		last sms id in the user database
	*	param1	function 	callback with device information array present(async)
	*/
	this.sms_getAllMessages = function(inLastSyncedId, inPostFunction){
		var chunkArray = [];
		commManager.sendTransactionSeries(
			{
				command:'getAllSmsAboveId',
				data:
					{
						lastId:inLastSyncedId

					},
				onAll:function(inTransportLayer_json, inCommand, inTransactionSeriesId, inFrame, inDataLayer_json, next){
					console.log("CALBACK onAll");

					if(inDataLayer_json.dataArray){
						for(index in inDataLayer_json.dataArray){
							chunkArray.push(inDataLayer_json.dataArray[index]);
						}
					}

					next();
				},
				onComplete:function(inTransportLayer_json, inCommand, inTransactionSeriesId, inFrame, inDataLayer_json, next){
					//chunkArray.sort(function(a,b) { return parseInt(b.id) - parseInt(a.id) } );
					console.log('-------completed sms_getAllMessages----------------------------------------------');
					//console.dir(chunkArray);
					if(inPostFunction){inPostFunction(chunkArray);}
				}
			}
		);//endTrans
	}
}






//###################################### OBJECT ###############################################
//--------------------- > StorageObject < -----------------------------------
//#############################################################################################
var StorageObject = function(){
	var _this = this;
	var smsLimit = false;

	this.setSmsLimit = function(inLimit){
		smsLimit = inLimit;
	}

	this.addManySms = function(inSmsArray, inPostFunction){
		$postAjax(
			{
				url:'/database/sms/addManySms',
				send:
					{
						dataArray:inSmsArray
					},
				onAjaxSuccess:function(inResponseText){
					inResponseText = JSON.parse(inResponseText);
					if(inPostFunction){inPostFunction(inResponseText);}
				}
			}
		);
	}

	this.getSmsLastId = function(inPostFunction){
		console.log('-------------getSmsLastId-----------------------------------------');
		$postAjax(
			{
				url:'/database/sms/getSmsLastId',
				send:
					{

					},
				onAjaxSuccess:function(inResponseText){
					inResponseText = JSON.parse(inResponseText);
					var lastId = 0;
					if(inResponseText.result.lastId){
						lastId = inResponseText.result.lastId.toString();
					}
					if(inPostFunction){inPostFunction(lastId);}
				}
			}
		);
	}

	this.getAllSmsByPhone = function(inPhoneNumber, inPostFunction){
		console.log('-------------getAllSmsByPhone-----------------------------------------');
		$postAjax(
			{
				url:'/database/sms/getAllSmsByPhone',
				send:
					{
						phoneNumber:inPhoneNumber,
						limit:smsLimit
					},
				onAjaxSuccess:function(inResponseText){
					inResponseText = JSON.parse(inResponseText);
					if(inPostFunction){inPostFunction(inResponseText.result);}
				}
			}
		);
	}

	this.getUserImageUrl = function(){

	}

	this.getMissingSmsByPhone = function(inPhoneNumber, inArrayOfSmsId, inPostFunction){
		console.log('-------------getMissingSmsByPhone-----------------------------------------');
		$postAjax(
			{
				url:'/database/sms/getMissingSmsByPhone',
				send:
					{
						phoneNumber:inPhoneNumber,
						arrayOfSmsId:inArrayOfSmsId
					},
				onAjaxSuccess:function(inResponseText){
					inResponseText = JSON.parse(inResponseText);
					if(inPostFunction){inPostFunction(inResponseText.result);}
				}
			}
		);
	}

}

//###################################### OBJECT ###############################################
//--------------------- > StorageObject < -----------------------------------
//#############################################################################################
var Backstack = function(inJsonStruct){
	var _this = this;
	if(typeof inJsonStruct.limit === 'undefined'){inJsonStruct.limit = 1000000;}
	var limit = inJsonStruct.limit;
	var stack = [];

	this.push = function(inData){
		if(!(inData)){return false;}

		var existVal = exist(inData);
		if(existVal == -1){
			stack.push(inData);
			if(inJsonStruct.onPush){
				inJsonStruct.onPush(inData);
			}

			if(stack.length > limit){
				var tmpItem = stack.pop();
				if(inJsonStruct.onPop){
					inJsonStruct.onPop(tmpItem);
				}
			}
		}else{
			remove(existVal);
			stack.push(inData);
			if(inJsonStruct.onPush){
				inJsonStruct.onPush(inData);
			}
		}
		console.log('Backstack dump-----');
		console.dir(stack);
	}

	this.isEmpty = function(){
		return (stack.length > 0) ? true : false;
	}

	this.top = function(){
		if(!(stack.length > 0)){ return false;}
		return stack[stack.length - 1];
	}

	var exist = function(inItem){
		for(index in stack){
			if(JSON.stringify(stack[index]) == JSON.stringify(inItem)){
				console.log('exist true');
				return index;
			}
		}
		console.log('exist false');
		return -1;
	}

	var remove = function(inIndex){
		var tmpArray = [];
		for(index in stack){
			if(!(index == inIndex)){
				tmpArray.push(stack[index]);
			}else{
				var tmpItem = stack[index];
				if(inJsonStruct.onPop){
					inJsonStruct.onPop(tmpItem);
				}
			}
		}

		stack = tmpArray;
	}

}

//###################################### OBJECT ###############################################
//--------------------- > E v e n t   O b j e c t < -----------------------------------
//#############################################################################################
var EventObject = function(){
	var _this = this;

	var hashOfArray = new HashOfArrayObject();

	this.setOn = function(inEventKey, inPostFunction){
		hashOfArray.add(inEventKey, inPostFunction);
	}

	this.reportOn = function(inEventKey, inData){
		var theArray = hashOfArray.getArrayFromHash(inEventKey);
		for(index in theArray){
			if(theArray[index]){
				theArray[index](inData);
			}
		}
	}

}