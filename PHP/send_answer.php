<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Could not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);

	$answer = $_POST['answer'];
	$q_id = $_POST['q_id'];

	$tmp_string = "";
	
	// check answer variable
	switch($answer)
	{
		case ("ans1"):
			$tmp_string = "1";
		break;

		case ("ans2"):
  			$tmp_string = "2";
		break;

		case ("ans3"):
   			$tmp_string = "3";
		break;

		case ("ans4"):
  			$tmp_string = "4";
		break;

		case ("ans5"):
   			$tmp_string = "5";
		break;

		case ("ans6"):
   			$tmp_string = "6";
		break;
	}
	// sql statement
	$sql = "SELECT * FROM results WHERE messageID = $q_id";
	$content = mysql_query($sql, $con);

	if (!$content) {
		die('Error: ' .mysql_error());
	} else {
		if ($row = mysql_fetch_array($content)) {
			// messageID already exists --> UPDATE
			$sql = "UPDATE results SET answer$tmp_string =answer$tmp_string+1
					WHERE messageID = $q_id";
		} else {
			// messageID doesn't exist --> INSERT
			$sql = "INSERT INTO results (messageID, answer$tmp_string) VALUES ($q_id, answer$tmp_string+1)";
		}
  	}
	$content = mysql_query($sql, $con);

  	// close DB
	mysql_close($con);
?>