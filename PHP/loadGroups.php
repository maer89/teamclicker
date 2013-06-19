<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
	$userid = $_POST["uid"];
	$result = array();
	
	$res = mysql_query("SELECT * FROM groups WHERE userID = $userid");
	
	if (!$res) {
		die('Error: ' . mysql_error());
	} 
	
	while($data = mysql_fetch_array($res)){
		$id = $data['id'];
		$name = $data['name'];
		
		$result[] = array ('id' =>$id, 'name' =>$name);
	}
	
	echo json_encode($result);
?>