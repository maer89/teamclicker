<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}

	mysql_select_db($database, $con);
	
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
	
	$sqlmsg = mysql_query("SELECT messageText FROM messages WHERE id = '$id'");
	while($data = mysql_fetch_array($sqlmsg)){
		$msg = $data['messageText'];
	}
	
	$start = mktime();
	$end = mktime();
	$i = true;
	$file = fopen("test.txt",w);
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
		
		if(($ans1neu != $ans1) || ($ans2neu != $ans2) || ($ans3neu != $ans3) || ($ans4neu != $ans4) || ($ans5neu != $ans5) || ($ans6neu != $ans6) || ($i)){
			$response = array("ans1"=>$ans1neu, 
							"ans1text"=>$ans1text,
							"ans2"=>$ans2neu,
							"ans2text"=>$ans2text,
							"ans3"=>$ans3neu,
							"ans3text"=>$ans3text,
							"ans4"=>$ans4neu,
							"ans4text"=>$ans4text,
							"ans5"=>$ans5neu,
							"ans5text"=>$ans5text,
							"ans6"=>$ans6neu,
							"ans6text"=>$ans6text,
							"num"=>$answers,
							"msg"=>$msg);
			fwrite($file,json_encode($response)."\n");
			//$x = "[".json_encode($response)."]";
			//echo $x;
			echo json_encode($response);
		} 

		$i = false;
		
		$end = mktime();
		//fclose($file);
	}
	
?>