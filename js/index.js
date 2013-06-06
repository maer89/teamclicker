$(function() {
 	$('#btn_login').click(function() {
		var user_name = document.getElementById("user").value;
		var pw =  document.getElementById("password").value
		login_ftn(user_name, pw);
 	});

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
  	$.ajax({
			type: 'POST',
			url: './PHP/index_login.php',
			data: {
				'user': user,
				'pw': pw
			},
   			success: function(data) {
				var data_field = $.parseJSON(data);
				if ((data_field != -1) && (data_field >= 1)) {
					alert('Welcome ' + user + '!');
  					storage.set("user_id", data_field);
	 				location.href = "./PHP/admin.php";
				} else {
					alert('Wrong username or password');
				}
			}
	}).error(function() {
		alert("Error during Login");
	});
}

function get_Question() {
	var id = document.getElementById("q_id").value;
	var pw = document.getElementById("q_pw").value;
	location.href = "./HTML/question.html?id="+id+"&pw="+pw;
}