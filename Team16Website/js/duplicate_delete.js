 // -- Beginning of file --
/* 
 * [duplicate_delete.js]
 * 
 * duplicate_delete.js script file is the main source of all javascript functions
 * in the main scheduler of the garden. Other functions include changing the username
 * and password of the Admin pages of GardeNet
 * 
 * (C) 2016, John Connell
 * Last Modified: [20-04-2016]
 */




var number = 4;
var tabs = null;
var num = 4;
var tab1num = 4;
var tab2num = 4;
var tab3num = 4;
var tab4num = 4;
var i= 0;
var j= 0;


// Initialize the zone tabs to show and hide data on click
$(document).ready(function(){
	tabs=$('#tabs').scrollTabs({
		click_callback: function(e){
			$('div[id^="tab"]').addClass("hide").removeClass("active");
			$('#tabs-container').removeClass("hide");

			var id = $(this).children().attr('href');



			$(id + '.tab-content').removeClass("hide");
			$(id + '.tab-content').addClass("active");
			$('#button4').removeClass("hide");
			$('#button5').removeClass("hide");

			if(id=="#tab1"){
				num = tab1num;

			} else if(id == "#tab2"){
				num = tab2num;
			} else if(id == "#tab3"){
				num = tab3num;
			}else if(id == "#tab4"){
				num = tab4num;
			}



		}
	});
});


/* 
 * loadZonesandEvents()
 *
 * Pulls information from garden_info.txt JSON text file,
 * then opens the number of necessary zones and events as specified in the file.
 * 
 * @param int tab#num: number of open events per tab
 * @param int number: number of open zones/tabs
 * 
 * @return type varname: displays the correct number of tabs and events.
 */ 
function loadZonesandEvents(){
	$.getJSON('../../garden_net/gn_util/garden_info.txt', function(jsondata){
		$.each(jsondata, function(i, item){
			var thingName = "";
			thingName = i;
			$.each(item, function(j, event){
				if(j=="openevents"){
					if(thingName=="Zone1"){
						tab1num=event;
						num = tab1num;
					} else if(thingName=="Zone2"){
						tab2num=event;
					} else if(thingName=="Zone3"){
						tab3num=event;
					} else if(thingName=="Zone4"){
						tab4num=event;
					}
				}else if(j=="openZones"){
					number=event;
					for(i=1; i<=number; i++){
						tabs.addTab("<li id='li_"+i+"'><a id ='"+i+"' href='#tab"+i+"'>Zone "+i+"</li>");
					}
				}
			});
		});
	
	for(i=0; i<tab1num; i++){
		$('#tab1 #row'+i+'').removeClass("hide");
	}

	for(i=0; i<tab2num; i++){
		$('#tab2 #row'+i+'').removeClass("hide");
	}

	for(i=0; i<tab3num; i++){
		$('#tab3 #row'+i+'').removeClass("hide");
	}
	for(i=0; i<tab4num; i++){
		$('#tab4 #row'+i+'').removeClass("hide");
	}

	
	});
	

	$.ajaxSetup({
    	headers: { "cache-control": "no-cache" }
	});

	

}

/* 
 * login()
 *
 * Takes input form of account.html file and submits them with error checking.
 * 
 * @preconditions: as applicable
 * @postconditions: as applicable
 * 
 * @param text username: new username of user
 * @param text password: new password of user
 * ^^ repeat for each parameter^^
 * 
 * @return type varname: returns account of data in text file.
 */ 
function login(){

	if($('input[name="Username1"]').val() == $('input[name="Username2"]').val()){
		if($('input[name="Password1"]').val() == $('input[name="Password2"]').val()){
			var login = $("#login").serializeJSON();
			var jsonString= JSON.stringify(login);
			console.log(jsonString);

	/*
	 * All ajax forms used on page are POST commands due to url size restrictions with GET
	 * POST also allows for data security when sending commands and information.
	 */
			$.ajax({
				url: "../login.php",
				cache: false,
				dataType: "text",
				type: 'POST',
				data: {jsonString: jsonString},
				success: function(data) {
					alert(data);
				}
				

			});

		}else{
			alert("Alert: Passwords do not match.\nPlease enter the same password in both forms.");
		}
	}else{
		alert("Alert: Usernames do not match.\nPlease enter the same username in both forms.");
	}
	


}


