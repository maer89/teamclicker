<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$id = $_POST['id'];
	
	$res = mysql_query("SELECT messageText FROM messages WHERE id = $id");
	
	while($data = mysql_fetch_array($res)){
		$text = $data['messageText'];
	}
	echo json_encode($text);
?>