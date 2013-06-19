<?php
	include 'DB_data.php';
	
	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}
	
	mysql_select_db($database,$con);
	
	$userid = $_POST["uid"];
	$name = $_POST["groupName"];
	$result = array();
	
	$res = mysql_query("SELECT * FROM groups WHERE userID = $userid AND name = '".$name."'");
	$rows = mysql_num_rows($res);
	
	echo "Rows: $rows";
	
	if( $rows == 0){
		$sql = mysql_query("INSERT INTO groups (name, userID) VALUES ('".$name."', $userid )");
		if(!$sql){
			die('Error: ' . mysql_error());
		}
	}
	
	echo json_encode($result);
?>