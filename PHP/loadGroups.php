<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$userid = $_POST["uid"];
	$result = array();
	
	$res = mysql_query("SELECT * FROM groups WHERE userID = $userid");
	
	while($data = mysql_fetch_array($res)){
		$id = $data['id'];
		$name = $data['name'];
		
		$result[] = array ('id' =>$id, 'name' =>$name);
	}
	
	echo json_encode($result);
?>