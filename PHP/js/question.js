var q_id = "";
var q_pw = "";

$(function() {
	var url = document.URL;
	var pos1 = url.indexOf("=")
	var pos2 = url.lastIndexOf("=");
	
	q_id = url.slice(pos1+1, pos2-3);;
	q_pw = url.slice(pos2+1);
	var c = document.cookie;
	var visited = 0;
	var pos = c.indexOf(q_id);
	if (pos != -1) {
		alert("You have already voted for this question!");
		var page = "../index.php";
		window.open(page, "_self");
		return;
	}
	if (q_id != "") {
		check_Question(q_id, q_pw);
	} else {
		alert("Invalide option");
		var page = "../index.php";
		window.open(page, "_self");
		return;
	}
  	storage.set("q_id", "");
	storage.set("q_pw", "");
});


function check_Question(q_id, q_pw) {
  	$.ajax({
			type: 'POST',
			url: '../PHP/check_Question.php',
			data: {
				'id': q_id,
				'pw': q_pw
			},
   			success: function(data) {
				var data_field = $.parseJSON(data);
				switch(data_field) {
					case -1:
						alert('Question doesn\'t exist or isn\'t enabled!');
						// link back to index.php
						var page = "../index.php";
						window.open(page, "_self");
						break;
					case 0:
						alert('You entered the wrong password for the ID  ' + q_id);
						// link back to index.php
						var page = "../index.php";
						window.open(page, "_self");
						break;
					case 1:
	  					get_answers(q_id);
						break;
					default:
						alert("Error! System wasn\'t able to get the Question. Please try again.");
				}
			}
	}).error(function() {
		alert("Error checking Question!");
	});
}

function get_answers(q_id) {
	$.ajax({
			type: 'POST',
			url: '../PHP/select_Question.php',
			data: {
				'id': q_id
			},
   			success: function(data) {
				var data_field = $.parseJSON(data);
				var content = "<h3>" + data_field[0].message + " </h3>"
						  + "<div class='btn-group btn-group-vertical ansbutton'>"
						  + "<button class='btn btn-block' id=\"ans1\" onclick=\"sendAnswer(id)\">a: " + data_field[0].ans1 + "</button>"
						  + "<button class='btn btn-block' id=\"ans2\" onclick=\"sendAnswer(id)\">b: " + data_field[0].ans2 + "</button>"
				if(data_field[0].ans3 != "") {
					content = content + "<button class='btn btn-block' id=\"ans3\" onclick=\"sendAnswer(id)\">c: " + data_field[0].ans3 + "</button>";
				}
				if(data_field[0].ans4 != "") {
					content = content + "<button class='btn btn-block' id=\"ans4\" onclick=\"sendAnswer(id)\">d: " + data_field[0].ans4 + "</button>";
				}
				if(data_field[0].ans5 != "") {
					content = content + "<button class='btn btn-block' id=\"ans5\" onclick=\"sendAnswer(id)\">e: " + data_field[0].ans5 + "</button>";
				}
				if(data_field[0].ans6 != "") {
					content = content + "<button class='btn btn-block' id=\"ans6\" onclick=\"sendAnswer(id)\">f: " + data_field[0].ans6 + "</button>";
				}
				
				content = content + "</div>";

				var html_element = document.getElementById('question_and_Answers');
				html_element.innerHTML = content;
			}
	}).error(function() {
		alert("Error while getting Question!");
	});
}

function sendAnswer(id) {
	$.ajax({
			type: 'POST',
			url: '../PHP/send_answer.php',
			data: {
				'answer': id,
				'q_id': q_id
			},
   			success: function(data) {
				var expire = new Date();
				var in12hours = expire.getTime() + (12 * 60 * 60 * 1000);
				expire.setTime(in12hours);
				document.cookie = q_id + "=visited" + "; expires=" + expire.toGMTString();
				storage.set("q_id", q_id);
				// Link to Timer-/Resultpage
				location.href = "result.php";
			}
	}).error(function() {
		alert("Error sending answer!");
	});
}

