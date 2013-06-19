<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
	$id = $_POST['id'];
	$answer1;
	$answer2;
	$answer3;
	$answer4;
	$answer5;
	$answer6;
	
	$res = mysql_query("SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = $id");
	
	if (!$res) {
		die('Error: ' . mysql_error());
	}
	
	while($data = mysql_fetch_array($res)){
		$answer1 = $data['answer1'];
		$answer2 = $data['answer2'];
		$answer3 = $data['answer3'];
		$answer4 = $data['answer4'];
		$answer5 = $data['answer5'];
		$answer6 = $data['answer6'];
	}
	
	$arr = array('ans1'=>$answer1,'ans2'=>$answer2,'ans3'=>$answer3,'ans4'=>$answer4,'ans5'=>$answer5,'ans6'=>$answer6);
	
	echo json_encode($arr);
?>