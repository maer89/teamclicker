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
var show = 1;
var start = 1;
var showresult;
var bg;

$(document).ready(function(){
	/*close result*/
	$("#bg_trans").click(function(){
		$("#showresult").css("display","none");
		$("#bg_trans").css("display","none");
		$("body").css("overflow-y","visible");
		showresult = $("#showresult").detach();
		bg = $("#bg_trans").detach();
		start = 0;
		show = 0;
	});
});

function result(num){
	var messageID = document.getElementById("id"+num).innerHTML;
	if(start == 0){
		showresult.appendTo("body");
		bg.appendTo("body");
	}
	showResult(messageID);
}

/*show Result*/
function showResult(id){
	//if(show == 1){
	var xhr = $.ajax({
		type: 'POST',
		url: 'result.php',
		data: {
			'id': id
		},
		success: function(data){
			var data_field = $.parseJSON(data);
			$("#showresult").empty();
			if(data_field.num == 2){
				$("#showresult").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": " + data_field.ans2 + "</p>");
				ans1 = data_field.ans1;
				ans2 = data_field.ans2;
				ans1text = data_field.ans1text;
				ans2text = data_field.ans2text;
				num = 2;
			}else if(data_field.num == 3){
				$("#showresult").append("<p>" + data_field.ans1text + ": "+ data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + "</p>");
				//document.getElementById("showresult").innerHTML="Hallo was geht ab?";
				ans1 = data_field.ans1;
				ans2 = data_field.ans2;
				ans3 = data_field.ans3;
				ans1text = data_field.ans1text;
				ans2text = data_field.ans2text;
				ans3text = data_field.ans3text;
				num = 3;
			}else if(data_field.num == 4){
				$("#showresult").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + 
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
				$("#showresult").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p><p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p><p>" + data_field.ans3text + ": " + data_field.ans3 + 
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
				$("#showresult").append("<p>" + data_field.ans1text + ": " + data_field.ans1 + "</p>" + data_field.ans2text + ": "  + data_field.ans2 + "</p>" + data_field.ans3text + ": " + data_field.ans3 + 
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
			
			$("#showresult").css("display","block");
			$("#bg_trans").css("display","block");
			$("body").css("overflow-y","hidden");
			drawChart();
		},
		complete : function(response) {
			if(show == 1){
				showResult();
			}else{
				
			}
		}
	});
	//}
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
				   'height':500,
				   'is3D': true,
				   animation:{
					duration: 1000,
					easing: 'out',
				   }};

	// Instantiate and draw our chart, passing in some options.
	var chart
	
	if(selectChart == 0){
		chart = new google.visualization.ColumnChart(document.getElementById('showresult'));
	}else if(selectChart == 1){
		chart = new google.visualization.BarChart(document.getElementById('showresult'));
	}else if(selectChart == 2){
		chart = new google.visualization.PieChart(document.getElementById('showresult'));
	}
	
	$("#showresult").append("<div id='close'></div>");
	
	
	chart.draw(data, options);
}