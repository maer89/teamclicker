<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$userid = $_POST["uid"];
	$name = $_POST["groupName"];
	$result = array();
	
	$res = mysql_query("SELECT * FROM groups WHERE userID = $userid AND name = '".$name."'");
	$rows = mysql_num_rows($res);
	
	echo "Rows: $rows";
	
	if( $rows == 0){
		$sql = mysql_query("INSERT INTO groups (name, userID) VALUES ('".$name."', $userid )");
	}
	
	echo json_encode($result);
?>