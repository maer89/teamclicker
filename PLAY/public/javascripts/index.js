$(function() {
 	$('#btn_login').click(function() {
		var user_name = document.getElementById("user").value;
		var pw =  document.getElementById("password").value
		login_ftn(user_name, pw);
 	});

	// not in use at the moment
	// Click events for Login- and Get-Question-Button
	/*
 	$('#btn_get_q').click(function() {
		var q_id = document.getElementById("q_id").value;
		var q_pw =  document.getElementById("q_password").value
		get_Question(q_id, q_pw);
 	});
	 */

	// event for return-button for login and get question
    $("#q_password").keyup(function(event){
       if(event.keyCode == 13){
			var q_id = document.getElementById("q_id").value;
			var q_pw =  document.getElementById("q_password").value
			check_Question(q_id, q_pw);
       }
    });
    
    $("#password").keyup(function(event){
       if(event.keyCode == 13){
	 		var user_name = document.getElementById("user").value;
			var pw =  document.getElementById("password").value
			login_ftn(user_name, pw);
       }
    });
});

function login_ftn(user, pw) {
	if (navigator.cookieEnabled == false) {
		alert("Bitte aktivieren Sie Ihre Cookies,\n da der Vorgang sonst nicht fortgesetzt werden kann.");
		return;
	}
	$.post( '/login',
			{
				'user': user,
				'pw': pw
			},
   			function(data) {
				var data_field = $.parseJSON(data);
				if ((data_field != -1) && (data_field >= 1)) {
					alert('Welcome ' + user + '!');
					// set cookie for login
					var expire = new Date();
					var in1hour = expire.getTime() + (1 * 60 * 60 * 1000);
					expire.setTime(in1hour);
					document.cookie = "uid=" + data_field + "; expires=" + expire.toGMTString();
  					location.href = "/adminarea";
				} else {
					alert('Wrong username or password');
				}
			}
	).error(function() {
		alert("Error during Login");
	});
}

function get_Question() {
	var id = document.getElementById("q_id").value;
	var pw = document.getElementById("q_pw").value;
	location.href = "/getQuestion?id=" + id + "&pw=" + pw;
}