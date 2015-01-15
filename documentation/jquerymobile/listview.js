image thumbnail size: 80 * 80



/* this changes the actual div*/
style.
	#mainmenu li a{
		background-color: transparent !important;
		//background-image: url('') !important;
		//background: rgb(0, 0, 0);
		//background: rgba(0, 0, 0, 0.6);
	}
	#mainmenu li a:hover { 
		background-color:#feeebd !important;
	}
	#mainmenu li a:active { 
		background-color:#817865 !important;
	}

	#mainmenu li a img { 
		height:80px;
	}

	.menu_li{
		//background-color:black !important;
		background-color: transparent !important;
		//background: rgb(0, 0, 0);
		//background: rgba(0, 0, 0, 0.6);

	}


div(data-role="main" class="ui-content" syle="")
	div(class="ui-field-contain" id="main_bg" style="width:300px; left:10px")
		ul(data-role="listview" id="mainmenu" class=""  data-inset="true" )
			li(id="contactManagerDiv" class="menu_li" )
				a("/hjhjhjh" style="") Contact Manager
					img(src="/public/images/ui/userconfig.png" )
			//br
			li(id="smsManagerDiv" class="menu_li")
				a("/hjhjhjh") Sms Manager
					img(src="/public/images/ui/mobile-sms.png" )
			//br
			li(id="handsetControllerDiv" class="menu_li")
				a("/hjhjhjh") Handset Controller
					img(src="/public/images/ui/androidPhoneImg.png" )
			//br
			li(id="downloaddiv" class="menu_li")
				a("/hjhjhjh") Get Android App
					img(src="/public/images/ui/download_android_app_button.png" )
			//br
			li(class="menu_li")
				a("/hjhjhjh") XXXXXXXX
					img(src="/public/images/ui/userconfig.png" )