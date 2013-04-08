<?php
	/*Connect*/
	mysql_connect("46.4.164.194","web90","maer89");
		
	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$answers; 
	$ans1;
	$ans1text;
	$ans2;
	$ans2text;
	$ans3;
	$ans3text;
	$ans4;
	$ans4text;
	$ans5;
	$ans5text;
	$ans6;
	$ans6text;
	$id = $_POST['id'];
	$space = str_repeat(" ",5000);
	
	/*get answers*/
	$res = mysql_query("SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = '$id'");
	
	while($data = mysql_fetch_array($res)){
		if($data['answer3'] == ""){
			$answers = 2;
		}else if($data['answer4'] == ""){
			$answers = 3;
		}else if($data['answer5'] == ""){
			$answers = 4;
		}else if($data['answer6'] == ""){
			$answers = 5;
		}else{
			$answers = 6;
		}
		$ans1text = $data['answer1'];
		$ans2text = $data['answer2'];
		$ans3text = $data['answer3'];
		$ans4text = $data['answer4'];
		$ans5text = $data['answer5'];
		$ans6text = $data['answer6'];
	}

	
	$numb = mysql_query("SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID = '$id'");
	
	while($data = mysql_fetch_array($numb)){
		$ans1 = $data['answer1'];
		$ans2 = $data['answer2'];
		$ans3 = $data['answer3'];
		$ans4 = $data['answer4'];
		$ans5 = $data['answer5'];
		$ans6 = $data['answer6'];
	}
	
	/*timestamp*/
	$start = mktime();
	$end = mktime();
	$i = true;
	while(($end-$start) <  2){
		$numb = mysql_query("SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID = '$id'");
	
		while($data = mysql_fetch_array($numb)){
			$ans1neu = $data['answer1'];
			$ans2neu = $data['answer2'];
			$ans3neu = $data['answer3'];
			$ans4neu = $data['answer4'];
			$ans5neu = $data['answer5'];
			$ans6neu = $data['answer6'];
		}
		
		if($ans1neu > $ans1 || $ans2neu > $ans2 || $ans3neu > $ans3 || $ans4neu > $ans4 || $ans5neu > $ans5 || $ans6neu > $ans6 || $i==true){
			$response = array('ans1'=>$ans1neu, 
							'ans1text'=>$ans1text,
							'ans2'=>$ans2neu,
							'ans2text'=>$ans2text,
							'ans3'=>$ans3neu,
							'ans3text'=>$ans3text,
							'ans4'=>$ans4neu,
							'ans4text'=>$ans4text,
							'ans5'=>$ans5neu,
							'ans5text'=>$ans5text,
							'ans6'=>$ans6neu,
							'ans6text'=>$ans6text,
							'num'=>$answers,
							'space'=>$space);
			echo json_encode($response);
		} 
		$i = false;
		
		$end = mktime();
		flush();
	}
	
	/*$response = array('ans1'=>$ans1, 'ans2'=>$ans2, 'ans3'=>$ans3, 'ans4'=>$ans4, 'ans5'=>$ans5, 'ans6'=>$ans6, 'num'=>$answers);
	echo json_encode($response);*/
	
	/*$messagID = $_POST['id'];
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
						
	echo json_encode($result);*/
?>