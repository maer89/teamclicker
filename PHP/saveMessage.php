<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");
	
	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$message = $_POST['text'];
	$messageID;
	$userID = $_POST['userID'];
	$ans1 = $_POST['ans1'];
	$ans2 = $_POST['ans2'];
	$ans3 = $_POST['ans3'];
	$ans4 = $_POST['ans4'];
	$ans5 = $_POST['ans5'];
	$ans6 = $_POST['ans6'];
	$group = $_POST['group'];
	
	/*sql query insert message*/
	mysql_query("INSERT INTO messages VALUES"." (null,$userID,'$message',0,'','$group')");
	
	$res = mysql_query("SELECT id FROM messages WHERE messageText = '$message' AND userID = $userID");
	
	while($data = mysql_fetch_array($res)){
		$messageID = $data['id'];
	}
	
	/*sql query insert answers*/
	mysql_query("INSERT INTO answers VALUES(null,$messageID,'$ans1','$ans2','$ans3','$ans4','$ans5','$ans6')");
	
	echo json_encode($res);
?>