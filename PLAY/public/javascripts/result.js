var q_id = "";
$(function() {
	// get QuestionID
	q_id = storage.get("q_id");
	if (q_id != "") {
	} else {
		alert("Invalide option");
		var page = "../HTML/index.html";
		window.open(page, "_self");
	}
	storage.set("q_id", "");
	// get actual timer
	getTimer();
});

function getTimer() {
  	$.ajax({
			type: 'POST',
			url: '../PHP/get_timer.php',
   			data: {
				'id': q_id
			},
   			success: function(data) {
				var data_field = $.parseJSON(data);
				alert(data_field);
				timer_function(data_field);
			}
	}).error(function() {
		alert("Error checking Timer!");
	});
}

function timer_function(starttime) {
	// calculate remaining time
}