<?php
		/*Connect*/
		mysql_connect("46.4.164.194","web90","maer89");
		
		/*select database*/
		mysql_select_db("usr_web90_3");
		
		$message = $_POST['message'];
		$messageID;
		
		/*sql query insert message*/
		mysql_query("INSERT INTO messages VALUES"." (null,1,'$message',0,'')");
		
		$res = mysql_query("SELECT id FROM messages WHERE messageText = '$message'");
		
		while($data = mysql_fetch_array($res)){
			$messageID = $data['id'];
		}
		
		/*sql query insert answers*/
		mysql_query("INSERT INTO answers VALUES"." (null,$messageID,'".$_POST['answer1']."','"
															.$_POST['answer2']."','"
															.$_POST['answer3']."','"
															.$_POST['answer4']."','"
															.$_POST['answer5']."','"
															.$_POST['answer6']."')");
		
		header("Location: http://www.marcel-erath.de/clicker/PHP/admin.php?user_id=1");
?>