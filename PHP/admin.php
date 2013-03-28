<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Clicker Admin</title>
	<!--CSS-->
	<link type="text/css" rel="stylesheet" href="../css/admin.css" >
	<!--JQuery-->
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	
	<script>
		$(document).ready(function(){
			var i = 3;					/*to add oder delete answers*/
		
   			//*start* get the UserID
   			var user_id = -1;
   			
   			var params = decodeURI(document.URL);
			var pos = params.indexOf('=');
			if (pos != -1) {
				// no "=" found in string
				pos++;
				user_id = params.slice(pos);
			}
			
			if (user_id == -1) {
				alert("You\'re not allowed to enter this site!");
				var page = "../HTML/index.html";
				window.open(page, "_self");
			}
			//*end*
			
			$("#showAllMessages").hide();
			
			/*add answer*/
			$("#addanswer").click(function(){
				if(i <= 6 ){
					$("#answers").append("<div id='answer" + i + "'>Answer " + i + " <input type='text' name='answer" + i +"' /></div>");
					i++;
				}else{
					alert("max. Anzahl von Antworten erreicht");
				}
			});
			
			/*delete answer*/
			$("#delanswer").click(function(){
				if(i > 3){	
					//$(".ans").has("name='answer3'").remove();
					i--;
					$test="answer"+i;
					$('div[id="'+$test+'"]').remove();
				}else{
					alert("Es können nicht mehr Antworten entfernt werden");
				}
			});
			
			/*show Messages*/
			$("#showMessage").click(function(){
				$("#edit").empty();
				$("#newMessage").hide();
				$("#showAllMessages").show();
			});
			
			/*add Message*/
			$("#addMessage").click(function(){
				$("#edit").empty();
				$("#newMessage").show();
				$("#showAllMessages").hide();
			});
			
			$(".row").click(function(){
				$(".row").css("background","white");
				$(".row").css("color","black");
				$(this).css("background","black");
				$(this).css("color","white");
				$(this).getElementBy
			});			
		});
		
		/*enable message*/
		function enable(num){
			var messageID = document.getElementById("id"+num).innerHTML;
			$.ajax({
				type: 'POST',
				url: '../PHP/enable.php',
				data: {
					'id': messageID
				},
				success: function(data) {
					var data_field = $.parseJSON(data);
					alert("message enabled");
				}
			});
		}
		/*disable message*/
		function disable(num){
			var messageID = document.getElementById("id"+num).innerHTML;
			$.ajax({
				type: 'POST',
				url: '../PHP/disable.php',
				data: {
					'id': messageID
				},
				success: function(data) {
					var data_field = $.parseJSON(data);
					alert("message disabled");
				}
			});
		}
		
		/*delete message*/
		function deleteMessage(num){
			var messageID = document.getElementById("id"+num).innerHTML;
			$.ajax({
				type: 'POST',
				url: '../PHP/delete.php',
				data: {
					'id': messageID
				},
				success: function(data) {
					var data_field = $.parseJSON(data);
					alert("message delete");
				}
			});
		}
		/*edit message*/
		function editMessage(num){
			if(document.getElementById("edit").innerHTML != ""){
				$("#edit").empty();
			}
		
			var messageID = document.getElementById("id"+num).innerHTML;
			var message;
			$.ajax({
				type: 'POST',
				url: '../PHP/getMessage.php',
				data: {
					'id': messageID
				},
				success: function(data) {
					message = $.parseJSON(data);
					document.getElementById("messageText").innerHTML = message;
				}
			});
			
			$("#edit").append("<form action='edit.php' method='POST'>" +
				"<p>Message:<br />" +
				"<textarea id='messageText' type='textarea' name='editedmessage' cols='35' rows='5'></textarea>" +
				"</p><p>Answers:<br />" +
				"<div id='editanswers'>" +
				"<div>Answer 1<input type='text' id='editedanswer1' name='editedanswer1'/></div>" +
				"<div>Answer 2<input type='text' id='editedanswer2' name='editedanswer2'/></div>");
				
			
			$.ajax({
				type: 'POST',
				url: '../PHP/getAnswers.php',
				data: {
					'id': messageID
				},
				success: function(data) {
					var data_field = $.parseJSON(data);
					document.getElementById("editedanswer1").value = data_field.ans1;
					document.getElementById("editedanswer2").value = data_field.ans2;
					
					if(data_field.ans3 == ""){
						//do nothing
					}else if(data_field.ans4 == ""){
						$("#edit").append("<div>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
						document.getElementById("editedanswer3").value = data_field.ans3;
					}else if(data_field.ans5 == ""){
						$("#edit").append("<div>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
						$("#edit").append("<div>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
						document.getElementById("editedanswer3").value = data_field.ans3;
						document.getElementById("editedanswer4").value = data_field.ans4;
					}else if(data_field.ans6 == ""){
						$("#edit").append("<div>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
						$("#edit").append("<div>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
						$("#edit").append("<div>Answer 5<input type='text' id='editedanswer5' name='editedanswer5'/></div>");
						document.getElementById("editedanswer3").value = data_field.ans3;
						document.getElementById("editedanswer4").value = data_field.ans4;
						document.getElementById("editedanswer5").value = data_field.ans5;
					}else{
						$("#edit").append("<div>Answer 3<input type='text' id='editedanswer3' name='editedanswer3'/></div>");
						$("#edit").append("<div>Answer 4<input type='text' id='editedanswer4' name='editedanswer4'/></div>");
						$("#edit").append("<div>Answer 5<input type='text' id='editedanswer5' name='editedanswer5'/></div>");
						$("#edit").append("<div>Answer 6<input type='text' id='editedanswer6' name='editedanswer6'/></div>");
						document.getElementById("editedanswer3").value = data_field.ans3;
						document.getElementById("editedanswer4").value = data_field.ans4;
						document.getElementById("editedanswer5").value = data_field.ans5;
						document.getElementById("editedanswer6").value = data_field.ans6;
					}
					$("#edit").append("</div><input type='button' onclick='saveChanges("+num+")' value='save changes' /></p></form>");
				}
			});
			
		}
		
		/*save changes*/
		function saveChanges(num){
			var messageID = document.getElementById("id"+num).innerHTML;
			var text = document.getElementById("messageText").value;
			alert("messageText:" + text);
			$.ajax({
				type: 'POST',
				url: '../PHP/saveChanges.php',
				data: {
					'id': messageID,
					'text': text
				},
				success: function(data) {
					var data_field = $.parseJSON(data);
					alert("changes saved");
				}
			});
		}
	</script>
	
</head>
<body>
	<div class="nav">
		<button id="addMessage">add message</button>
		<button id="showMessage">show messages</button>
	</div>
	<div class="content">
		<div id="newMessage">
			<form action="DB_admin.php" method="post">
				<p>
					Message:<br />
					<textarea type="textarea" name="message" cols="35" rows="5"></textarea>
				</p>
				<p>
					Answers:<br />
					<div id="answers">
						<div id="answer1">Answer 1 <input type="text" name="answer1" /></div>
						<div id="answer2">Answer 2 <input type="text" name="answer2" /></div>
					</div>
					<input type="button" id="addanswer" value="add answer" />
					<input type="button" id="delanswer" value="delete answer" />
				</p>
				<p>
					<input type="submit" value="save message" />
					<input type="reset" value="reset" />
				</p>
			</form>
		</div>
	
		<div id="showAllMessages">
			<?php
				// Same as in js where we get the user_id (we have to choose one, js or php)
				$user_id = $_GET['user_id'];
				echo $user_id;

				/*Connect*/
				mysql_connect("46.4.164.194","web90","maer89");
		
				/*select database*/
				mysql_select_db("usr_web90_3");
				
				$res = mysql_query("SELECT * FROM messages WHERE userID = $user_id");
				
				$i=0;
				echo "<table border='1'>";
				echo "<tr><td><b>ID</b></td><td><b>userID</b></td><td><b>Text</b></td><td><b>enable</b></td><td><b>edit</b></td><td><b>delete</b></td><td><b>password</b></td></tr>";
				while($data = mysql_fetch_array($res)){
					echo "<tr class='row'><td id='id".$i."'>".$data['id']."</td>"
						."<td>".$data['userID']."</td>"
						."<td>".$data['messageText']."</td>";
						
					if($data['enabled'] == 0){
						echo "<td><input type='radio' onclick='enable($i)' /></td>";
					}else{
						echo "<td><input type='radio' onclick='disable($i)' checked='checked'/></td>";
					}
					
					echo "<td><a><img src='../img/edit.png' onclick='editMessage($i)'/></a></td>"
						."<td><img src='../img/delete.png' onclick='deleteMessage($i)'/></td>"
						."<td>".$data['password']."</td></tr>";
					
					$i++;
				}
				echo "</table>";
			?>
		</div>
		<div id="edit" >
		</div>
	</div>
</body>
</html>