/* 
 * editTitle()
 *
 * Changes Zone title to the user's input
 * 
 */ 



function editTitle(){
	var currentTitle;
	if($('#tab1').hasClass("active")){
		currentTitle = $('zone1').html();
		$('#newTitle1').val();
		$('#newTitle1').removeClass("hide");
		$('#subTitle1').removeClass("hide");
		$('#zone1').addClass("hide");
	}else if($('#tab2').hasClass("active")){
		currentTitle = $('zone2').html();
		$('#newTitle2').val();
		$('#newTitle2').removeClass("hide");
		$('#subTitle2').removeClass("hide");
		$('#zone2').addClass("hide");
	}else if($('#tab3').hasClass("active")){
		currentTitle = $('zone3').html();
		$('#newTitle3').val();
		$('#newTitle3').removeClass("hide");
		$('#subTitle3').removeClass("hide");
		$('#zone3').addClass("hide");
	}else if($('#tab4').hasClass("active")){
		currentTitle = $('zone4').html();
		$('#newTitle4').val();
		$('#newTitle4').removeClass("hide");
		$('#subTitle4').removeClass("hide");
		$('#zone4').addClass("hide");
	}

}

/* 
 * genTitle()
 *
 * Sets the title on submission
 * 
 */ 



function genTitle(){
	var newTitle;
	if($('#tab1').hasClass("active")){
		newTitle = $('#newTitle1').val();
		$('#zone1').text(newTitle);
		$('#newTitle1').addClass("hide");
		$('#zone1').removeClass("hide");
		$('#subTitle1').addClass("hide");
		$('#1').html(newTitle);	
	}else if($('#tab2').hasClass("active")){
		newTitle = $('#newTitle2').val();
		$('#zone2').text(newTitle);
		$('#newTitle2').addClass("hide");
		$('#zone2').removeClass("hide");
		$('#subTitle2').addClass("hide");
		$('#2').html(newTitle);	
	}else if($('#tab3').hasClass("active")){
		newTitle = $('#newTitle3').val();
		$('#zone3').text(newTitle);
		$('#newTitle3').addClass("hide");
		$('#zone3').removeClass("hide");
		$('#subTitle3').addClass("hide");
		$('#3').html(newTitle);	
	}else if($('#tab4').hasClass("active")){
		newTitle = $('#newTitle4').val();
		$('#zone4').text(newTitle);
		$('#newTitle4').addClass("hide");
		$('#zone4').removeClass("hide");
		$('#subTitle4').addClass("hide");
		$('#4').html(newTitle);	
	}




	for(i=0; i<21; i++){
		for(j=0; j<21; j++){
			$('select[name="Zone'+i+'[event'+j+'[day]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[start_time]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[stop_time]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[zone_ID]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[valve_num]]"]').prop("disabled", true);
		}

	}
	var myForm = $("#myForm").serializeJSON();
	for(i=0; i<21; i++){
		for(j=0; j<21; j++){
			$('select[name="Zone'+i+'[event'+j+'[day]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[start_time]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[stop_time]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[zone_ID]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[valve_num]]"]').prop("disabled", false);
		}

	}
	var jsonString = JSON.stringify(myForm);
	console.log(jsonString);

	/*
	 * All ajax forms used on page are POST commands due to url size restrictions with GET
	 * POST also allows for data security when sending commands and information.
	 */
	$.ajax({
		url: "../saveinfo.php",
		cache: false,
		dataType: "text",
		type: 'POST',
		data: {jsonString: jsonString},
		success: function(data) {
			console.log("Garden Info Submitted!");
		}
		

	});
}

/* 
 * advanced()
 *
 * Displays the advanced options
 * 
 */ 



