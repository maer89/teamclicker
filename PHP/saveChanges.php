<?php
	/*Connect*/
	mysql_connect("46.4.164.194","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$id = $_POST['id'];
	$text = $_POST['text'];
	
	$res = mysql_query("UPDATE messages SET messageText = $text WHERE id = $id");
	
	echo json_encode($res);
?>