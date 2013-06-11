var editAnswers;
var j = 3;					/*to add or delete edited answers*/
var i = 3;					/*to add or delete answers*/
var user_id = -1;
var popupStatus = 0;
var groupList = new Array();
var last_num = -1; 
var edit_Mode;
var qrcode;
var bg_qr;
var start_qr = 1;
var startedit = 1;
var edit;
var bg_edit;
var showedit = 1;
var data_length = -1;
var group = '';
var made_changes = false;

$(document).ready(function(){	
	// focus message edit element
	document.getElementById("message").focus();
	
	// get the userID from cookie
	if (document.cookie) {
		// check URL
		var c = document.cookie;
		var pos = c.indexOf('uid');
		user_id = c.slice(pos+4);
		if (user_id < 1) {
			alert("Wrong user-ID!");
			return;
		}
	} else {
		alert("You're not allowed to enter this site!");
		var page = "/";
		window.open(page, "_self");
		return;
	}  
	//loadMessages();
	
	loadGroups();
	
	// at the beginning we're not in the edit mode
	edit_Mode = false;
	
	$("#showAllMessages").hide();
	
	/*add answer*/
	$("#addanswer").click(function(){
		if(i <= 6 ){
			$("#answers").append("<div id='answer" + i + "'><input type='text' name='answer" + i +"' id='answerText" + i + "' placeholder= 'Answer " + i + "' /></div>");
			i++;
		}else{
			alert("max. Anzahl von Antworten erreicht");
		}
	});
	
	/*delete answer*/
	$("#delanswer").click(function(){
		if(i > 3){	
			//$(".ans").has("name='answer3'").remove();
			i--;
			$test="answer"+i;
			$('div[id="'+$test+'"]').remove();
		}else{
			alert("Es k�nnen nicht mehr Antworten entfernt werden");
		}
	});
	
	/*show Messages*/
	$("#showMessage").click(function(){
		$("#showMessage").parent().addClass("active");
		$("#addMessage").parent().removeClass("active");
		$("#logout").parent().removeClass("active");
		$("#edit").empty();
		$("#newMessage").hide();
		updateTable();
		$("#showAllMessages").show();
		edit_Mode = true;
	});
	
	/*add Message*/
	$("#addMessage").click(function(){
		$("#addMessage").parent().addClass("active");
		$("#showMessage").parent().removeClass("active");
		$("#edit").empty();
		$("#newMessage").show();
		$("#showAllMessages").hide();
		edit_Mode = false;
	});
	
	/*logout*/
	$("#logout").click(function() {
		$("#logout").parent().addClass("active");
		$("#addMessage").parent().removeClass("active");
		$("#showMessage").parent().removeClass("active");
		logout();
	})
	
	/*hide edit*/
	$("#bg_trans_edit").click(function(){
		close_edit();
	});
	
	// for QR-Code	
	$(this).keyup(function(event) {
         if (event.which == 27) { // 27 is 'Ecs' in the keyboard
        	 disablePopup();
         }
	});

	/*close result*/
	$("#bg_trans_qr").click(function(){
		disablePopup();
	});
});

/* hides the edit window */
function close_edit() {
	$("#edit").css("display","none");
	$("#bg_trans_edit").css("display","none");
	$("body").css("overflow-y","visible");
	edit = $("#edit").detach();
	bg_edit = $("#bg_trans_edit").detach();
	startedit = 0;
	showedit = 0;
	
	if (made_changes) {
		updateTable();
	}
}

