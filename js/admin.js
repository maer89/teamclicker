var editAnswers;
var j = 3;					
var i = 3;					
var user_id;
var msg;
var startedit = 1;
var edit;
var bg_edit;
var showedit = 1;
var qrcode;
var bg_qr;
var start_qr = 1;
var popupStatus = 0;
var edit_Mode;
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
		var page = "http://www.marcel-erath.de/clicker/index.html";
		window.open(page, "_self");
		return;
	}  
	
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
			//do nothing
		}
	});
	
	/*delete answer*/
	$("#delanswer").click(function(){
		if(i > 3){	
			i--;
			$test="answer"+i;
			$('div[id="'+$test+'"]').remove();
		}else{
			//do nothing
		}
	});
	
	/*show Messages*/
	$("#showMessage").click(function(){
		$("#showMessage").parent().addClass("active");
		$("#addMessage").parent().removeClass("active");
		$("#edit").empty();
		$("#newMessage").fadeOut("fast");
		updateTable();
		$("#showAllMessages").fadeIn();
		edit_Mode = true;
	});
	
	/*add Message*/
	$("#addMessage").click(function(){
		$("#addMessage").parent().addClass("active");
		$("#showMessage").parent().removeClass("active");
		$("#edit").empty();
		$("#newMessage").fadeIn();
		$("#showAllMessages").fadeOut();
		edit_Mode = false;
	});

	/*hide edit*/
	$("#bg_trans_edit").click(function(){
		$("#edit").css("display","none");
		$("#bg_trans_edit").css("display","none");
		$("body").css("overflow-y","visible");
		edit = $("#edit").detach();
		bg_edit = $("#bg_trans_edit").detach();
		startedit = 0;
		showedit = 0;
	});
	
	/*close result*/
	$("#bg_trans_qr").click(function(){
		disablePopup();
	});
	
	/*logout*/
	$("#logout").click(function() {
		$("#logout").parent().addClass("active");
		$("#addMessage").parent().removeClass("active");
		$("#showMessage").parent().removeClass("active");
		logout();
	})
});

/* logout */
function logout() {
	// delete cookie
	// set expire time to past
	document.cookie = 'uid=' + user_id + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
	// link to index
	location.href = "http://www.marcel-erath.de/clicker/index.html";
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
	
	$.ajax({
		type: 'POST',
		url: '../PHP/saveMessage.php',
		data: {
			'text': text,
			'userID': userID,
			'ans1': ans1,
			'ans2': ans2,
			'ans3': ans3,
			'ans4': ans4,
			'ans5': ans5,
			'ans6': ans6,
			'group': group
		},
		success: function(data) {
			document.getElementById("message").value = "";
			
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
		}
	});
}
/*enable message*/
function enable(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.ajax({
		type: 'POST',
		url: '../PHP/enable.php',
		data: {
			'id': messageID
		},
		success: function(data) {
			var data_field = $.parseJSON(data);
			updateTable();
		}
	});
}
/*disable message*/
function disable(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.ajax({
		type: 'POST',
		url: '../PHP/disable.php',
		data: {
			'id': messageID
		},
		success: function(data) {
			var data_field = $.parseJSON(data);
			updateTable();
		}
	});
}

/*delete message*/
function deleteMessage(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.ajax({
		type: 'POST',
		url: '../PHP/delete.php',
		data: {
			'id': messageID
		},
		success: function(data) {
			var data_field = $.parseJSON(data);
			updateTable();
		}
	});
}

