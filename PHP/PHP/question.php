<!DOCTYPE html>
<html>
<head>
	<title>Question</title>
	
	<!-- jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
	
	<!-- includes -->
	<script type="text/javascript" src="../js/storage.js"></script>
 	<script type="text/javascript" src="../js/question.js"></script>
	
	<!-- Bootstrap -->
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
    <script src="../bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Responsive Design -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="../bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="../css/index.css"/>
</head>

<body>
	<div id="bg_trans_alert" style="display:none"></div>
	<div class="container">
		<div class="row">
			<div class="span4 offset4">
				<div class="span4 headline">
					<h3>Question</h3>
				</div>
				<div class="span4 box questionbox" id="question_and_Answers">
				</div>
			</div>
		</div>
		
		<?php
			include 'footer.php';
		?>
	</div>
</body>
</html>