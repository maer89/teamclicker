<!DOCTYPE html>
<html>
<head>
	<title>Clicker</title>
	
	<!-- jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
	
	<!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
    <script src="bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Responsive Design -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	
	<!-- SlideShow-->
	<script src="iosslider/_src/jquery.iosslider.js"></script>
	<script src="./js/slider.js"></script>
	
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="./css/index.css"/>
	<link rel="stylesheet" type="text/css" href="./css/slider.css"/>
	
</head>
<body>
	<div class="container content">
		<div class="row menu">
			<div class="span4 offset4">
				<div>
					<ul class="nav nav-pills navi">
						<li class="active"><a href="./index.php">Home</a></li>
						<li><a href="./question.php">Question</a></li>
						<li><a href="./admin.php">Admin</a></li>
					</ul>
				</div>
			</div>
		</div>
		
		<div class="row hidden-phone" >
			<div class="span8 iosSlider slider">
				<div id="slider">
					<div class="item" id="item1"><img src="img/bild1.jpg" /></div>
					<div class="item" id="item2"><img src="img/bild2.jpg" /></div>
					<div class="item" id="item3"><img src="img/bild3.jpg" /></div>
					<div class="item" id="item4"><img src="img/bild4.jpg" /></div>
				</div>
				
				<div class = 'iosSliderButtons'>
					<div class = 'button'></div>
					<div class = 'button'></div>
					<div class = 'button'></div>
					<div class = 'button'></div>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="span6 holebox">
				<div class="span6 headline">
					<h3>What is the "Clicker"?</h3>
				</div>
				<div class="span6 box">
					<ul class="index_content">
						<li>A tool to make your own votings</li>
						<li>You can vote with a normal computer or with a smartphone</li>
						<li>It is also possible to use your tablet</li>
					</ul>
				</div>
			</div>
			
			<div class="span6 holeboxright">
				<div class="span6 headline">
					<h3>Easy to use</h3>
				</div>
				<div class="span6 box boxright">
					<ul class="index_content">
						<li>Questions are organized in groups so you have a very good overview</li>
						<li>Edit existing questions with just one click</li>
						<li>Generate a QR-Code for every question which links directly to it</li>					
					</ul>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="span6 holebox">
				<div class="span6 headline">
					<h3>How to use</h3>
				</div>
				<div class="span6 box">
					<ul class="index_content">
						<li>Register yourself at the menu admin</li>
						<li>Login and create your questions and enable them in your own "admin-area"</li>
						<li>Let people answer your question by:
							<ul>
								<li>Entering the question-id and the password at "Question"</li>
								<li>Scanning the QR-Code</li>
								<li>Following the special question link</li>
							</ul>
						</li>					
					</ul>
				</div>
			</div>
			
			<div class="span6 holeboxright">
				<div class="span6 headline">
					<h3>Social Media</h3>
				</div>
				<div class="span6 box boxright">
					<ul class="index_content">
						<li>Follow us on Facebook, Google+, Twitter and Pinterest!</li>
					</ul>
				</div>
			</div>
		</div>
		
		<?php
			include './PHP/footer.php';
		?>
	</div>	
</body>
</html>