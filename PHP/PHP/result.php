<!DOCTYPE html>
<html>
<head>
	<title>Result</title>
	
	<!-- jQuery -->
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	
 	<!-- includes -->
	<link rel="shortcut icon" href="../img/favicon.ico" >
	
 	<script type="text/javascript" src="../js/storage.js"></script>
	
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	<script type="text/javascript" src="../js/result.js"></script>
	
	<!-- Bootstrap -->
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
    <script src="../bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Responsive Design -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="../bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	
	<!--CSS-->
	<link href="../css/index.css" type="text/css" rel="stylesheet">
		
</head>

<body onload="connect()">
	<div class="container">
		<div class="row menu">
			<div class="span4 offset4">
				<div>
					<ul class="nav nav-pills navi">
						<li><a href="../index.php">Home</a></li>
					</ul>
				</div>
			</div>
		</div>
	
		<div class="row result">
			<div class="span8 resultbox" id="chart_div" ></div>
		</div>
		
		<div class="row resbutton">
			<div class="btn-group resultbutton">
				<button class="btn" id="column">column chart</button>
				<button class="btn" id="bar">bar chart</button>
				<button class="btn" id="pie">pie chart</button>
			</div>
		</div>
		
		<?php
			include 'footer.php';
		?>
	</div>
</body>
</html>