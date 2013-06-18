<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
	$ID = $_POST['userID'];
	$result = array();
	
	$res = mysql_query("SELECT * FROM messages WHERE userID = ".intval($ID)." ORDER BY messageGroup");
	
	if (!$res) {
		die('Error: ' . mysql_error());
	}
	
	while($data = mysql_fetch_array($res)){
		$id = $data['id'];
		$message = $data['messageText'];
		$enable = $data['enabled'];
		$pw = $data['password'];
		$group = $data['messageGroup'];
		
		$result[] = array('id'=>$id,
						  'message'=>$message,
						  'enable'=>$enable,
						  'pw'=>$pw,
						  'messageGroup'=>$group);
	}
	
	echo json_encode($result);
?>