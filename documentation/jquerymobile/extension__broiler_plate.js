//=======================================================================================================================================================
// ComboBox -------------------------------------------------------------------------------------------------------------------
//=======================================================================================================================================================

var ComboBox = function(inJsonStruct){
	var _this = this;
	var theDivRef;
	var dirtyMark = false;
	var mode = 'edit';
	var options = 
		{
			id:'comboBox_' + new Date().getTime(),
		}
	options = $.extend(options, inJsonStruct);
	theDivRef = options.divRef;

	this.test = function(){
		alert('ComboBox TEST');
	}
}
$.fn.ComboBox = function(inAction, inJsonStruct){
	var comboBox = $(this).data("comboBoxInstance");

	if(!(comboBox) || inAction == 'create'){
		inJsonStruct['divRef'] = $(this);
		console.log('comboBox CREATED');
		var comboBox = new comboBox(inJsonStruct);
		$(this).data("comboBoxInstance", comboBox);
		return ;
	}
	if(inAction == 'test'){
		comboBox.test();
	}

	if(inAction == 'load'){
		return comboBox.load(inJsonStruct);
	}

	if(inAction == 'save'){
		return comboBox.save(inJsonStruct);
	}

	if(inAction == 'clear'){
		return comboBox.clear();
	}
}