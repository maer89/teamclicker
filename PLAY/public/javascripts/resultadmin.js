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
var id;

$(document).ready(function(){
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
	id = messageID;
	showResult();
}

/*show Result*/
function showResult(){
	var xhr = $.ajax({
		url: '/outcome',
		type: 'GET',
		data: {
			'id': id
		},
		success: function(data){
			$("#showresult").empty();
			
			if(data.answers == 2){
				$("#showresult").append("<p>" + data.ans1text + ": " + data.ans1 + "</p><p>" + data.ans2text + ": " + data.ans2 + "</p>");
				ans1 = data.ans1;
				ans2 = data.ans3;
				ans1text = data.ans1text;
				ans2text = data.ans2text;
				num = 2;
			}else if(data.answers == 3){
				$("#showresult").append("<p>" + data.ans1text + ": "+ data.ans1 + "</p><p>" + data.ans2text + ": "  + data.ans2 + "</p><p>" + data.ans3text + ": " + data.ans3 + "</p>");
				ans1 = data.ans1;
				ans2 = data.ans2;
				ans3 = data.ans3;
				ans1text = data.ans1text;
				ans2text = data.ans2text;
				ans3text = data.ans3text;
				num = 3;
			}else if(data.answers == 4){
				$("#showresult").append("<p>" + data.ans1text + ": " + data.ans1 + "</p><p>" + data.ans2text + ": "  + data.ans2 + "</p><p>" + data.ans3text + ": " + data.ans3 + 
									"</p><p>" + data.ans4text + ": " + data.ans4 + "</p>");
				ans1 = data.ans1;
				ans2 = data.ans2;
				ans3 = data.ans3;
				ans4 = data.ans4;
				ans1text = data.ans1text;
				ans2text = data.ans2text;
				ans3text = data.ans3text;
				ans4text = data.ans4text;
				num = 4;
			}else if(data.answers == 5){
				$("#showresult").append("<p>" + data.ans1text + ": " + data.ans1 + "</p><p>" + data.ans2text + ": "  + data.ans2 + "</p><p>" + data.ans3text + ": " + data.ans3 + 
									"</p><p>" + data.ans4text + ": " + data.ans4 + "</p><p>"  + data.ans5text + ": " + data.ans5 + "</p>");
				ans1 = data.ans1;
				ans2 = data.ans2;
				ans3 = data.ans3;
				ans4 = data.ans4;
				ans5 = data.ans5;
				ans1text = data.ans1text;
				ans2text = data.ans2text;
				ans3text = data.ans3text;
				ans4text = data.ans4text;
				ans5text = data.ans5text;
				num = 5;
			}else if(data.answers == 6){
				$("#showresult").append("<p>" + data.ans1text + ": " + data.ans1 + "</p><p>" + data.ans2text + ": "  + data.ans2 + "</p><p>" + data.ans3text + ": " + data.ans3 + 
									"</p><p>" + data.ans4text + ": " + data.ans4 + "</p><p>"  + data.ans5text + ": " + data.ans5 + "</p><p>"  + data.ans6text + ": " + data.ans6 + "</p>");
				ans1 = data.ans1;
				ans2 = data.ans2;
				ans3 = data.ans3;
				ans4 = data.ans4;
				ans5 = data.ans5;
				ans6 = data.ans6;
				ans1text = data.ans1text;
				ans2text = data.ans2text;
				ans3text = data.ans3text;
				ans4text = data.ans4text;
				ans5text = data.ans5text;
				ans6text = data.ans6text;
				num = 6;
			}else{
				//do nothing
			}
			
			msg = data.msg;
			
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
				   'height':500,
				   slices: [{color:'#0073e5'},{color:'#7ddc1f'},{color:'#00a6fe'},{color:'#64c306'},{color:'#444444'},{color:'#7ddc1f'}],
				   colors:['#7ddc1f'],
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