<!DOCTYPE html>
<html>
<head>
	<title>Clicker Admin</title>
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
	<div id="bg_trans_register" style="display:none"></div>
	<div class="container content">
		<div class="row menu">
			<div class="span4 offset4" >
				<ul class="nav nav-pills">
					<li><a href="./index.php">Home</a></li>
					<li><a href="./question.php">Question</a></li>
					<li class="active"><a href="./admin.php">Admin</a></li>
				</ul>
			</div>
		</div>
		
		<div class="row">
			<div class="span4 offset4" >
				<div class="span4 headline">
					<h3>Login</h3>
				</div>
				<div class="span4 box menubox">
					<div class="menuform">
						<p>
							<label for="user">User</label>
							<input type="text" id="user" />
						</p>
						<p>
							<label for="password">Password</label>
							<input type="password" id="password"/>
						</p>
						<p>
							<div class="btn-group form">
								<button class="btn" id="btn_login">Login</button>
								<button class="btn" id="btn_register">Register</button>
							</div>
						</p>
					</div>
				</div>
			</div>
		</div>
		
		<div id="register_form" style="display: hidden;">
			<div class="span4 offset4" >
				<div class="span4 headline">
					<h3>Register</h3>
				</div>
				<div class="span4 box registerbox">
					<p>
						<label for="reg_email">E-Mail:</label>
						<input type="text" id="reg_email" />
					</p>
					<p>
						<label for="reg_username">Username:</label>
						<input type="text" id="reg_username" />
					</p>
					<p>
						<label for="reg_pas">Password:</label>
						<input type="password" id="reg_pas" />
					</p>
					<p>
						<label for="reg_pas2">Repeat password:</label>
						<input type="password" id="reg_pas2" />
					</p>
					<div class="btn-group">
						<p>
							<button class='btn' id='btn_reg_confirm'>Register</button>
							<button class='btn' id='btn_reg_cancel'>Cancel</button>
						</p>
					</div>
					<p></p>
				</div>
			</div>
		</div>
		
		<?php
			include './PHP/footer.php';
		?>
	</div>
</body>
</html>