function advanced(){
	if($('#tab1').hasClass("active")){
		$('#node1').removeClass("hide");
		$('#valve1').removeClass("hide");
		$('#NVChange1').removeClass("hide");
		$('#weather1').removeClass("hide");
		$("#advancedControls4").removeClass("hide");
		$('#adControls1').addClass("hide");
	}else if($('#tab2').hasClass("active")){
		$('#node2').removeClass("hide");
		$('#valve2').removeClass("hide");
		$('#NVChange2').removeClass("hide");
		$('#weather2').removeClass("hide");
		$("#advancedControls4").removeClass("hide");
		$('#adControls2').addClass("hide");
	}else if($('#tab3').hasClass("active")){
		$('#node3').removeClass("hide");
		$('#valve3').removeClass("hide");
		$('#weather3').removeClass("hide");
		$('#NVChange3').removeClass("hide");
		$("#advancedControls4").removeClass("hide");
		$('#adControls3').addClass("hide");
	}else if($('#tab4').hasClass("active")){
		$('#node4').removeClass("hide");
		$('#valve4').removeClass("hide");
		$('#NVChange4').removeClass("hide");
		$('#weather4').removeClass("hide");
		$("#advancedControls4").removeClass("hide");
		$('#adControls4').addClass("hide");
	}
}

/* 
 * genTitle()
 *
 * Sends the Changed options of Node and Valve to the garden_info text file
 * 
 */ 


function changeNV(){
	if($('#tab1.active').hasClass("active")){
		$('#node1').addClass("hide");
		$('#valve1').addClass("hide");
		$('#NVChange1').addClass("hide");
		$('#weather1').addClass("hide");
		$('#adControls1').removeClass("hide");
	}else if ($('#tab2').hasClass("active")){
		$('#node2').addClass("hide");
		$('#valve2').addClass("hide");
		$('#NVChange2').addClass("hide");
		$('#weather2').addClass("hide");
		$('#adControls2').removeClass("hide");
	}else if ($('#tab3').hasClass("active")){
		$('#node3').addClass("hide");
		$('#valve3').addClass("hide");
		$('#NVChange3').addClass("hide");
		$('#weather3').addClass("hide");
		$('#adControls3').removeClass("hide");
	}else if ($('#tab4').hasClass("active")){
		$('#node4').addClass("hide");
		$('#valve4').addClass("hide");
		$('#NVChange4').addClass("hide");
		$('#weather4').addClass("hide");
		$('#adControls4').removeClass("hide");
	}

	for(i=0; i<21; i++){
		for(j=0; j<21; j++){
			$('select[name="Zone'+i+'[event'+j+'[day]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[start_time]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[stop_time]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[zone_ID]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[valve_num]]"]').prop("disabled", true);

		}


	}
	var myForm = $("#myForm").serializeJSON();
	for(i=0; i<21; i++){
		for(j=0; j<21; j++){
			$('select[name="Zone'+i+'[event'+j+'[day]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[start_time]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[stop_time]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[zone_ID]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[valve_num]]"]').prop("disabled", false);
		}

	}



	var jsonString = JSON.stringify(myForm);
	console.log(jsonString);

	/*
	 * All ajax forms used on page are POST commands due to url size restrictions with GET
	 * POST also allows for data security when sending commands and information.
	 */
	$.ajax({
		url: "../saveinfo.php",
		cache: false,
		dataType: "text",
		type: 'POST',
		data: {jsonString: jsonString},
		success: function(data) {
			console.log("Garden Info Submitted!");
		}
		

	});
	
}




/* 
 * forwardFunction()
 *
 * Used to increment the amount of zones currently used
 * 
 */ 

function forwardFunction()
{
	if(number<3){
		++number; 
		tabs.addTab("<li id='li_"+number+"'><a id ='"+number+"' href='#tab"+number+"'>Zone "+number+"</li>");

		if(number>0){
			$("#button2").show();
		}
	}
	else{
		++number; 
		$("#button").hide(); 
		tabs.addTab("<li id='li_"+number+"'><a id ='"+number+"' href='#tab"+number+"'>Zone "+number+"</li>");
		for(j=0; j<21; j++){
			$('select[name="Zone'+number+'[event'+j+'[day]]"]').material_select();
		}

	}
	$('input[name="Garden[openZones]"]').val(number);

}


/* 
 * deleteTabs()
 *
 * Used to decrement the amount of zones currently used 
 * from the last created zone.
 * 
 */ 

function deleteTabs()
{ 

	
	if(number>1){
		tabs.removeTabs("#li_"+number);
		--number;

		if(number<17){
			$("#button").show(); 
		}
	}
	else{

		tabs.removeTabs("#li_"+number);
		--number;

		$('.scroll_tab_left_finisher').remove();
		$('.scroll_tab_right_finisher').remove();
		$("#button2").hide();
	}
	$('input[name="Garden[openZones]"]').val(number);


}


