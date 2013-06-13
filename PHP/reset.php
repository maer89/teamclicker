<?php
	
	/*Connect*/
	mysql_connect("62.113.225.192","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$id = $_POST['id'];
	
	$res = mysql_query("UPDATE results ".
					"SET answer1 = 0, ".
					 "answer2 = 0, ".
					 "answer3 = 0, ".
					 "answer4 = 0, ".
					 "answer5 = 0, ".
					 "answer6 = 0 ".
					 "WHERE messageID = $id");
	
	echo json_encode($id);
?>