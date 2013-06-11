<?php
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$name = $_POST['name'];
	$result = array();
	
	$res = mysql_query("SELECT id FROM users WHERE name = '".$name."'");
	
	$rows = mysql_num_rows($res);
	
	if(rows == 0){
		$res = 1;
	}else{
		$res = 0;
	}
	
	$result[] = array('res'=>$res);
	
	echo json_encode($result);
?>