/* 
 * submit()
 *
 * Takes all form data of the schedule and changes them into a JSON format
 * with the help of the serializeJSON() javascript file
 * 
 * 
 * submit also has the responsibility of submitting not only the schedule but 
 * also the garden information for the necessity of redundancy
 *
 */ 


function submit(){


	/*
	 * For the unused events, the values are changed to the defaults i.e.
	 *  Day = Monday, start_time = 00:00, stop_time = 01:00
	 */
	
	for(i=tab1num-1; i<20; i++){
		$('select[name="Zone1[event'+i+'[day]]"]').val("Monday");
		$('input[name="Zone1[event'+i+'[start_time]]"]').val("00:00");
		$('input[name="Zone1[event'+i+'[stop_time]]"]').val("01:00");
	}
	for(i=tab2num-1; i<20; i++){
		$('select[name="Zone2[event'+i+'[day]]"]').val("Monday");
		$('input[name="Zone2[event'+i+'[start_time]]"]').val("00:00");
		$('input[name="Zone2[event'+i+'[stop_time]]"]').val("01:00");
	}
	for(i=tab3num-1; i<20; i++){
		$('select[name="Zone3[event'+i+'[day]]"]').val("Monday");
		$('input[name="Zone3[event'+i+'[start_time]]"]').val("00:00");
		$('input[name="Zone3[event'+i+'[stop_time]]"]').val("01:00");
	}
	for(i=tab4num-1; i<20; i++){
		$('select[name="Zone4[event'+i+'[day]]"]').val("Monday");
		$('input[name="Zone4[event'+i+'[start_time]]"]').val("00:00");
		$('input[name="Zone4[event'+i+'[stop_time]]"]').val("01:00");
	}
	
	/*
	 * Disables the Garden Info forms to prevent submission in
	 *  the schedule file.
	 */

	for(i=1; i<10; i++){
		$('input[name="Zone'+i+'[name]"]').prop("disabled", true);
		$('input[name="Zone'+i+'[openevents]"]').prop("disabled", true);
		$('input[name="Zone'+i+'[node]"]').prop("disabled", true);
		$('input[name="Zone'+i+'[valve]"]').prop("disabled", true);
		$('select[name="Zone'+i+'[weather]"]').prop("disabled", true);
	}
	$('input[name="Garden[openZones]"]').prop("disabled", true);

	for(j=0; j<21; j++){
			$('select[name="Zone4[event'+j+'[day]]"]').prop("disabled", true);
			$('input[name="Zone4[event'+j+'[start_time]]"]').prop("disabled", true);
			$('input[name="Zone4[event'+j+'[stop_time]]"]').prop("disabled", true);
			$('input[name="Zone4[event'+j+'[zone_ID]]"]').prop("disabled", true);
			$('input[name="Zone4[event'+j+'[valve_num]]"]').prop("disabled", true);
	}


	var myForm = $("#myForm").serializeJSON();
	for(i=1; i<10; i++){
		$('input[name="Zone'+i+'[name]"]').prop("disabled", false);
		$('input[name="Zone'+i+'[openevents]"]').prop("disabled", false);
		$('input[name="Zone'+i+'[node]"]').prop("disabled", false);
		$('input[name="Zone'+i+'[valve]"]').prop("disabled", false);
		$('select[name="Zone'+i+'[weather]"]').prop("disabled", false);
	}
	$('input[name="Garden[openZones]"]').prop("disabled", false);
	for(i=0; i<6; i++){
		for(j=0; j<24; j++){
			var str1 = $('input[name="Zone'+i+'[event'+j+'[start_time]]"]').val();
			var str2 = $('input[name="Zone'+i+'[event'+j+'[stop_time]]"]').val();

			if(str1 > str2){
				alert("ERROR: Cannot have stop time earlier than start time\n Error located in"+$('input[name="Zone'+i+'[name]"]').val()+" event "+(j+1)+"");
				return;
			}
			
		}

	}
	var jsonString = JSON.stringify(myForm);
	console.log(jsonString);

	/*
	 * All ajax forms used on page are POST commands due to url size restrictions with GET
	 * POST also allows for data security when sending commands and information.
	 */
	$.ajax({
		url: "../savejson.php",
		dataType: "text",
		type: 'POST',
		data: {jsonString: jsonString},
		success: function(data) {
			alert("Schedule Submitted!");
		}
		

	});

	/*
	 * Disables the Schedule forms to prevent submission in
	 *  the garden info file.
	 */
	for(i=0; i<21; i++){
		for(j=0; j<21; j++){
			$('select[name="Zone'+i+'[event'+j+'[day]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[start_time]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[stop_time]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[zone_ID]]"]').prop("disabled", true);
			$('input[name="Zone'+i+'[event'+j+'[valve_num]]"]').prop("disabled", true);
		}

	}
	var myForm = $("#myForm").serializeJSON();
	for(i=0; i<21; i++){
		for(j=0; j<21; j++){
			$('select[name="Zone'+i+'[event'+j+'[day]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[start_time]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[stop_time]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[zone_ID]]"]').prop("disabled", false);
			$('input[name="Zone'+i+'[event'+j+'[valve_num]]"]').prop("disabled", false);
		}

	}



	var jsonString = JSON.stringify(myForm);
	console.log(jsonString);

	/*
	 * All ajax forms used on page are POST commands due to url size restrictions with GET
	 * POST also allows for data security when sending commands and information.
	 */
	$.ajax({
		url: "../saveinfo.php",
		dataType: "text",
		type: 'POST',
		data: {jsonString: jsonString},
		success: function(data) {
			console.log("Garden Info Submitted!");
		}
		

	});
	

}

