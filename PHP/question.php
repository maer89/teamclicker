<!DOCTYPE html>
<html>
<head>
	<title>Clicker Question</title>
	<!-- jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
	
	<!-- includes -->
	<script type="text/javascript" src="./js/storage.js"></script>
 	<script type="text/javascript" src="./js/index.js"></script>
	
	<!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
    <script src="bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Responsive Design -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="./css/index.css"/>

</head>
<body>
	<div class="container content">
		<div class="row menu">
			<div class="span4 offset4">
				<ul class="nav nav-pills">
					<li><a href="./index.php">Home</a></li>
					<li class="active"><a href="./question.php">Question</a></li>
					<li><a href="./admin.php">Admin</a></li>
				</ul>
			</div>
		</div>
		
		<div class="row">
			<div class="span4 offset4" id="question">
				<div class="span4 headline">
					<h3>Question</h3>
				</div>
				<div class="span4 box menubox">
					<form class="menuform" name="question_form" action="" onsubmit="get_Question(); return false;">
						<p>
							<label for="q_id">Question ID</label>
							<input type="text" name="q_id" id="q_id"/>
						</p>
						<p>
							<label for="q_pw">Password</label>
							<input type="text" name="q_pw" id="q_pw"/>
						</p>
						<p><input class="btn" type="submit" value="Get Question"/></p>
					</form>
				</div>
			</div>
		</div>
		
		<?php
			include './PHP/footer.php';
		?>
	</div>
</body>
</html>