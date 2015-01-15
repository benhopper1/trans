$.fn.formatPhoneNumber = function () { 
	if($(this).val().length = 10){
		$(this).val('1' + $(this).val().substring(1).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1)$2-$3'));
	}

	if($(this).val().length = 11){

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