/* 
 * addEvent1()
 *
 * Increments the number of events that are active per zone of the schedule
 * 
 */ 

function addEvent1(){
	var active = $('div').hasClass("tab-content card-content active");
	
		$('#button5').removeClass('hide');
		if(num<12){
			($('div.active').find('#row'+num+'')).removeClass('hide');
			++num;
		}else{
			$('#button4').addClass("hide");
			
		}
		
		if($('#tab1').hasClass("active") == true){
			tab1num = num;
			$('input[name="Zone1[openevents]"]').val(tab1num);
		} else if($('#tab2').hasClass("active") == true){
			tab2num = num;
			$('input[name="Zone2[openevents]"]').val(tab2num);
		} else if($('#tab3').hasClass("active") == true){
			tab3num = num;
			$('input[name="Zone3[openevents]"]').val(tab3num);
		} else if($('#tab4').hasClass("active") == true){
			tab4num = num;
			$('input[name="Zone4[openevents]"]').val(tab4num);
		}

	
}

/* 
 * deleteEvent1()
 *
 * Decrements the number of events that are active per zone of the schedule
 * 
 */ 

function deleteEvent1(){
	var active = $('div').hasClass("tab-content card-content active");

	
		$('#button4').removeClass('hide');
		--num;
		if(num>1){
			
			($('div.active').find('#row'+(num)+'')).addClass('hide');
			
			
		}else{
			($('div.active').find('#row'+(num)+'')).addClass('hide');
			$('#button5').addClass('hide');
			
		}
		if($('#tab1').hasClass("active") == true){
			tab1num = num;
			$('input[name="Zone1[openevents]"]').val(tab1num);
		} else if($('#tab2').hasClass("active") == true){
			tab2num = num;
			$('input[name="Zone2[openevents]"]').val(tab2num);
		} else if($('#tab3').hasClass("active") == true){
			tab3num = num;
			$('input[name="Zone3[openevents]"]').val(tab3num);
		} else if($('#tab4').hasClass("active") == true){
			tab4num = num;
			$('input[name="Zone4[openevents]"]').val(tab4num);
		}
		

	
}

/* 
 * switchCheck()
 *
 * Checks the Garden Power switch and sends it to the garden_power_status text file
 * 
 */ 

function switchCheck(){

	var checkbox = $('#mySwitch').prop('checked');
	var string = JSON.stringify(checkbox);
	console.log(string);	
		/*
		 * All ajax forms used on page are POST commands due to url size restrictions with GET
		 * POST also allows for data security when sending commands and information.
		 *///alert('checkbox value: '+ checkbox);
	$.ajax({
		url: "../switch.php",
		cache: false,
		dataType: "text",
		type: 'POST',
		data: {string: string},
		success: function(data) {
			if(data == "true"){
				alert("Garden Power: Awake");
			}else{
				alert("Garden Power: Sleep");
			}
			
		}
		

	});

}