/*save message*/
function saveMessage(){
	var text = document.getElementById("message").value;
	var userID = user_id;
	var group = document.getElementById("groupsList").options[document.getElementById("groupsList").selectedIndex].text;
	var ans1 = "";
	var ans2 = "";
	var ans3 = "";
	var ans4 = "";
	var ans5 = "";
	var ans6 = "";
	
	if(i-1 == 2){
		ans1 = document.getElementById("answerText1").value;
		ans2 = document.getElementById("answerText2").value;
	}else if(i-1 == 3){
		ans1 = document.getElementById("answerText1").value;
		ans2 = document.getElementById("answerText2").value;
		ans3 = document.getElementById("answerText3").value;
	}else if(i-1 == 4){
		ans1 = document.getElementById("answerText1").value;
		ans2 = document.getElementById("answerText2").value;
		ans3 = document.getElementById("answerText3").value;
		ans4 = document.getElementById("answerText4").value;
	}else if(i-1 == 5){
		ans1 = document.getElementById("answerText1").value;
		ans2 = document.getElementById("answerText2").value;
		ans3 = document.getElementById("answerText3").value;
		ans4 = document.getElementById("answerText4").value;
		ans5 = document.getElementById("answerText5").value;
	}else if(i-1 == 6){
		ans1 = document.getElementById("answerText1").value;
		ans2 = document.getElementById("answerText2").value;
		ans3 = document.getElementById("answerText3").value;
		ans4 = document.getElementById("answerText4").value;
		ans5 = document.getElementById("answerText5").value;
		ans6 = document.getElementById("answerText6").value;
	}
	
	$.get('/save',
		{'text': text,
		 'ans1': ans1,
		 'ans2': ans2,
		 'ans3': ans3,
		 'ans4': ans4,
		 'ans5': ans5,
		 'ans6': ans6,
		 'userID': user_id,
		 'group': group},
		function(data){
			alert("message saved");
			document.getElementById("message").value = "";
			document.getElementById("groupsList").selectedIndex = 0;
			
			if(i-1 == 2){
				document.getElementById("answerText1").value = "";
				document.getElementById("answerText2").value = "";
			}else if(i-1 == 3){
				document.getElementById("answerText1").value = "";
				document.getElementById("answerText2").value = "";
				$("#answer3").remove();
				$("#answerText3").remove();
			}else if(i-1 == 4){
				document.getElementById("answerText1").value = "";
				document.getElementById("answerText2").value = "";
				$("#answer3").remove();
				$("#answerText3").remove();
				$("#answer4").remove();
				$("#answerText4").remove();
			}else if(i-1 == 5){
				document.getElementById("answerText1").value = "";
				document.getElementById("answerText2").value = "";
				$("#answer3").remove();
				$("#answerText3").remove();
				$("#answer4").remove();
				$("#answerText4").remove();
				$("#answer5").remove();
				$("#answerText5").remove();
			}else if(i-1 == 6){
				document.getElementById("answerText1").value = "";
				document.getElementById("answerText2").value = "";
				$("#answer3").remove();
				$("#answerText3").remove();
				$("#answer4").remove();
				$("#answerText4").remove();
				$("#answer5").remove();
				$("#answerText5").remove();
				$("#answer6").remove();
				$("#answerText5").remove();
			}
	});
}
/*enable message*/
function enable(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	var pw = '';
	$.get('/enable',
		{'id': messageID},
		function(data){
			pw = data.password;
			alert("Message " + messageID + " enabled password: " + data.password);
			updateTable();
	});
	
	// show QR-Button
	var s = 'qr' + messageID + '/';
	document.getElementById(s).style.visibility = "visible";
	document.getElementById(s).id = 'qr' + messageID + '/' + pw;
}
/*disable message*/
function disable(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	var messagePW = document.getElementById("pw"+num).innerHTML;
	$.get('/disable',
		{'id': messageID},
		function(data){
			alert("Message " + messageID + " disabled");
			updateTable();
	});
	
	// hide QR-Button
	var s = 'qr' + messageID + '/' + messagePW;
	document.getElementById(s).style.visibility = "hidden";
	document.getElementById(s).id = 'qr' + messageID + '/';
}

/*delete message*/
function deleteMessage(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.get('/delete',
		{'id': messageID},
		function(data){
			alert("Message " + messageID + " delete");
			$("#edit").hide();
			updateTable();
	});
}

/*reset answers to a specific message*/
function resetAnswers(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.post('/resetAnswers',
			{'id': messageID},
			function(data){
				alert("Answers for message " + messageID + " reseted");
		});
}

