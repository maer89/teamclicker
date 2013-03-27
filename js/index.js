$(function() {
 	$('#btn_login').click(function() {
		var user_name = document.getElementById("user").value;
		var pw =  document.getElementById("password").value
		login_ftn(user_name, pw);
 	});
 	$('#btn_get_q').click(function() {
		var q_id = document.getElementById("q_id").value;
		var q_pw =  document.getElementById("q_password").value
		get_Questionq_pw(q_id, q_pw);
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

function get_Questionq_pw(q_id, q_pw) {
  	$.ajax({
			type: 'POST',
			url: '../PHP/select_Question.php',
			data: {
				'id': q_id,
				'pw': q_pw
			},
   			success: function(data) {
				var data_field = $.parseJSON(data);
				alert(data_field);
			}
	}).error(function() {
		alert("Error during Login");
	});
}