<?php
	include 'DB_data.php';
	
	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}
	
	mysql_select_db($database, $con);
	
	$name = $_POST['user'];
	$password = $_POST['pw'];
	
	$result = array();
	
	// sql statement
	$sql = "SELECT id, name, password FROM users
			WHERE name = \"$name\"";

	$content = mysql_query($sql, $con);
	
	if (!$content) {
		die('Error: ' . mysql_error());
	} else {
		$row = mysql_fetch_array($content);
		// Check pw
		if ($password == $row['password']) {
			// correct pw
			$result = $row['id'];
		} else {
			// wrong pw
			$result = -1;
		}
  	}
  	
  	// close DB
	mysql_close($con);

	echo json_encode($result);
?>