/*edit message*/
function editMessage(num){
	if(startedit == 0){
		edit.appendTo("body");
		bg_edit.appendTo("body");
	}
	
	if(document.getElementById("edit").innerHTML != ""){
		$("#edit").empty();
	}

	var messageID = document.getElementById("id"+num).innerHTML;
	var message;
	
	$("#edit").append("<form action='edit.php' method='POST'>" +
		"<div class='form'><label>Question: </label>" +
		"<textarea id='messageText' name='editedmessage' cols='35' rows='5'></textarea></div>" +
		"<div class='form'><label>Group:</label><div id='messageGroupsDiv'></div></div>"+
		"<div class='form'><label>Answers: </label>" +
		"<div id='editanswers'>");
		
	
	/*$.get('/getMessage',
		{'id': messageID},
		function(data){
			$("#edit").show();
			document.getElementById("messageText").innerHTML = data.text;
			group = data.group;
	});*/
	
	$.ajax({
        url: "/getMessage",
        async: false,
        data: {id: messageID},
        datatype: "json",
        type: "GET",
        success: function(data) {
        	$("#edit").show();
			document.getElementById("messageText").innerHTML = data.text;
			group = data.group;
        }
	}).error(function() {
		alert("Error on getting message!");
	});

	loadGroups();
		
	$.post('/getAnswers',
		{'id': messageID},
		function(data){
			editAnswers = 2;
			if (data[0].text != "") {
				$("#editanswers").append("<div id='edit1'><input type='text' id='editedanswer1' name='editedanswer1'/></div>");
				document.getElementById("editedanswer1").value = data[0].text;
			}
			if (data[1].text != "") {
				$("#editanswers").append("<div id='edit2'><input type='text' id='editedanswer2' name='editedanswer2'/></div>");
				document.getElementById("editedanswer2").value = data[1].text;
			}
			
			if(data[2].text == ""){
				//do nothing
			}else if(data[3].text == ""){
				$("#editanswers").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				editAnswers = 3;
			}else if(data[4].text == ""){
				$("#editanswers").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'><input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				document.getElementById("editedanswer4").value = data[3].text;
				editAnswers = 4;
			}else if(data[5].text== ""){
				$("#editanswers").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#editanswers").append("<div id='edit4'><input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#editanswers").append("<div id='edit5'><input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				document.getElementById("editedanswer4").value = data[3].text;
				document.getElementById("editedanswer5").value = data[4].text;
				editAnswers = 5;
			}else{
				$("#editanswers").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#editanswers").append("<div id='edit4'><input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#editanswers").append("<div id='edit5'><input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				$("#editanswers").append("<div id='edit6'><input type='text' id='editedanswer6' name='editedanswer6'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				document.getElementById("editedanswer4").value = data[3].text;
				document.getElementById("editedanswer5").value = data[4].text;
				document.getElementById("editedanswer6").value = data[5].text;
				editAnswers = 6;
			}
			$("#edit").append("</div><div class='btn-group'><input class='btn' type='button' onclick='addeditanswer()' id='addeditanswer' value='add answer' />"+
							"<input class='btn' type='button' onclick='deleditanswer()' id='deleditanswer' value='delete answer' />"+
							"<input class='btn' type='button' onclick='saveChanges("+num+")' value='save changes' /></div></form>");
			
			$("#edit").css("display","block");
			$("#bg_trans_edit").css("display","block");
			$("body").css("overflow-y","hidden");
			
			j = editAnswers + 1;
	});
}

/*addeditanswer*/
function addeditanswer(){
	if(j <= 6 ){
		$("#editanswers").append("<div id='edit"+j+"'><input type='text' id='editedanswer" + j +"' name='editedanswer" + j +"' placeholder='Answer " + j + "' /></div>");
		j++;
		if(editAnswers < 6){
			editAnswers++;
		}
	}else{
		alert("max. Anzahl von Antworten erreicht");
	}
}
/*delete edit answer*/
function deleditanswer(){
	if(j > 3){	
		//$(".ans").has("name='answer3'").remove();
		j--;
		if(editAnswers > 2){
			editAnswers--;
		}
		$test="edit"+j;
		$('div[id="'+$test+'"]').remove();
	}else{
		alert("Es koennen nicht mehr Antworten entfernt werden");
	}
}

