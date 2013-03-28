<?php
	/*Connect*/
	mysql_connect("46.4.164.194","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$id = $_POST['id'];
	$text = $_POST['text'];
	$ans1 = $_POST['ans1'];
	$ans2 = $_POST['ans2'];
	$ans3 = $_POST['ans3'];
	$ans4 = $_POST['ans4'];
	$ans5 = $_POST['ans5'];
	$ans6 = $_POST['ans6'];
	
	$res = mysql_query("UPDATE messages SET messageText = '$text' WHERE id = $id");
	
	mysql_query("UPDATE answers SET answer1='$ans1',answer2='$ans2',answer3='$ans3',answer4='$ans4',answer5='$ans5',answer6='$ans6' WHERE messageID = $id");
	
	echo json_encode($res);
?>