$(function() {
	var c = document.cookie;
	var visited = 0;
	var pos = c.indexOf(q_id);
	if (pos != -1) {
		alert("You have already voted for this question!");
		var page = "/";
		window.open(page, "_self");
		return;
	}

	if (q_id != "") {
		check_Question(q_id, q_pw);
	} else {
		alert("Invalide option");
		var page = "/";
		window.open(page, "_self");
		return;
	}
});

function check_Question(q_id, q_pw) {
  	$.post("/checkQuestion",
			{'id': q_id,
			 'pw': q_pw
			},
   			function(data) {
				var data_field = $.parseJSON(data);
				switch(data_field) {
					case -1:
						alert('Question doesn\'t exist or isn\'t enabled!');
						// link back to question
						var page = "/question";
						window.open(page, "_self");
						break;
					case 0:
						alert('You entered the wrong password for the ID  ' + q_id);
						// link back to question
						var page = "/question";
						window.open(page, "_self");
						break;
					case 1:
	  					get_answers(q_id);
						break;
					default:
						alert("Error! System wasn\'t able to get the Question. Please try again.");
				}
			}
	).error(function() {
		alert("Error checking Question!");
	});
}

function get_answers(q_id) {
	$.post('/getAnswers',
		   {'id': q_id},
   		   function(data) {
				var content = "<h3>" + data[6].text + "</h3>"
						  + "<div class='btn-group btn-group-vertical ansbutton'>";
				if (data[0].text != '') {
					content = content + "<button class='btn btn-block' id=\"1\" onclick=\"sendAnswer(id)\">a: " + data[0].text + "</button>";
				}
				if (data[1].text != '') {
					content = content + "<button class='btn btn-block' id=\"2\" onclick=\"sendAnswer(id)\">b: " + data[1].text + "</button>";
				}
				if(data[2].text != '') {
					content = content + "<button class='btn btn-block' id=\"3\" onclick=\"sendAnswer(id)\">c: " + data[2].text + "</button>";
				}
				if(data[3].text != '') {
					content = content + "<button class='btn btn-block' id=\"4\" onclick=\"sendAnswer(id)\">d: " + data[3].text + "</button>";
				}
				if(data[4].text != '') {
					content = content + "<button class='btn btn-block' id=\"5\" onclick=\"sendAnswer(id)\">e: " + data[4].text + "</button>";
				}
				if(data[5].text != '') {
					content = content + "<button class='btn btn-block' id=\"6\" onclick=\"sendAnswer(id)\">f: " + data[5].text + "</button>";
				}
				
				content = content + "</div>";

				var html_element = document.getElementById('question_and_Answers');
				html_element.innerHTML = content;
			}
	).error(function() {
		alert("Error while getting Question!");
	});
}

function sendAnswer(id) {
	$.post(	'/sendAnswer',
			{
			'answer': id,
			'q_id': q_id
			},
   			function(data) {
				// that only one vote is possible --> set cookie
				var expire = new Date();
				var in12hours = expire.getTime() + (12 * 60 * 60 * 1000);
				expire.setTime(in12hours);
				document.cookie = q_id + "=visited" + "; expires=" + expire.toGMTString();
				// set storage
				storage.set("q_id", q_id);
				// Link to resultpage
				location.href = "/result";
			}
	).error(function() {
		alert("Error sending answer!");
	});
}