/*save changes*/
function saveChanges(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	var text = document.getElementById("messageText").value;
	var group = document.getElementById('messageGroups').options[document.getElementById('messageGroups').selectedIndex].text;
	var ans1 = "";
	var ans2 = "";
	var ans3 = "";
	var ans4 = "";
	var ans5 = "";
	var ans6 = "";
	
	if(editAnswers == 2){
		ans1 = document.getElementById("editedanswer1").value;
		ans2 = document.getElementById("editedanswer2").value;
	}else if(editAnswers == 3){
		ans1 = document.getElementById("editedanswer1").value;
		ans2 = document.getElementById("editedanswer2").value;
		ans3 = document.getElementById("editedanswer3").value;
	}else if(editAnswers == 4){
		ans1 = document.getElementById("editedanswer1").value;
		ans2 = document.getElementById("editedanswer2").value;
		ans3 = document.getElementById("editedanswer3").value;
		ans4 = document.getElementById("editedanswer4").value;
	}else if(editAnswers == 5){
		ans1 = document.getElementById("editedanswer1").value;
		ans2 = document.getElementById("editedanswer2").value;
		ans3 = document.getElementById("editedanswer3").value;
		ans4 = document.getElementById("editedanswer4").value;
		ans5 = document.getElementById("editedanswer5").value;
	}else if(editAnswers == 6){
		ans1 = document.getElementById("editedanswer1").value;
		ans2 = document.getElementById("editedanswer2").value;
		ans3 = document.getElementById("editedanswer3").value;
		ans4 = document.getElementById("editedanswer4").value;
		ans5 = document.getElementById("editedanswer5").value;
		ans6 = document.getElementById("editedanswer6").value;
	}
	
	$.get('/saveChanges',
		{'id': messageID,
		'text': text,
		'ans1': ans1,
		'ans2': ans2,
		'ans3': ans3,
		'ans4': ans4,
		'ans5': ans5,
		'ans6': ans6,
		'group': group},
		function(data){
			alert("changes saved");
	});
	/*$.ajax({
		type: 'POST',
		url: '../PHP/saveChanges.php',
		data: {
			'id': messageID,
			'text': text,
			'ans1': ans1,
			'ans2': ans2,
			'ans3': ans3,
			'ans4': ans4,
			'ans5': ans5,
			'ans6': ans6
		},
		success: function(data) {
			var data_field = $.parseJSON(data);
			alert("changes saved");
			updateTable();
		}
	});*/
	
	// close div
	close_edit();
	
	// reload page
	updateTable();
}

/*update table*/
function updateTable(){
	// show loading symbol
	//document.getElementById("showAllMessages").innerHTML = ("<img src='assets/images/load.gif' width='100' height='100' />");
	
	$("#showAllMessages").empty();
	var userID = user_id;
	
	$.get('/updateTable',
		{'id': userID},
		function(data){
			/*var content = "<table border='1'>"+
				"<tr><td><b>ID</b></td><td><b>Text</b></td><td><b>enable</b></td><td><b>edit</b></td><td><b>delete</b></td><td><b>password</b></td></tr>";
			
			
			for(var i=0; i< data.length;i++){
				content = content + "<tr class='row'><td id='id" + i +"'>" + data[i].id + "</td>" +
											"<td>" + data[i].text + "</td>";
				
				if(data[i].enabled == false){
					content = content + "<td><input type='radio' onclick='enable("+i+")' /></td>";
				}else{
					content = content + "<td><input type='radio' onclick='disable("+i+")' checked='checked'/></td>";
				}
				
				content = content + "<td><a><img src='assets/images/edit.png' onclick='editMessage("+i+")'/></a></td>" + 
					"<td><img src='assets/images/delete.png' onclick='deleteMessage("+i+")'/></td>" + 
					"<td id='pw" + i + "'>"+data[i].password+"</td>";
				
				if (data[i].enabled == false) {
					content = content + "<td><button id='qr" + data[i].id + "/" + "' onclick='qr_code(id)' style='visibility: hidden' >Generate QR-Code</button></td></tr>";
				} else {
					content = content + "<td><button id='qr" + data[i].id + "/" + data[i].password + "' onclick='qr_code(id)' style='visibility: visible' >Generate QR-Code</button></td></tr>";
				}
				
			}
			
			/*$("#showAllMessages").append("</table>");*/
			//content = content + "</table>";
			
			// hide loading symbol
			//document.getElementById("edit").innerHTML = "";
			
			$("#showAllMessages").append(data);
			/* Akkordeon */
			$("#accordion").accordion({heightStyle: "content",
									   collapsible: true,
									   active: false});
	}).error(function(){
		alert("Error updateTable");
	});
}
/*
function loadMessages() {
	$.get(	'/loadMessages',
			{'id': user_id},
			function(data){
				// do nothing
			}
		).error(function(){
			alert("Error loadMessages");
		});
}
*/
function logout() {
	// delete cookie
	// set expire time to past
	document.cookie = 'uid=' + user_id + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
	// link to index
	location.href = "/";
}

