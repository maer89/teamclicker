<?php
	// var
	$q_id = $_POST['id'];
	$timestamp = time();
	$datum = date("d-m-Y",$timestamp);
	$filename = $q_id."-".$datum.".txt";
	$file = fopen($filename, 'w');
	$result = "asg";
	

	if (!$file) {
		// unable to open file and read value
		$result = "Fehler";
	} else {
		// file opend --> read value
		if(!feof($file)) {
			// start
			$starttime = fgets($file);
			if ($starttime != "") {
				$result = $starttime;
			} else {
				// end of file --> no entry --> start Timer
				// write actual time to file
				$timer = date("H:i:s",$timestamp);
				fwrite($file, $timer);
				$result = $timer;
			}
		}
	}

	// close file
	fclose($file);

	echo json_encode($result);
?>