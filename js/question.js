var q_id = "";
$(function() {
	q_id = storage.get("q_id");
	var q_pw = storage.get("q_pw");
	if (q_id != "") {
		check_Question(q_id, q_pw);
	} else {
		alert("Invalide option");
		var page = "../HTML/index.html";
		window.open(page, "_self");
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
						// link back to index.html
						var page = "../HTML/index.html";
						window.open(page, "_self");
						break;
					case 0:
						alert('You entered the wrong password for the ID  ' + q_id);
						// link back to index.html
						var page = "../HTML/index.html";
						window.open(page, "_self");
						break;
					case 1:
						alert('Question found! Click \'ok\' to see it.');
	  					get_answers(q_id);
						break;
					default:
						alert("Error! System wasn\'t able to get the Question. Please try again.");
				}
			}
	}).error(function() {
		alert("Error checking input!");
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
				var content = "Question: ";
				content = content + data_field[0].message + " <br>"
						  + "<button id=\"ans1\" onclick=\"sendAnswer(id)\">a: " + data_field[0].ans1 + "</button>"
						  + "<br><button id=\"ans2\" onclick=\"sendAnswer(id)\">b: " + data_field[0].ans2 + "</button>"
				if(data_field[0].ans3 != "") {
					content = content + "<br><button id=\"ans3\" onclick=\"sendAnswer(id)\">c: " + data_field[0].ans3 + "</button>";
				}
				if(data_field[0].ans4 != "") {
					content = content + "<br><button id=\"ans4\" onclick=\"sendAnswer(id)\">d: " + data_field[0].ans4 + "</button>";
				}
				if(data_field[0].ans5 != "") {
					content = content + "<br><button id=\"ans5\" onclick=\"sendAnswer(id)\">e: " + data_field[0].ans5 + "</button>";
				}
				if(data_field[0].ans6 != "") {
					content = content + "<br><button id=\"ans6\" onclick=\"sendAnswer(id)\">f: " + data_field[0].ans6 + "</button>";
				}

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
				alert("Vote successful!");

				storage.set("q_id", q_id);
				// Link to Timer-/Resultpage
				location.href = "result.html";
			}
	}).error(function() {
		alert("Error sending answer!");
	});
}