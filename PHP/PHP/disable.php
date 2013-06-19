<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
	$id = $_POST['id'];
	
	$res = mysql_query("UPDATE messages SET enabled=0 WHERE id = $id");
	
	if (!$res) {
		die('Error: ' . mysql_error());
	}
	
	$pw = mysql_query("UPDATE messages SET password='' WHERE id=$id");
	
	if (!$pw) {
		die('Error: ' . mysql_error());
	}
	
	echo json_encode($id);
?>