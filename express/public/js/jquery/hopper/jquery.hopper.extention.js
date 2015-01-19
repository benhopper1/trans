$.fn.formatPhoneNumber = function () { 
	if($(this).val().length == 10){
		$(this).val('1' + $(this).val().substring(1).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1)$2-$3'));
	}

	if($(this).val().length == 11){

		$(this).val('1' + $(this).val().substring(1).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1)$2-$3'));
	}
}


$.fn.cleanPhoneNumber = function (){
	var standardNo = $(this).val().replace(/[^\d]/g,'');
	if(standardNo.charAt(0) != '1'){
		standardNo = "1" + standardNo;
	}
	$(this).val(standardNo.slice(0,11));
}


/*var theNewDiv = $(document.createElement('div'));
theNewDiv.attr('id', 'validationRulesDiv'); //id = 'validationRulesDiv';
alert(theNewDiv.attr('id'));
$('body').append(theNewDiv);
//$("div").data("test", { first: 16, last: "pizza!" });
$('#validationRulesDiv').data("test", { first: 16, last: "pizza!" });

alert($('#validationRulesDiv').attr('id'));
*/

/*(function(){
	alert('function entered');
	var theNewDiv = $(document.createElement('div'));
	theNewDiv.attr('id', 'validationRulesDiv');
	$('body').append(theNewDiv);
	$('#validationRulesDiv').data("test", { first: 16, last: "pizza!" });
	alert($('#validationRulesDiv').attr('id'));

})(this);*/


var constructor = new function(){
	console.log('HOPPER JQUERY EXTENTION CONSTRUCTOR RUNNING');
	//set up varible data into dom
	$('body').append(  $(document.createElement('div')).attr('id', 'validationRulesDiv')  );
}();



$.fn.validate = function(inValidationType){
	if(inValidationType == 'phoneNumber'){
		if($(this).val().length = 11){}
	}

	if(inValidationType == 'emailAddress'){}
}




//==================================================================
// LIST VIEW -------------------------------------------------------
//==================================================================
var listViewHash = {};
$.fn.listViewAppend = function(inData){
	var options = 
		{
			id:new Date().getTime(),
			class:'listViewClass',
			imageUrl:'BAD URL',
			name:'NO NAME',
			number:'NO NUMBER',
			type:'NO TYPE',
			state:false,
		}
	options = $.extend(options, inData);

	var html = '' + 
		'<li id="' + options.id + '" class="menu_li ' + options.class + '"  data-inset="true">' + ' ' +
			'<a "/hjhjhjh"> ' + options.name 													+ ' ' +
				'<img src="' + options.imageUrl + '" class="magicCirc" height="50px"/>'			+ ' ' +
				'<p>' + options.number + '</p>'													+ ' ' +
				'<p>' + options.type + '</p>'													+ ' ' +
			'</a>'																				+ ' ' +
		'</li>'
	;
	options['html'] = html;
	listViewHash[options.id] = options;


	$(this).append(html);
	$(this).listview().listview('refresh');
	return options.id;
}

$.fn.getListViewArray = function(){
	return listViewHash;
}
$.fn.getListView = function(inId){
	return listViewHash[inId];
}

$.fn.listViewRemove = function(inId){
	var listViewOptions = listViewHash[inId];
	if(listViewOptions){
		delete listViewHash[inId];
		$('#' + inId).remove();
	}
}

