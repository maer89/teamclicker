$(function() {
 	$('#btn_login').click(function() {
		var user_name = document.getElementById("user").value;
		var pw =  document.getElementById("password").value
		login_ftn(user_name, pw);
 	});
 	$('#btn_get_q').click(function() {
		var q_id = document.getElementById("q_id").value;
		var q_pw =  document.getElementById("q_password").value
		get_Question(q_id, q_pw);
 	});
});

function login_ftn(user, pw) {
  	$.ajax({
			type: 'POST',
			url: '../PHP/index_login.php',
			data: {
				'user': user,
				'pw': pw
			},
   			success: function(data) {
				var data_field = $.parseJSON(data);
				if ((data_field != -1) && (data_field >= 1)) {
					alert('Welcome ' + user + '!');
					var page = "../PHP/admin.php?user_id=" + data_field;
					window.open(page, "_self");
				} else {
					alert('Wrong username or password');
				}
			}
	}).error(function() {
		alert("Error during Login");
	});
}

function get_Question(q_id, q_pw) {
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
						break;
					case 0:
						alert('You entered the wrong password for the ID  ' + q_id);
						break;
					case 1:
						alert('Question found! Click \'ok\' to see it.');
						get_Answers(q_id);
						break;
					default:
						alert("Error! System wasn\'t able to get the Question. Please try again.");
				}
			}
	}).error(function() {
		alert("Error during Login");
	});
}

function get_Answers(q_id) {
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
						  + "a: " + data_field[0].ans1
						  + "<br>b: " + data_field[0].ans2
						  + "<br>c: " + data_field[0].ans3
						  + "<br>d: " + data_field[0].ans4
						  + "<br>e: " + data_field[0].ans5
						  + "<br>f: " + data_field[0].ans6;
				var html_element = document.getElementById('question_and_Answers');
				html_element.innerHTML = content;
			}
	}).error(function() {   });
}