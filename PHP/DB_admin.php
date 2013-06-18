<?php
	include 'DB_data.php';
	
	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}
	
	mysql_select_db($database,$con);
	
	$message = $_POST['message'];
	$messageID;
	
	mysql_query("INSERT INTO messages VALUES"." (null,1,'$message',0,'')");
	
	$res = mysql_query("SELECT id FROM messages WHERE messageText = '$message'");
	
	while($data = mysql_fetch_array($res)){
		$messageID = $data['id'];
	}
	
	mysql_query("INSERT INTO answers VALUES"." (null,$messageID,'".$_POST['answer1']."','"
														.$_POST['answer2']."','"
														.$_POST['answer3']."','"
														.$_POST['answer4']."','"
														.$_POST['answer5']."','"
														.$_POST['answer6']."')");
	
	header("Location: http://www.marcel-erath.de/clicker/PHP/admin.php?user_id=1");
?>