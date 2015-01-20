console.log('=======================================================================');
console.log('--------------------------JQUERY HOPPER DATABASE-----------------------');
console.log('=======================================================================');


var DatabaseObject = function( inOptions ){
	var _this = this;
	var eventObject = new EventOrigin();

	var options = 
		{
			insertProcess:false,
			editProcess:false,
			deleteProcess:false,
			selectProcess:false,
		}
	options = $.extend(options, inOptions);

	this.insert = function(inData, inPostFunction){
		eventObject.reportOn('onBeforeInsert', inData);
		var next = function(inData){
			if(inPostFunction){
				inPostFunction(inData);
			}
			eventObject.reportOn('onAfterInsert', inData);
		}
		if(options.insertProcess){
			options.insertProcess(inData, next);
		}
	}
	this.edit = function(inData, inPostFunction){
		eventObject.reportOn('onBeforeEdit', inData);
		var next = function(inNextData){
			if(inPostFunction){
				inPostFunction(inNextData);
			}
			eventObject.reportOn('onAfterEdit', inNextData);
		}
		if(options.editProcess){
			options.editProcess(inData, next);
		}
	}
	this.select = function(inData, inPostFunction){
		eventObject.reportOn('onBeforeSelect', inData);
		var next = function(inNextData){
			if(inPostFunction){
				inPostFunction(inNextData);
			}
			eventObject.reportOn('onAfterSelect', inNextData);
		}
		if(options.selectProcess){
			options.selectProcess(inData, next);
		}
	}




	//this.edit = function(inData, inPostFunction){}
	this.delete = function(inData, inPostFunction){}
	//this.select = function(inData, inPostFunction){}

	//REPORTS AVALIABLE-------------
	//onBeforeInsert
	//onBeforeEdit
	//onBeforeDelete
	//onBeforeSelect
	//onBeforeChange
	//onAfterInsert
	//onAfterEdit
	//onAfterDelete
	//onAfterSelect
	//onAfterChange


	this.getEventObject = function(){
		return eventObject;
	}
}