/*reset answers to a specific message*/
function resetAnswers(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.ajax({
		type: 'POST',
		url:'../PHP/reset.php',
		data:{'id': messageID},
		success: function(data){
			//do nothing
		}
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
	var group = document.getElementById("id"+num).parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[2].outerText;
	var message;
	
	$("#edit").append("<form action='edit.php' method='POST'>" +
		"<div class='form'><label>Question: </label>" +
		"<textarea id='messageText' name='editedmessage' cols='35' rows='5'></textarea></div>" +
		"<div class='form'><label>Group:</label><div id='messageGroupsDiv'></div></div>"+
		"<div class='form'><label>Answers: </label>" +
		"<div id='editanswers'>" +
		"<div id='edit1'><input type='text' id='editedanswer1' name='editedanswer1'/></div>" +
		"<div id='edit2'><input type='text' id='editedanswer2' name='editedanswer2'/></div>");
	
	$.ajax({
		type: 'POST',
		url: '../PHP/getMessage.php',
		data: {
			'id': messageID
		},
		success: function(data) {
			message = $.parseJSON(data);
			document.getElementById("messageText").innerHTML = message;
		}
	});
	
	var idx;
	$.ajax({
		type: 'POST',
		url: '../PHP/loadGroups.php',
		data: {'uid': user_id},
		success: function (data){
			var content = build_groups(data);
			last_num = num;
			var data_length = data.length;
			$("#messageGroupsDiv").append(content);
			var opt = document.getElementById('groupsList').options;
			for(var i = 0; i < data_length; i++){
				if(opt[i].text == group){
					opt[i].setAttribute('selected','selected');
					break;
				}
			}
		}
	});
	
	$.ajax({
		type: 'POST',
		url: '../PHP/getAnswers.php',
		data: {
			'id': messageID
		},
		success: function(data) {
			editAnswers = 2;
			var data_field = $.parseJSON(data);
			document.getElementById("editedanswer1").value = data_field.ans1;
			document.getElementById("editedanswer2").value = data_field.ans2;
			
			if(data_field.ans3 == ""){
				//do nothing
			}else if(data_field.ans4 == ""){
				$("#edit").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				editAnswers = 3;
			}else if(data_field.ans5 == ""){
				$("#edit").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'><input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				document.getElementById("editedanswer4").value = data_field.ans4;
				editAnswers = 4;
			}else if(data_field.ans6 == ""){
				$("#edit").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'><input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#edit").append("<div id='edit5'><input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				document.getElementById("editedanswer4").value = data_field.ans4;
				document.getElementById("editedanswer5").value = data_field.ans5;
				editAnswers = 5;
			}else{
				$("#edit").append("<div id='edit3'><input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'><input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#edit").append("<div id='edit5'><input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				$("#edit").append("<div id='edit6'><input type='text' id='editedanswer6' name='editedanswer6'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				document.getElementById("editedanswer4").value = data_field.ans4;
				document.getElementById("editedanswer5").value = data_field.ans5;
				document.getElementById("editedanswer6").value = data_field.ans6;
				editAnswers = 6;
			}
			$("#edit").append("</div><input class='btn' type='button' onclick='addeditanswer()' id='addeditanswer' value='add answer' />"+
							"<input class='btn' type='button' onclick='deleditanswer()' id='deleditanswer' value='delete answer' />"+
							"<input class='btn' type='button' onclick='saveChanges("+num+")' value='save changes' /></form>");
			
			$("#edit").css("display","block");
			$("#bg_trans_edit").css("display","block");
			$("body").css("overflow-y","hidden");
			
			j = editAnswers + 1;
		}
	});
	
}


/*addeditanswer*/
function addeditanswer(){
	if(j <= 6 ){
		$("#editanswers").append("<div id='edit"+j+"'><input type='text' id='editedanswer" + j +"' name='editedanswer" + j +"' placeholder='Answer " + j + "' /></div>");
		j++;
	}else{
		//do nothing
	}
}
/*delete edit answer*/
function deleditanswer(){
	if(j > 3){	
		j--;
		$test="edit"+j;
		$('div[id="'+$test+'"]').remove();
	}else{
		//do nothing
	}
}

/*save changes*/
function saveChanges(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	var text = document.getElementById("messageText").value;
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
	
	$.ajax({
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
			updateTable();
		}
	});
}

/*update table*/
function updateTable(){
	$("#showAllMessages").empty();
	var userID = user_id;
	$.ajax({
		type: 'POST',
		url: 'updateTable.php',
		data: {
			'userID': userID
		},
		success: function(data){
			var data_field = $.parseJSON(data);
			var content = "<div id='accordion'>";
			var group = "";
			var firstTime = 1;
			
			for(var i=0; i< data_field.length;i++){
				if(data_field[i].messageGroup != group){
					group = data_field[i].messageGroup;
					if(firstTime == 1){
						content = content + "<h3>" + group + "</h3><div><p><table border='1' class='table table-hover'>"+
						"<tr><td><b>ID</b></td><td><b>Text</b></td><td><b>Enable</b></td><td><b>Edit</b></td><td><b>Delete</b></td><td><b>Reset</b></td><td><b>Password</b></td><td><b>Link</b></td><td><b>QR-Code</b></td><td><b>Result</b></td></tr>";
						firstTime = 0;
					}else{
						content = content + "</table></p></div><h3>" + group + "</h3><div><p><table border='1' class='table table-hover'>"+
						"<tr><td><b>ID</b></td><td><b>Text</b></td><td><b>Enable</b></td><td><b>Edit</b></td><td><b>Delete</b></td><td><b>Reset</b></td><td><b>Password</b></td><td><b>Link</b></td><td><b>QR-Code</b></td><td><b>Result</b></td></tr>";
					}
				}
				
				content = content + "<tr><td id='id" + i +"'>" + data_field[i].id + "</td>" +
											"<td>" + data_field[i].message + "</td>";
				
				if(data_field[i].enable == 0){
					content = content + "<td><input type='radio' onclick='enable("+i+")' /></td>";
				}else{
					content = content + "<td><input type='radio' onclick='disable("+i+")' checked='checked'/></td>";
				}
				
				content = content + "<td><a onclick='editMessage("+i+")'><i class='icon-pencil'></i></a></td>" + 
					"<td><a onclick='deleteMessage("+i+")'><i class='icon-trash'></i></a></td>" + 
					"<td><a onclick='resetAnswers("+i+")'><i class='icon-refresh'></i></a></td>" +
					"<td>"+data_field[i].pw+"</td>";

				if (data_field[i].enable != 0) {
					content = content + "<td><a href='" + window.location.origin + "/clicker/HTML/question.html?id=" + data_field[i].id + "&pw=" + data_field[i].pw
							  + "' >" + window.location.origin + "/clicker/HTML/question.html?id=" + data_field[i].id + "&pw=" + data_field[i].pw
							  + "</a></td>";
				} else {
					content = content + "<td> - </td>";
				}
					
				if(data_field[i].enable != 0){
					content = content + "<td><a id='qr" + data_field[i].id + "/" + data_field[i].pw + "' onclick='qr_code(id)' style='visibility: visible' ><i class='icon-qrcode'></i></a></td>";
				}else{
					content = content + "<td><a id='qr" + data_field[i].id + "/" + "' onclick='qr_code(id)' style='visibility: hidden' ><i class='icon-qrcode'></i></a></td>";
				}	
				
				content = content + "<td><a onclick='result("+i+")'><i class='icon-align-left'></i></a></td></tr>";
			}
			
			
				content = content + "</table></p></div></div>";
				
				$("#showAllMessages").append(content);
				
				$("#accordion").accordion({heightStyle: "content",
											collapsible:true,
											active:false});
		}
	}).error(function(){
		alert("Error updateTable");
	});
}

/*QR-Code*/
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
		text    : "http://marcel-erath.de/clicker/HTML/question.html?id=" + q_id + "&pw=" + q_pw,
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
	
	loadPopup();
}

function loadPopup() {
	if(popupStatus == 0) { 
		// show QR	    
		$("#qrcode_div").css("display","block");
	    $("#bg_trans_qr").css("display","block");
	    $("body").css("overflow-y","hidden");
	    popupStatus = 1;
	}
}

function disablePopup() {
    if(popupStatus == 1) { 
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
	$("#groups").empty();
	$.ajax({
		type: 'POST',
		url: 'loadGroups.php',
		data: {'uid': user_id},
		success:function(data){
				var content = build_groups(data);
				$("#groups").append(content);
		}
	});
}

// add new Group
function addGroup() {
	var groupName = window.prompt("Please enter a group name:", "");
	$.ajax({
		type: 'POST',
		url: 'addGroup.php',
		data:{'uid': user_id,
			 'groupName': groupName},
		success:function(data){
				loadGroups();
		}
	});
}

function deleteSelectedGroup() {
	var groupName =  document.getElementById('groupsList').options[document.getElementById('groupsList').selectedIndex].text;
	var res = confirm("Are you sure you want to the delete this group with all it's questions?");
	if (res) {
		$.ajax({
			type: 'POST',
			url: 'deleteGroup.php',
			data:
			   {'uid': user_id,
			    'name': groupName},
			success: function(data) {
				    if (edit_Mode) {
				 	    editMessage(last_num);
				    } else {
				    	loadGroups();
				    }
			}
		});
	}
}

function build_groups(data) {
	var data_field = $.parseJSON(data);
	if (edit_Mode) {
		var content = "<select name='groupEdit' id='messageGroups' size='1'>";
	} else {
		var content = "<select name='group' id='groupsList' size='1'>";
	}
	for (var i = 0; i < data_field.length; i++) {
		content = content + "<option>" + data_field[i].name + "</option>";
	}
	content = content + "</select><div class='btn-group'>"
		+"<input class='btn' type='button' id='addAGroup' onclick='addGroup()' value='Add new group' />"
		+"<input class='btn' type='button' id='deleteGroup' onclick='deleteSelectedGroup()' value='Delete group' /></div>";
	return content;
}