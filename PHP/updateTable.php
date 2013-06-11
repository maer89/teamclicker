<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$ID = $_POST['userID'];
	//$ID = 1;
	$result = array();
	
	$res = mysql_query("SELECT * FROM messages WHERE userID = ".intval($ID)." ORDER BY messageGroup");
	
	//$data = mysql_fetch_array($res);
	//var_dump($data );
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
	//mysql_free_result($result);
?>