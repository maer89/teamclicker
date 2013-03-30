<?php
	/*Connect*/
	mysql_connect("46.4.164.194","web90","maer89");
		
	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$messagID = $_POST['id'];
	$ans1 = $_POST['ans1'];
	$ans2 = $_POST['ans2'];
	$ans3 = $_POST['ans3'];
	$ans4 = $_POST['ans4'];
	$ans5 = $_POST['ans5'];
	$ans6 = $_POST['ans6'];
	
	$answer1 = mysql_query("SELECT COUNT(*) AS answer1 FROM results WHERE messageID=17 AND answer1=1");
	$res = mysql_fetch_array($answer1);
	$resultA1 = $res['answer1'];
	$answer2 = mysql_query("SELECT COUNT(*) AS answer2 FROM results WHERE messageID=17 AND answer2=1");
	$res = mysql_fetch_array($answer2);
	$resultA2 = $res['answer2'];
	
	if($ans3 != ""){
		$answer3 = mysql_query("SELECT COUNT(*) AS answer3 FROM results WHERE messageID=17 AND answer3=1");
		$res = mysql_fetch_array($answer3);
		$resultA3 = $res['answer3'];
	}else if($ans4 != ""){
		$answer4 = mysql_query("SELECT COUNT(*) AS answer4 FROM results WHERE messageID=17 AND answer4=1");
		$res = mysql_fetch_array($answer4);
		$resultA4 = $res['answer4'];
	}else if($ans5 != ""){
		$answer5 = mysql_query("SELECT COUNT(*) AS answer5 FROM results WHERE messageID=17 AND answer5=1");
		$res = mysql_fetch_array($answer5);
		$resultA5 = $res['answer5'];
	}else if($ans6 != ""){
		$answer6 = mysql_query("SELECT COUNT(*) AS answer6 FROM results WHERE messageID=17 AND answer6=1");
		$res = mysql_fetch_array($answer6);
		$resultA6 = $res['answer6'];
	}else{
		//do nothing
	}
	
	$result [] = array('answer1'=>$resultA1,
						'answer2'=>$resultA2,
						'answer3'=>$resultA3,
						'answer4'=>$resultA4,
						'answer5'=>$resultA5,
						'answer6'=>$resultA6);
						
	echo "antwort1: $resultA1<br />";
	echo "antwort2: $resultA2<br />";
	echo "antwort3: $resultA3<br />";
	
	echo "blabla: $result<br />";
						
	echo json_encode($result);
?>