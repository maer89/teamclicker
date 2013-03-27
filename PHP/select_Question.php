<?php





?><?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);

	$id = $_POST['id'];

	$result = array();

	// sql statement
	$sql_message = "SELECT messageText FROM messages
					WHERE id = \"" .$id."\"";
	$sql_answers = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = \"" .$id."\"";

	$content_message = mysql_query($sql_message, $con);
	$content_answers = mysql_query($sql_answers, $con);

	if (!$content_message) {
		die('Error: ' . mysql_error());
	} else {
		$row_messageText = mysql_fetch_array($content_message);
  	}
  	
  	if (!$content_answers) {
		die('Error: ' . mysql_error());
	} else {
		$row_answers = mysql_fetch_array($content_answers);
		
		$result [] = array('message'=>$row_messageText['messageText'],
						   'ans1'=>$row_answers['answer1'],
						   'ans2'=>$row_answers['answer2'],
						   'ans3'=>$row_answers['answer3'],
						   'ans4'=>$row_answers['answer4'],
						   'ans5'=>$row_answers['answer5'],
						   'ans6'=>$row_answers['answer6']);
  	}

  	// close DB
	mysql_close($con);

	echo json_encode($result);

?>