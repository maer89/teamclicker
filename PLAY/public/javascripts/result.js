function connect(){
	//var id = storage.get("q_id");
	//storage.set("q_id", "");
	id = 101;
	/*$.get('/outcome',
		{'id': id},
		function(data){
			alert("get result: " + data);
			
			//$("#result").append(data);
	});*/
	$.ajax({
		url:'/outcome',
		type:'GET',
		data: {'id': id},
		success:function(data){
			alert("success: " + data);
		},
		complete: function(data){
			alert("complete");
			connect();
		}
	});
	/*$.ajax({
		type : 'POST',
		url : '../PHP/result.php',
		data : {
			'id': id
		},
		success : function(response) {
			var data_field = $.parseJSON(response);
			$("#result").empty();
			
			if(data_field.num == 2){
				$("#result").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": " + data_field.ans2 + "</p>");
			}else if(data_field.num == 3){
				$("#result").append("<p>" + data_field.ans1text + ": "+ data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + "</p>");
			}else if(data_field.num == 4){
				$("#result").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + 
									"</p><p>" + data_field.ans4text + ": " + data_field.ans4 + "</p>");
			}else if(data_field.num == 5){
				$("#result").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + 
									"</p><p>" + data_field.ans4text + ": "+ data_field.ans4 + "</p><p>" + data_field.ans5text + ": " + data_field.ans5 + "</p>");
			}else if(data_field.num == 6){
				$("#result").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p>" + data_field.ans3text + ": " + data_field.ans3 + 
									"</p><p>" + data_field.ans4text + ": " + data_field.ans4 + "</p><p>" + data_field.ans5text + ": " + data_field.ans5 + "</p><p>" + data_field.ans6text + ": " + data_field.ans6 + "</p>");
			}else{
				//do nothing
			}
		},
		complete : function(response) {
			connect();
		}
	});*/
}

function test(data) {
	alert("hier");
}