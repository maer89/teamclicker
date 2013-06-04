var editAnswers;
var j = 3;					/*to add or delete edited answers*/
var i = 3;					/*to add or delete answers*/
var user_id;
var msg;
$(document).ready(function(){	
	// not in use --> new code beneath
	//*start* get the UserID
	/*user_id = -1;
	
	var params = decodeURI(document.URL);
	var pos = params.indexOf('=');
	if (pos != -1) {
		// no "=" found in string
		pos++;
		user_id = params.slice(pos);
	}
	
	if (user_id == -1) {
		alert("You\'re not allowed to enter this site!");
		var page = "../HTML/index.html";
		window.open(page, "_self");
	}  */
	//*end*
	
	// get the userID from storage
	user_id = storage.get("user_id");
	if (user_id == "") {
		alert("Invalide option");
		var page = "../HTML/index.html";
		window.open(page, "_self");
	} else {
		storage.set("user_id", "");
	}
	
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
			alert("Es können nicht mehr Antworten entfernt werden");
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
	});
	
	/*add Message*/
	$("#addMessage").click(function(){
		$("#addMessage").parent().addClass("active");
		$("#showMessage").parent().removeClass("active");
		$("#edit").empty();
		$("#newMessage").fadeIn();
		$("#showAllMessages").fadeOut();
	});
	
	$(".row").click(function(){
		$(".row").css("background","white");
		$(".row").css("color","black");
		$(this).css("background","black");
		$(this).css("color","white");
		$(this).getElementBy
	});			
});

/*save message*/
function saveMessage(){
	var text = document.getElementById("message").value;
	var userID = user_id;
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
		alert("hier");
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
			'ans6': ans6
		},
		success: function(data) {
			alert("message saved");
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
			alert("message enabled");
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
			alert("message disabled");
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
			alert("message delete");
			updateTable();
		}
	});
}
/*edit message*/
function editMessage(num){
	if(document.getElementById("edit").innerHTML != ""){
		$("#edit").empty();
	}

	var messageID = document.getElementById("id"+num).innerHTML;
	var message;
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
	
	$("#edit").append("<form action='edit.php' method='POST'>" +
		"<p>Message:<br />" +
		"<textarea id='messageText' name='editedmessage' cols='35' rows='5'></textarea>" +
		"</p><p>Answers:<br />" +
		"<div id='editanswers'>" +
		"<div id='edit1'>Answer 1<input type='text' id='editedanswer1' name='editedanswer1'/></div>" +
		"<div id='edit2'>Answer 2<input type='text' id='editedanswer2' name='editedanswer2'/></div>");
		
	
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
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				editAnswers = 3;
			}else if(data_field.ans5 == ""){
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				document.getElementById("editedanswer4").value = data_field.ans4;
				editAnswers = 4;
			}else if(data_field.ans6 == ""){
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#edit").append("<div id='edit5'>Answer 5<input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				document.getElementById("editedanswer4").value = data_field.ans4;
				document.getElementById("editedanswer5").value = data_field.ans5;
				editAnswers = 5;
			}else{
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#edit").append("<div id='edit5'>Answer 5<input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				$("#edit").append("<div id='edit6'>Answer 6<input type='text' id='editedanswer6' name='editedanswer6'/></div>");
				document.getElementById("editedanswer3").value = data_field.ans3;
				document.getElementById("editedanswer4").value = data_field.ans4;
				document.getElementById("editedanswer5").value = data_field.ans5;
				document.getElementById("editedanswer6").value = data_field.ans6;
				editAnswers = 6;
			}
			$("#edit").append("</div><p><input type='button' onclick='addeditanswer()' id='addeditanswer' value='add answer' />"+
							"<input type='button' onclick='deleditanswer()' id='deleditanswer' value='delete answer' />"+
							"<input type='button' onclick='saveChanges("+num+")' value='save changes' /></p></form>");
			
			j = editAnswers + 1;
		}
	});
	
}


/*addeditanswer*/
function addeditanswer(){
	if(j <= 6 ){
		$("#editanswers").append("<div id='edit"+j+"'>Answer " + j + "<input type='text' id='editedanswer" + j +"' name='editedanswer" + j +"' /></div>");
		j++;
	}else{
		alert("max. Anzahl von Antworten erreicht");
	}
}
/*delete edit answer*/
function deleditanswer(){
	if(j > 3){	
		//$(".ans").has("name='answer3'").remove();
		j--;
		$test="edit"+j;
		$('div[id="'+$test+'"]').remove();
	}else{
		alert("Es können nicht mehr Antworten entfernt werden");
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
			alert("changes saved");
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
			var content = "<table border='1' class='table table-hover'>"+
				"<tr><td><b>ID</b></td><td><b>userID</b></td><td><b>Text</b></td><td><b>enable</b></td><td><b>edit</b></td><td><b>delete</b></td><td><b>password</b></td><td><b>result</b></td></tr>";
			
			for(var i=0; i< data_field.length;i++){
				content = content + "<tr><td id='id" + i +"'>" + data_field[i].id + "</td>" +
											"<td>" + data_field[i].userID + "</td>" +
											"<td>" + data_field[i].message + "</td>";
				
				if(data_field[i].enable == 0){
					content = content + "<td><input type='radio' onclick='enable("+i+")' /></td>";
				}else{
					content = content + "<td><input type='radio' onclick='disable("+i+")' checked='checked'/></td>";
				}
				
				content = content + "<td><a onclick='editMessage("+i+")'><i class='icon-pencil'></i></a></td>" + 
					"<td><a onclick='deleteMessage("+i+")'><i class='icon-trash'></i></a></td>" + 
					"<td>"+data_field[i].pw+"</td>" +
					"<td><button onclick='result("+i+")'>show result</button></td></tr>";
			}
			
			/*$("#showAllMessages").append("</table>");	*/
				content = content + "</table>";
				
				$("#showAllMessages").append(content);
		}
	}).error(function(){
		alert("hier");
	});
}
