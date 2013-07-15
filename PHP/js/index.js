var startReg = 1;
var popupStatReg = 0;
var reg;
var bg_reg;

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
	
	/* Register */
    $("#btn_register").click(function(event){
    	showRegForm();
     });
    
    $("#bg_trans_register").click(function(){
		hideRegForm();
	});
    
    $(this).keyup(function(event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
        	hideRegForm();
        }
	});
    
    $("#btn_reg_cancel").click(function(){
		hideRegForm();
	});
    
    $("#btn_reg_confirm").click(function(){
    	// check if passwords are equal
    	var pass1 = document.getElementById("reg_pas").value;
    	var pass2 = document.getElementById("reg_pas2").value;
    	var email = document.getElementById("reg_email").value;
    	var userName = document.getElementById("reg_username").value;
    	if (pass1 === pass2) {
    		// passwords are equal
    		if (checkEmail(email)) {
    			if(checkUsername(userName)) {
    				// everything is fine --> write user to DB
    				writeUserToDB(userName, email, pass1);
    			} else {
    				alert("Username already in use");
    			}
    		} else {
    			alert("Email already in use");
    		}
    	} else {
    		// difference between passwords
    		alert("Passwords should be equal!");
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
  					// set cookie for login
					var expire = new Date();
					var in1hour = expire.getTime() + (1 * 60 * 60 * 1000);
					expire.setTime(in1hour);
					document.cookie = 'uid=' + data_field + '; expires=' + expire.toGMTString();
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
	location.href = "./PHP/question.php?id="+id+"&pw="+pw;
}


/* Register */
function showRegForm() {
	if(startReg == 0){
		reg.appendTo("body");
		bg_reg.appendTo("body");
	}
	if (popupStatReg == 0) {
		$("#register_form").css("display","block");
		$("#bg_trans_register").css("display","block");
		$("body").css("overflow-y","hidden");
		popupStatus = 1;
	}
}

function hideRegForm() {
    if (popupStatReg == 0) {
    	$("#register_form").css("display","none");
    	$("#bg_trans_register").css("display","none");
    	$("body").css("overflow-y","visible");
    	reg = $("#register_form").detach();
    	bg_reg = $("#bg_trans_register").detach();
    	popupStatReg = 0;
    	startReg = 0;
    }
}

function checkEmail(email) {
	var res = -1;
	$.ajax({
		type: 'POST',
        url: "./PHP/checkEmail.php",
        async: false,
        data: {mail: email},
        type: "POST",
        success: function(data) {
			data_field = $.parseJSON(data);
        	res = data_field[0].res;
        }
	}).error(function() {
		alert("Error on checking email for registration!");
	});
	if (res == 1) {
		return true;
	} else {
		return false;
	}
}

function checkUsername(userName) {
	var res = -1;
	$.ajax({
		type: 'POST',
        url: "./PHP/checkUsername.php",
        async: false,
        data: {name: userName},
        success: function(data) {
			data_field = $.parseJSON(data);
        	res = data_field[0].res; 
        }
	}).error(function() {
		alert("Error on checking username for registration!");
	});
	if (res == 1) {
		return true;
	} else {
		return false;
	}
}

function writeUserToDB(userName, email, pass) {
	$.ajax({
		type: 'POST',
		url: './PHP/writeUserToDB.php',
		data:{'name': userName,
		    'mail': email,
		    'pass': pass},
		success: function(data){
			   alert("You can now login!");
			   hideRegForm();
		}
	});
}