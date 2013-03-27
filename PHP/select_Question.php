<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);

	$id = $_POST['id'];
	$password = $_POST['pw'];

	$result = array();

	// sql statement
	$sql = "SELECT messageText, password FROM messages
			WHERE id = $id
			AND enabled = 1";

	$content = mysql_query($sql, $con);

	if (!$content) {
		die('Error: ' . mysql_error());
	} else {
		$row = mysql_fetch_array($content);
		// Check pw
		if ($password == $row['password']) {
			// correct pw
			$result = $row['messageText'];
		} else {
			// wrong pw
			$result = "-";
		}
  	}

  	// close DB
	mysql_close($con);

	echo json_encode($result);

?>