//=======================================================================================================================================================
// Contact List View ------------------------------------------------------------------------------------------------------------------------------------
//=======================================================================================================================================================
var ContactListView = function(inJsonStruct){
	var _this = this;
	var theDivRef;
	var contactListViewHash = {};

	var options = 
		{
			test:'testVal',
			onLoadComplete:false,
			useCheckbox:false,

		}
	options = $.extend(options, inJsonStruct);
	theDivRef = options.divRef;
	var uid = $(theDivRef).attr('id');
	this.getTest = function(){
		return options.test;
	}

	this.remove = function(inId){
		if(!(contactListViewHash[inId])){return false;}
		$(contactListViewHash[inId].jRef).remove();
		delete contactListViewHash[inId];
		$(theDivRef).listview().listview('refresh');
	}

	this.toggleState = function(inJref){
		contactListViewHash[$(inJref).attr('contactid')].state =! (contactListViewHash[$(inJref).attr('contactid')].state);
		if(contactListViewHash[$(inJref).attr('contactid')].state){
			$(inJref).buttonMarkup({ icon: "check",iconpos:'right' });
		}else{
			$(inJref).buttonMarkup({ icon: "",iconpos:'right' });
		}
	}

	//returns array of records
	this.getSelectedData = function(){
		var resultArray = [];
		for(var contactListViewHashIndex in contactListViewHash){
			if(contactListViewHash[contactListViewHashIndex].state){
				resultArray.push(contactListViewHash[contactListViewHashIndex]);
			}
		}
		return resultArray;
	}

	//returns array of contactIds 
	this.getSelected = function(){
		var resultArray = [];
		for(var contactListViewHashIndex in contactListViewHash){
			if(contactListViewHash[contactListViewHashIndex].state){
				resultArray.push(contactListViewHash[contactListViewHashIndex].id);
			}
		}
		return resultArray;
	}

	this.loadData = function(){
		$postAjax(
			{
				url:'/database/getContacts',
				send:
					{

					},
				onAjaxSuccess:function(inResponseText){
					inResponseText = JSON.parse(inResponseText).rows;
					for(contactIndex in inResponseText){
						var html = createHtml(
							{
								id:inResponseText[contactIndex].id,
								class:'listViewClass',
								imageUrl:inResponseText[contactIndex].imageUrl,
								name:inResponseText[contactIndex].name,
								number:formatPhoneNumber(inResponseText[contactIndex].phoneNumber),
								type:inResponseText[contactIndex].type,
							}
						);
						$(theDivRef).append(html);
						inResponseText[contactIndex].jRef = $('#' + uid + '_' + inResponseText[contactIndex].id);
						contactListViewHash[inResponseText[contactIndex].id] = inResponseText[contactIndex];
						$('#' + uid + '_' + inResponseText[contactIndex].id).click(function(e){
							var id = 
							console.log('clcik list view AA3 :' + $(e.currentTarget).attr('contactid'));
							console.dir(e);
							if(options.onClick){
								if(options.useCheckbox){
									_this.toggleState($(e.currentTarget));
								}
								options.onClick($(e.currentTarget).attr('contactid'), contactListViewHash[$(e.currentTarget).attr('contactid')], uid + '_' + $(e.currentTarget).attr('contactid'));
							}
						});

					}
					$(theDivRef).listview().listview('refresh');
				}
			}
		);
	}

	var createHtml = function(inData){
		var options = 
			{
				id:new Date().getTime(),
				class:'listViewClass',
				imageUrl:'BAD URL',
				name:'NO NAME',
				number:'NO NUMBER',
				type:'NO TYPE',
			}
		options = $.extend(options, inData);
		//var style = ':hover {background-color:#feeebd ;}:active { background-color:#817865 ;}';
		//var style = 'background-color: transparent !important;';
		var style = '';
		var html = '' + 
			'<li id="' + uid + '_' + options.id + '" contactId="' + options.id + '" class="menu_li checkbox_click_' + uid + '_' + options.class + '"  data-icon="false" data-inset="true">' + ' ' +
				'<a "/hjhjhjh" class="trans-bkg-a-hv" style="' + style + '" > ' + options.name 													+ ' ' +
					'<img src="' + options.imageUrl + '" style="margin: 15px 15px;" class="magicSquare" height="50px"/>'			+ ' ' +
					'<p>' + options.number + '</p>'													+ ' ' +
					'<p>' + options.type + '</p>'													+ ' ' +
				'</a>'																				+ ' ' +
			'</li>'
		;
		//options['html'] = html;
		return html;
	}

	var formatPhoneNumber = function(inNumber){
		if(inNumber.length == 10){
			return '1' + inNumber.substring(1).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1)$2-$3');
		}
		if(inNumber.length == 11){
			return '1' + inNumber.substring(1).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1)$2-$3');
		}
		return inNumber;
	}

	//============================
	//---EVENT
	//============================
	this.initEvent = function(){
		//$('checkbox_click_' + uid + ' a').click(function(e){
		/*$(theDivRef).click(function(e){
			console.log('clcik list view :');
			console.dir(e);
		});*/
	}

	this.setState = function(inBool){
		options.state = inBool;
	}

	this.setSelectedByNameAndType = function(inJstruct){
		console.log('setSelectedByNameAndType');
		console.dir(inJstruct);
		var options2 = 
			{
				name:'',
				type:''
			}
		options2 = $.extend(options2, inJstruct);
		var inName = options2.name;
		var inType = options2.type;

		for(var contactListViewHashIndex in contactListViewHash){
			console.log('--------------------------------------------------------------------------');
			console.log(inName + '<->' + contactListViewHash[contactListViewHashIndex].name);
			console.log(inType + '<->' + contactListViewHash[contactListViewHashIndex].type);
			if((inName == contactListViewHash[contactListViewHashIndex].name) && (inType == contactListViewHash[contactListViewHashIndex].type)){
				console.dir(options.divRef);
				//alert(options.divRef.id);
				$('#' + $(options.divRef).attr('id') + '_' + contactListViewHash[contactListViewHashIndex].id).find('.trans-bkg-a-hv').trigger('click');
				return ;
			}
		}

	}




}


