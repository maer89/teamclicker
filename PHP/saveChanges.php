<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
	$id = $_POST['id'];
	$text = $_POST['text'];
	$ans1 = $_POST['ans1'];
	$ans2 = $_POST['ans2'];
	$ans3 = $_POST['ans3'];
	$ans4 = $_POST['ans4'];
	$ans5 = $_POST['ans5'];
	$ans6 = $_POST['ans6'];
	$group = $_POST['group'];
	
	$res = mysql_query("UPDATE messages SET messageText = '$text', messageGroup = '$group' WHERE id = $id");
	
	if (!$res) {
		die('Error: ' . mysql_error());
	}
	
	mysql_query("UPDATE answers SET answer1='$ans1',answer2='$ans2',answer3='$ans3',answer4='$ans4',answer5='$ans5',answer6='$ans6' WHERE messageID = $id");
	
	echo json_encode($res);
?>