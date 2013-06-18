var startReg = 1;
var popupStatReg = 0;
var reg;
var bg_reg;

$(function() {
 	// focus first edit element
	// get actual URL
	var url = document.URL;
	var pos = url.lastIndexOf("/");
	var site = url.slice(pos+1);
	if (site == 'question') {
		document.getElementById("q_id").focus();
	} else if (site == 'admin') {
		document.getElementById("user").focus();
	}
	
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
    	// show form for registration
    	showRegForm();
     });
    
    $("#bg_trans_register").click(function(){
    	// hide form for registration
		hideRegForm();
	});
    
    $(this).keyup(function(event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
        	hideRegForm();
        }
	});
    
    $("#btn_reg_cancel").click(function(){
    	// hide form for registration
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
    /* Register End */
});

function login_ftn(user, pw) {
	if (navigator.cookieEnabled == false) {
		alert("Please activate your cookies!");
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
        url: "/checkEmail",
        async: false,
        data: {mail: email},
        datatype: "json",
        type: "POST",
        success: function(data) {
        	res = $.parseJSON(data); 
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
        url: "/checkUsername",
        async: false,
        data: {name: userName},
        datatype: "json",
        type: "POST",
        success: function(data) {
        	res = $.parseJSON(data); 
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
	$.post('/writeUserToDB',
		   {'name': userName,
		    'mail': email,
		    'pass': pass},
		   function(data){
			   hideRegForm();
		   });
}