$.fn.ContactListView = function(inAction, inJsonStruct){
	var contactListView = $(this).data("contactListViewInstance");
	if(!(contactListView) || inAction == 'create'){
		inJsonStruct['divRef'] = $(this);
		console.log('ContactListView CREATED');
		var contactListView = new ContactListView(inJsonStruct);
		$(this).data("contactListViewInstance", contactListView);
		return ;
	}
	if(inAction == 'test'){
		contactListView = $(this).data("contactListViewInstance");
		//alert('test:' + contactListView.getTest());
	}

	if(inAction == 'loadData'){
		contactListView = $(this).data("contactListViewInstance");
		contactListView.loadData();
		contactListView.initEvent();
	}

	if(inAction == 'getSelectedData'){
		contactListView = $(this).data("contactListViewInstance");
		return contactListView.getSelectedData();
	}

	if(inAction == 'getSelected'){
		contactListView = $(this).data("contactListViewInstance");
		return contactListView.getSelected();
	}

	if(inAction == 'remove'){
		contactListView = $(this).data("contactListViewInstance");
		//inJsonStruct as single string '???'
		return contactListView.remove(inJsonStruct);
	}

	if(inAction == 'setSelectedByNameAndType'){
		return contactListView.setSelectedByNameAndType(inJsonStruct);
	}
	
}


//=======================================================================================================================================================
// CheckBoxControl ------------------------------------------------------------------------------------------------------------------------------------
//=======================================================================================================================================================
$.fn.form_checkbox_add = function(inJsonStruct){
	var options = 
			{
				caption:'noCaption',
				id:new Date().getTime(),
				isChecked:false,
			}
		options = $.extend(options, inJsonStruct);
	var createHtml = function(inJ){
		var html = '' + 
			'<label style="background-color: transparent !important;" for="' + inJ.id + '">' + inJ.caption + '</label>' + '' + 
			'<input type="checkbox" name="' + inJ.id + '" id="' + inJ.id + '"/>'
		;
		return html;

	}
	if(!($(this).data("elementArray"))){
		var theArray = [];
		$(this).data("elementArray", theArray);
	}
	console.dir(options);
	$(this).data("elementArray").push(options);
	$(this).find('.ui-controlgroup-controls').append(createHtml(options));
	$(this).trigger('create');
	//set init value
	if(options.isChecked){
		$('#' + options.id).prop('checked',true).checkboxradio('refresh');
	}else{
		$('#' + options.id).removeAttr('checked').checkboxradio('refresh');
	}
	return options.id;
}

$.fn.form_checkbox_getValueById = function(inId){
	if(!($(this).data("elementArray"))){return false;}
	return $('#' + inId).prop("checked");
}
$.fn.form_checkbox_getValueByIndex = function(inIndex){
	var theData = $(this).data("elementArray");
	if(!(theData)){return false;}
	return $('#' + theData[inIndex].id).prop("checked");
}
$.fn.form_checkbox_getData = function(){
	var theData = $(this).data("elementArray");
	if(!($(this).data("elementArray"))){return false;}
	for(var theDataIndex in theData){
		theData[theDataIndex].isChecked = $('#' + theData[theDataIndex].id).prop("checked");
	}
	return theData;
}
$.fn.form_checkbox_clear = function(){
	var theData = $(this).data("elementArray");
	if(!($(this).data("elementArray"))){return false;}
	$(this).find(' .ui-controlgroup-controls').empty();
	$(this).removeData("elementArray");
	$(this).trigger('create');
}

$.fn.form_checkbox_removeById = function(inId){
	var theData = $(this).data("elementArray");
	if(!($(this).data("elementArray"))){return false;}
	$('#' + inId).parent().children().remove();
	//$('#' + inId).remove();
	for(var theDataIndex in theData){
		if(theData[theDataIndex].id == inId){
			theData.splice(theDataIndex, 1); 
		}
	}
}
$.fn.form_checkbox_removeByIndex = function(inIndex){
	var theData = $(this).data("elementArray");
	if(!($(this).data("elementArray"))){return false;}
	$('#' + theData[inIndex].id).siblings().remove();
	$('#' + theData[inIndex].id).remove();
	theData.splice(inIndex, 1);
}

