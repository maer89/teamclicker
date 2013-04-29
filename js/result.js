var ans1 = 15;
var ans2 = 6;
var ans3 = 5;
var ans1text;
var ans2text;
var numb = 0;

function connect(){
//google.load('visualization', '1.0', {'packages':['corechart']});
//google.setOnLoadCallback(drawChart);
	
	var id = storage.get("q_id");
	//storage.set("q_id", "");
	$.ajax({
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
				ans1 = data_field.ans1;
				ans2 = data_field.ans2;
				ans1text = data_field.ans1text;
				ans2text = data_field.ans2text;
				numb = 2;
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
	});
}