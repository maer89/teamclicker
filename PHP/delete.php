<?php
	include 'DB_data.php';
	
	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}
	
	mysql_select_db($database,$con);
	
	$id = $_POST['id'];
	
	$res = mysql_query("DELETE FROM messages WHERE id = $id");
	
	if(!$res){
			die('Error: ' . mysql_error());
	}
	
	$res = mysql_query("DELETE FROM answers WHERE messageID = $id");
	
	if(!$res){
			die('Error: ' . mysql_error());
	}
	
	echo json_encode($id);
?>