//=======================================================================================================================================================
// HorizontalRadioGroup ------------------------------------------------------------------------------------------------------------------------------------
//=======================================================================================================================================================
$.fn.HorizontalRadioGroup = function(inAction, inJsonStruct){
	var horizontalRadioGroup = $(this).data("horizontalRadioGroupInstance");


	if(!(horizontalRadioGroup) || inAction == 'create'){
		inJsonStruct['divRef'] = $(this);
		console.log('HorizontalRadioGroup CREATED');
		var horizontalRadioGroup = new HorizontalRadioGroup(inJsonStruct);
		$(this).data("horizontalRadioGroupInstance", horizontalRadioGroup);
		return ;
	}
	if(inAction == 'test'){
		horizontalRadioGroup.test();
	}

	if(inAction == 'load'){
		horizontalRadioGroup.load();
	}

	if(inAction == 'getSelected'){
		return horizontalRadioGroup.getSelected();
	}

	if(inAction == 'setSelected'){
		return horizontalRadioGroup.setSelected(inJsonStruct);
	}

	if(inAction == 'remove'){
		//contactListView = $(this).data("contactListViewInstance");
		/*//inJsonStruct as single string '???'
		return contactListView.remove(inJsonStruct);*/
	}
}

var HorizontalRadioGroup = function(inJsonStruct){
	var _this = this;
	var theDivRef;
	var options = 
		{
			id:new Date().getTime(),
			class:'',
			dataTheme:'a',
			dataType:'horizontal',
			legend:'',
			radioArray:[],
			onSelect:false,
		}
	options = $.extend(options, inJsonStruct);
	theDivRef = options.divRef;

	var createHtml = function(){
		var headerHtml = '' + 
			'<form id="' + options.id + '">'		+ '' +
				'<fieldset data-role="controlgroup" data-mini="true" data-theme="' + options.dataTheme + '" data-type="' + options.dataType + '" class="horizontalRadioGroupClass ' + options.class + '" >' + '' +
					'<legend>' + '' +
						options.legend + '' +
					'</legend>'
		;

		var midHtml = '';
		for(var radioArrayIndex in options.radioArray){
			var arrayOptions = 
				{
					id:options.id + '_' + radioArrayIndex,
					caption:'NO CAPTION',
					class:'HorizontalRadioControlClass',
					value:'off',
					checked:false

				}
			arrayOptions = $.extend(arrayOptions, options.radioArray[radioArrayIndex]);
			//var checkedVal = '' + (arrayOptions.checked == true)? 'checked="checked"' : '';
			var checkedVal = '';
			if(arrayOptions.checked == true){
				checkedVal = 'checked="checked"';
			}

			var html = '' +
				'<input type="radio" name="' + options.id + '" id="' + arrayOptions.id + '" value="' + arrayOptions.value + '" ' + checkedVal + '>' + '' +
				'<label for="' + arrayOptions.id + '">' + '' +
					arrayOptions.caption + '' +
				'</label>'
			;

			midHtml+= html;

		}//endFor

		var footerHtml = '' + 
				'</fieldset>' + '' +
			'</form>'
		;

		return headerHtml + midHtml + footerHtml;
	}

	this.load = function(){
		$(theDivRef).html(createHtml());
		$(theDivRef).checkboxradio().trigger('create');
		$(theDivRef).change(function(){
			if(options.onSelect){
				options.onSelect(_this.getSelected());
			}
		});
	}

	this.test = function(){
		alert('HorizontalRadioGroup TEST!!!');
	}

	this.getSelected = function(){
		var result = $(theDivRef).find('input:checked');
		return $("label[for='"+$(result).attr('id')+"']").text();
	}

	this.setSelected = function(inIndexOrCaption){
		if($.isNumeric(inIndexOrCaption)){
			//console.log('isNumeric');
			var theId = options.id + '_' + inIndexOrCaption;
			//??? got to go twice
			$('#' + theId).trigger('click');
			$('#' + theId).trigger('click');
		}else{
			//console.log('running' + options.id);
			//console.dir($("#" + options.id +' .ui-radio input'));
			//$("#" + options.id +' .ui-radio input').each(function(){
			//console.log('mainLookup:' + '#'  + $(this) +' .ui-radio input');
			//console.dir($(this).find(' .ui-radio input'));
			$(theDivRef).find(' .ui-radio input').each(function(){
				//console.dir(this);
				//console.log(inIndexOrCaption +' <-> '+  $("label[for='"+$(this).attr('id')+"']").text());
				if(inIndexOrCaption == $("label[for='"+$(this).attr('id')+"']").text()){
					$(this).trigger('click');
					$(this).trigger('click');
				}
			});
		}
	}

}







