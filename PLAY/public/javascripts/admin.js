var editAnswers;
var j = 3;					/*to add or delete edited answers*/
var i = 3;					/*to add or delete answers*/
var user_id = -1;
$(document).ready(function(){	
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
	loadMessages();
	
	$("#showAllMessages").hide();
	
	/*add answer*/
	$("#addanswer").click(function(){
		if(i <= 6 ){
			$("#answers").append("<div id='answer" + i + "'>Answer " + i + " <input type='text' name='answer" + i +"' id='answerText" + i + "' /></div>");
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
		$("#edit").empty();
		$("#newMessage").hide();
		updateTable();
		$("#showAllMessages").show();
	});
	
	/*add Message*/
	$("#addMessage").click(function(){
		$("#edit").empty();
		$("#newMessage").show();
		$("#showAllMessages").hide();
	});
	
	$(".row").click(function(){
		$(".row").css("background","white");
		$(".row").css("color","black");
		$(this).css("background","black");
		$(this).css("color","white");
		$(this).getElementBy
	});		
	
	$("#logout").click(function() {
		logout();
	})

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
		 'userID': user_id},
		function(data){
			alert("message saved");
			document.getElementById("message").value = "";
			document.getElementById("answerText1").value = "";
			document.getElementById("answerText2").value = "";
			document.getElementById("answerText3").value = "";
			document.getElementById("answerText4").value = "";
			document.getElementById("answerText5").value = "";
			document.getElementById("answerText6").value = "";
	});
}
/*enable message*/
function enable(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.get('/enable',
		{'id': messageID},
		function(data){
			alert("Message " + messageID + " enabled password: " + data.password);
			updateTable();
	});
	
	// show QR-Button
	var s = 'qr' + messageID;
	document.getElementById(s).style.visibility = "visible";
}
/*disable message*/
function disable(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.get('/disable',
		{'id': messageID},
		function(data){
			alert("Message " + messageID + " disabled");
			updateTable();
	});
	
	// hide QR-Button
	var s = 'qr' + messageID;
	document.getElementById(s).style.visibility = "hidden";
}

