<?php
	include 'DB_data.php';
	
	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}
	
	mysql_select_db($database,$con);
	
	$userid = $_POST["uid"];
	$name = $_POST["name"];
	$result = array();
	
	//delete group
	$res = mysql_query("DELETE FROM groups WHERE userID = $userid AND name = '".$name."'");
	
	if(!$res){
			die('Error: ' . mysql_error());
	}
		
	//delete messages
	$res = mysql_query("DELETE FROM messages WHERE messageGroup = '".$name."' AND userID = $userid");
	
	if(!$res){
			die('Error: ' . mysql_error());
	}
	
	//delete answers
	$res = mysql_query("SELECT id FROM messages WHERE messageGroup = '".$name."' AND userID = $userid");
	while($data = mysql_fetch_array($res)){
		$id = $data['id'];
		$sql = mysql_query("DELETE FROM answers WHERE messageID = $id");
	}
	
	echo json_encode($result);
?>