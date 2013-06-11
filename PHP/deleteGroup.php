<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$userid = $_POST["uid"];
	$name = $_POST["name"];
	$result = array();
	
	//delete group
	$res = mysql_query("DELETE FROM groups WHERE userID = $userid AND name = '".$name."'");
	
	//delete messages
	$res = mysql_query("DELETE FROM messages WHERE messageGroup = '".$name."' AND userID = $userid");
	
	//delete answers
	$res = mysql_query("SELECT id FROM messages WHERE messageGroup = '".$name."' AND userID = $userid");
	while($data = mysql_fetch_array($res)){
		$id = $data['id'];
		$sql = mysql_query("DELETE FROM answers WHERE messageID = $id");
	}
	
	echo json_encode($result);
?>