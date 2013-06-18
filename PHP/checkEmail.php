<?php
	include 'DB_data.php';
	
	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}
	
	mysql_select_db($database,$con);
	
	$mail = $_POST['mail'];
	$result = array();
	
	$res = mysql_query("SELECT id FROM users WHERE email = '".$mail."'");
	
	if(!$res){
		die('Error: ' . mysql_error());
	}
	
	$rows = mysql_num_rows($res);
	
	if(rows == 0){
		$res = 1;
	}else{
		$res = 0;
	}
	
	$result[] = array('res'=>$res);
	
	echo json_encode($result);
?>