function qr_code(id) {
	if (start_qr == 0) {
		qrcode.appendTo("body");
		bg_qr.appendTo("body");
	}
	
	// load new QR-Code  
	var pos1 = id.indexOf('/');
	q_id = id.slice(2, pos1);
	q_pw = id.slice(pos1+1);
	
	var qr = document.getElementById("qrcode_div");	        		
	
	// create QR
	$('#qrcode_div').qrcode({
		text    : window.location.hostname + "/getQuestion?id=" + q_id + "&pw=" + q_pw,
		render    : "canvas",
		background : "#ffffff",
		foreground : "#000000",
		width : 350,
		height: 350
	});
	
	// convert canvas to image
	var canvas = document.getElementsByTagName("canvas")[0];
	var img    = canvas.toDataURL("image/png");
	qr.innerHTML = "<img id='qrImg' src='" + img + "'/>";
	//<div><button onclick='download_qr()' id='qrButton'>Download Picture</button></div>"
	
	loadPopup(); // function show popup
}

function loadPopup() {
	if(popupStatus == 0) { 
		// show QR	    
		$("#qrcode_div").css("display","block");
	    $("#bg_trans_qr").css("display","block");
	    $("body").css("overflow-y","hidden");
	    //$("#backgroundPopup").css("opacity", "0.7");
	    popupStatus = 1;
	}
}

function disablePopup() {
    if(popupStatus == 1) { 
    	// hide QR
        $("#qrcode_div").css("display","none");
        $("#bg_trans_qr").css("display","none");
        $("body").css("overflow-y","visible");
        qrcode = $("#qrcode_div").detach();
		bg_qr = $("#bg_trans_qr").detach();
        popupStatus = 0;
        start_qr = 0;
    }
}

// Load groups for acutal user
function loadGroups() {
	$.post('/loadGroups',
			{'uid': user_id},
			function(data){
				var content = build_groups(data);
				if (edit_Mode) {
					$("#messageGroupsDiv").empty();
					last_num = num;
					var data_length = data.length;
					$("#messageGroupsDiv").append(content);
					var opt = document.getElementById('messageGroups').options;
					for(var i = 0; i < data_length; i++) {
						if (opt[i].text == group) {
							$("#messageGroups").prop("selectedIndex", i);
							break;
						}
					}
				} else {	
					$("#groups").empty();
					$("#groups").append(content);
				}
	});
}

// add new Group
function addGroup() {
	var groupName = window.prompt("Please enter a group name:", "");
	if (groupName != null) {
		$.post('/addGroup',
				{'uid': user_id,
				 'groupName': groupName},
				function(data){
					loadGroups();
		});
	}
}

// deletes the selected Group with all of its questions and answers for the actual user
function deleteSelectedGroup() {
	//var groupID = groupList[document.getElementById('groupsList').selectedIndex];
	var groupName;
	if (edit_Mode) {
		groupName = document.getElementById('messageGroups').options[document.getElementById('messageGroups').selectedIndex].text;
	} else {
		groupName =  document.getElementById('groupsList').options[document.getElementById('groupsList').selectedIndex].text;
	}
	var res = confirm("Are you sure you want to the delete this group with all it's questions?");
	if (res) {
		$.post('/deleteGroup',
			   {'uid': user_id,
			    'name': groupName},
			    function(data) {
				    if (edit_Mode) {
				 	   	editMessage(last_num);
				 	   	made_changes = true;
				    } else {
				    	loadGroups();
				    }
			    });
	}
}

function build_groups(data) {
	if (edit_Mode) {
		var content = "<select name='groupEdit' id='messageGroups' size='1'>";
	} else {
		var content = "<select name='group' id='groupsList' size='1'>";
	}
	for (var i = 0; i < data.length; i++) {
		content = content + "<option>" + data[i].name + "</option>";
		//groupList[i] = data[i].id;
	}
	content = content + "</select><div class='btn-group'>"
		+"<input class='btn' type='button' id='addAGroup' onclick='addGroup()' value='Add new group' />"
		+"<input class='btn' type='button' id='deleteGroup' onclick='deleteSelectedGroup()' value='Delete group' /></div>";
	return content;
}