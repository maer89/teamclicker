<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
	$id = $_POST['id'];
	
	$res = mysql_query("UPDATE results ".
					"SET answer1 = 0, ".
					 "answer2 = 0, ".
					 "answer3 = 0, ".
					 "answer4 = 0, ".
					 "answer5 = 0, ".
					 "answer6 = 0 ".
					 "WHERE messageID = $id");
	
	if (!$res) {
		die('Error: ' . mysql_error());
	}
	
	echo json_encode($id);
?>