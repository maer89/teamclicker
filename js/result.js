var ans1;
var ans2;
var ans3;
var ans4;
var ans5;
var ans6;
var ans1text;
var ans2text;
var ans3text;
var ans4text;
var ans5text;
var ans6text;
var num = 0;
var msg;
var selectChart = 0;

$(document).ready(function(){

	$('#column').click(function(){
		$('#chart_div').empty();
		selectChart = 0;
		drawChart();
	});
	
	$('#bar').click(function(){
		$('#chart_div').empty();
		selectChart = 1;
		drawChart();
	});
	
	$('#pie').click(function(){
		$('#chart_div').empty();
		selectChart = 2;
		drawChart();
	});
});

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
				num = 2;
			}else if(data_field.num == 3){
				$("#result").append("<p>" + data_field.ans1text + ": "+ data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + "</p>");
				ans1 = data_field.ans1;
				ans2 = data_field.ans2;
				ans3 = data_field.ans3;
				ans1text = data_field.ans1text;
				ans2text = data_field.ans2text;
				ans3text = data_field.ans3text;
				num = 3;
			}else if(data_field.num == 4){
				$("#result").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + 
									"</p><p>" + data_field.ans4text + ": " + data_field.ans4 + "</p>");
				ans1 = data_field.ans1;
				ans2 = data_field.ans2;
				ans3 = data_field.ans3;
				ans4 = data_field.ans4;
				ans1text = data_field.ans1text;
				ans2text = data_field.ans2text;
				ans3text = data_field.ans3text;
				ans4text = data_field.ans4text;
				num = 4;
			}else if(data_field.num == 5){
				$("#result").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + 
									"</p><p>" + data_field.ans4text + ": "+ data_field.ans4 + "</p><p>" + data_field.ans5text + ": " + data_field.ans5 + "</p>");
				ans1 = data_field.ans1;
				ans2 = data_field.ans2;
				ans3 = data_field.ans3;
				ans4 = data_field.ans4;
				ans5 = data_field.ans5;
				ans1text = data_field.ans1text;
				ans2text = data_field.ans2text;
				ans3text = data_field.ans3text;
				ans4text = data_field.ans4text;
				ans5text = data_field.ans5text;
				num = 5;
			}else if(data_field.num == 6){
				$("#result").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p>" + data_field.ans3text + ": " + data_field.ans3 + 
									"</p><p>" + data_field.ans4text + ": " + data_field.ans4 + "</p><p>" + data_field.ans5text + ": " + data_field.ans5 + "</p><p>" + data_field.ans6text + ": " + data_field.ans6 + "</p>");
				ans1 = data_field.ans1;
				ans2 = data_field.ans2;
				ans3 = data_field.ans3;
				ans4 = data_field.ans4;
				ans5 = data_field.ans5;
				ans6 = data_field.ans6;
				ans1text = data_field.ans1text;
				ans2text = data_field.ans2text;
				ans3text = data_field.ans3text;
				ans4text = data_field.ans4text;
				ans5text = data_field.ans5text;
				ans6text = data_field.ans6text;
				num = 6;
			}else{
				//do nothing
			}
			msg = data_field.msg;
			drawChart();
		},
		complete : function(response) {
			connect();
		}
	});
}	

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawChart);	

function drawChart() {
// Create the data table.
var data = new google.visualization.DataTable();
data.addColumn('string', 'Topping');
data.addColumn('number', 'Answers');

if(parseInt(num)==2){
	data.addRows([
	  [ans1text, parseInt(ans1)],
	  [ans2text, parseInt(ans2)]
	]);
}else if(parseInt(num)==3){
	data.addRows([
	  [ans1text, parseInt(ans1)],
	  [ans2text, parseInt(ans2)],
	  [ans3text, parseInt(ans3)]
	]);
}else if(parseInt(num)==4){
	data.addRows([
	  [ans1text, parseInt(ans1)],
	  [ans2text, parseInt(ans2)],
	  [ans3text, parseInt(ans3)],
	  [ans4text, parseInt(ans4)]
	]);
}else if(parseInt(num)==5){
	data.addRows([
	  [ans1text, parseInt(ans1)],
	  [ans2text, parseInt(ans2)],
	  [ans3text, parseInt(ans3)],
	  [ans4text, parseInt(ans4)],
	  [ans5text, parseInt(ans5)]
	]);
}else if(parseInt(num)==6){
	data.addRows([
	  [ans1text, parseInt(ans1)],
	  [ans2text, parseInt(ans2)],
	  [ans3text, parseInt(ans3)],
	  [ans4text, parseInt(ans4)],
	  [ans5text, parseInt(ans5)],
	  [ans6text, parseInt(ans6)]
	]);
}else{
	//do nothing
}

// Set chart options
var options = {'title':msg,
			   'width':600,
			   'height':500};

// Instantiate and draw our chart, passing in some options.
var chart
if(selectChart == 0){ 
	chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
}else if(selectChart == 1){
	chart = new google.visualization.BarChart(document.getElementById('chart_div'));
}else if(selectChart == 2){
	chart = new google.visualization.PieChart(document.getElementById('chart_div'));
}
chart.draw(data, options);
}

/*var ans1 = 15;
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
}*/