/*delete message*/
function deleteMessage(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	$.get('/delete',
		{'id': messageID},
		function(data){
			//do nothing
			alert("Message " + messageID + " delete");
			updateTable();
	});
}
/*edit message*/
function editMessage(num){
	if(document.getElementById("edit").innerHTML != ""){
		$("#edit").empty();
	}

	var messageID = document.getElementById("id"+num).innerHTML;
	var message;
	$.get('/getMessage',
		{'id': messageID},
		function(data){
			document.getElementById("messageText").innerHTML = data.text;
	});
	
	$("#edit").append("<form action='edit.php' method='POST'>" +
		"<p>Message:<br />" +
		"<textarea id='messageText' name='editedmessage' cols='35' rows='5'></textarea>" +
		"</p><p>Answers:<br />" +
		"<div id='editanswers'>" +
		"<div id='edit1'>Answer 1<input type='text' id='editedanswer1' name='editedanswer1'/></div>" +
		"<div id='edit2'>Answer 2<input type='text' id='editedanswer2' name='editedanswer2'/></div>");
		
	$.post('/getAnswers',
		{'id': messageID},
		function(data){
			editAnswers = 2;
			var data_field="";
			document.getElementById("editedanswer1").value = data[0].text;
			document.getElementById("editedanswer2").value = data[1].text;
			
			if(data[2].text == ""){
				//do nothing
			}else if(data[3].text == ""){
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				editAnswers = 3;
			}else if(data[4].text == ""){
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				document.getElementById("editedanswer4").value = data[3].text;
				editAnswers = 4;
			}else if(data[5].text== ""){
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#edit").append("<div id='edit5'>Answer 5<input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				document.getElementById("editedanswer4").value = data[3].text;
				document.getElementById("editedanswer5").value = data[4].text;
				editAnswers = 5;
			}else{
				$("#edit").append("<div id='edit3'>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
				$("#edit").append("<div id='edit4'>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
				$("#edit").append("<div id='edit5'>Answer 5<input type='text' id='editedanswer5' name='editedanswer5'/></div>");
				$("#edit").append("<div id='edit6'>Answer 6<input type='text' id='editedanswer6' name='editedanswer6'/></div>");
				document.getElementById("editedanswer3").value = data[2].text;
				document.getElementById("editedanswer4").value = data[3].text;
				document.getElementById("editedanswer5").value = data[4].text;
				document.getElementById("editedanswer6").value = data[5].text;
				editAnswers = 6;
			}
			$("#edit").append("</div><p><input type='button' onclick='addeditanswer()' id='addeditanswer' value='add answer' />"+
							"<input type='button' onclick='deleditanswer()' id='deleditanswer' value='delete answer' />"+
							"<input type='button' onclick='saveChanges("+num+")' value='save changes' /></p></form>");
			
			j = editAnswers + 1;
	});
}


/*addeditanswer*/
function addeditanswer(){
	if(j <= 6 ){
		$("#editanswers").append("<div id='edit"+j+"'>Answer " + j + "<input type='text' id='editedanswer" + j +"' name='editedanswer" + j +"' /></div>");
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
		alert("Es k�nnen nicht mehr Antworten entfernt werden");
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
	
	$.get('/saveChanges',
		{'id': messageID,
		'text': text,
		'ans1': ans1,
		'ans2': ans2,
		'ans3': ans3,
		'ans4': ans4,
		'ans5': ans5,
		'ans6': ans6},
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
}

/*update table*/
function updateTable(){
	$("#showAllMessages").empty();
	var userID = user_id;
	
	$.get('/updateTable',
		{'id': userID},
		function(data){
			var content = "<table border='1'>"+
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
					"<td>"+data[i].password+"</td>";
				
				if (data[i].enabled == false) {
					content = content + "<td><button id='qr" + data[i].id + "/" + data[i].password + "' onclick='qr_code(id)' style='visibility: hidden' >Generate QR-Code</button></td></tr>";
				} else {
					content = content + "<td><button id='qr" + data[i].id + "/" + data[i].password + "' onclick='qr_code(id)' style='visibility: visible' >Generate QR-Code</button></td></tr>";
				}
				
			}
			
			/*$("#showAllMessages").append("</table>");*/
				content = content + "</table>";
				
				$("#showAllMessages").append(content);
			
	}).error(function(){
		alert("Error");
	});
}

function loadMessages() {
	$.get(	'/loadMessages',
			{'id': user_id},
			function(data){
				// do nothing
			}
		).error(function(){
			alert("Error");
		});
}

function logout() {
	// delete cookie
	// set expire time to past
	document.cookie = 'uid=' + user_id + "meinwert; expires=Thu, 01-Jan-70 00:00:01 GMT;";
	// link to index
	location.href = "/";
}

function qr_code(id) {
	// delete content of qrcode-div
	var qr = document.getElementById("qrcode");
	// load new QR-Code  
	var pos1 = id.indexOf('/');
	q_id = id.slice(2, pos1);
	q_pw = id.slice(pos1+1);
	
	// google chart api 
	//var s = "'localhost:9000/getQuestion?id=" + q_id + "&pw=" + q_pw + "'";
	//var s2 = "<img src=\"https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=" + s + "\" alt=\"QR-Code\" width=\"250\" height=\"250\" />"
	
	qr.innerHTML = '';
	
	//q_id = id;
	//q_pw = password;
	
	$('#qrcode').qrcode({
        text    : "localhost:9000/getQuestion?id=" + q_id + "&pw=" + q_pw,
        render    : "canvas",  // 'canvas' or 'table'. Default value is 'canvas'
        background : "#ffffff",
        foreground : "#000000",
        width : 250,
        height: 250
    });
}