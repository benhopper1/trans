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