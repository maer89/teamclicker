<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$mail = $_POST['mail'];
	$pass = $_POST['pass'];
	$name = $_POST['name'];
	$result = array();
	
	$res = mysql_query("INSERT INTO users (name, password, email) VALUES ('".$name."', '".$pass."', '".$mail."')");
	
	echo json_encode($result);
?>