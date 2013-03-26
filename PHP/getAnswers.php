<?php
	/*Connect*/
	mysql_connect("46.4.164.194","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$id = $_POST['id'];
	
	$res = mysql_query("SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = $id");
	
	while($data = mysql_fetch_array($res)){
		
	}
	
	echo json_encode($res);
?>