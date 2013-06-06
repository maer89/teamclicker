<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$ID = $_POST['userID'];
	$result = array();
	
	$res = mysql_query("SELECT * FROM messages WHERE userID = $ID");
	
	while($data = mysql_fetch_array($res)){
		$id = $data['id'];
		$userID = $data['userID'];
		$message = $data['messageText'];
		$enable = $data['enabled'];
		$pw = $data['password'];
		
		$result[] = array('id'=>$id,
						  'userID'=>$userID,
						  'message'=>$message,
						  'enable'=>$enable,
						  'pw'=>$pw);
	}
	
	echo json_encode($result);
?>