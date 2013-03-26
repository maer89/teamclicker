<?php
	/*Connect*/
	mysql_connect("46.4.164.194","web90","maer89");

	/*select database*/
	mysql_select_db("usr_web90_3");
	
	$id = $_POST['id'];
	
	$res = mysql_query("UPDATE messages SET enabled=1 WHERE id = $id");
	
	/*generate password*/
	$z1 = range(49, 57);   	// 1-9
    $z2 = range(65, 78);	// A-N
    $z3 = range(80, 90);	// M-Z
	$z4 = range(97,110);	// a-n
	$z5 = range(112,122);	// m-z
    $zeichen = array_merge($z1, $z2, $z3, $z4, $z5);    // allowed characters
    $passw = '';
	shuffle($zeichen);                    				// mix characters
	for($i = 0;$i < 4;$i ++){          					// readout 4 characters
		$passw .= chr($zeichen[$i]);
	}
	
	$pw = mysql_query("UPDATE messages SET password='$passw' WHERE id=$id");
	
	echo json_encode($id);
?>