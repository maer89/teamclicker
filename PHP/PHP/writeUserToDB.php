<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
	$mail = $_POST['mail'];
	$pass = $_POST['pass'];
	$name = $_POST['name'];
	$result = array();
	
	$res = mysql_query("INSERT INTO users (name, password, email) VALUES ('".$name."', '".$pass."', '".$mail."')");
	
	if (!$res) {
		die('Error: ' . mysql_error());
	}
	
	echo json_encode($result);
?>