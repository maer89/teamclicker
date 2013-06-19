<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Clicker Admin</title>

	<!--JQuery-->
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	
	<!--Google Chart Tool-->
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	
	<!-- QR-Code -->
	<script type="text/javascript" src="../js/jquery.qrcode-0.2.min.js"></script>
	
	<!-- storage.js -->
	<script type="text/javascript" src="../js/storage.js"></script>
	
	<!--admin.js-->
	<script type="text/javascript" src="../js/admin.js"></script>
	
	<!--resultadmin.js-->
	<script type="text/javascript" src="../js/resultadmin.js"></script>
	
	<!-- Bootstrap -->
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
    <script src="../bootstrap/js/bootstrap.min.js"></script>
	
	<!--Responsive Design -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="../bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	
	<!--css-->
	<link type="text/css" rel="stylesheet" href="../css/index.css" >
	<link type="text/css" rel="stylesheet" href="../css/admin.css" >
	<link type="text/css" rel="stylesheet" href="../css/resultadmin.css" >
	<link type="text/css" rel="stylesheet" href="../css/edit.css" >

</head>
<body>
	<div id="bg_trans" style="display:none"></div>
	<div id="bg_trans_qr" style="display:none"></div>
	<div id="bg_trans_edit" style="display:none"></div>
	
	<div class="container content">
		<div class="row">
			<div class="span4 offset4">
				<ul class="nav nav-tabs">
					<li class="active"><a  id="addMessage">add question</a></li>
					<li><a id="showMessage">show question</a></li>
					<li><a id="logout">Logout</a></li>
				</ul>
			</div>
		</div>
		
		<div class="row ">
			<div class="span4 offset4 boxadmin" id="newMessage">
					<div class="form">
						<label>Question:</label>
						<textarea type="textarea" id="message" name="message" cols="65" rows="5" placeholder="Question..."></textarea>
					</div>
					<div class="form">
						<label>Answers:</label>
						<div id="answers">
							<div id="answer1"><input type="text" name="answer1" id="answerText1" placeholder="Answer 1"/></div>
							<div id="answer2"><input type="text" name="answer2" id="answerText2" placeholder="Answer 2"/></div>
						</div>
						
						<div class="btn-group">
							<input class="btn" type="button" id="addanswer" value="add answer" />
							<input class="btn" type="button" id="delanswer" value="delete answer" />
						</div>
						
						<div class="form">
							<label>Group:</label>
							<div id='groups'>
							</div>
						</div>
						
						<div class="form">
							<div class="btn-group">
								<input class="btn" type="button" onclick="saveMessage()" value="save question" />
								<input class="btn" type="reset" value="reset" />
							</div>
						</div>
					</div>
			</div>
			<!--show messages-->
			<div class="span12" id="showAllMessages">
				
			</div>
			<!--edit message-->
			<div class="span4 box boxadmin" id="edit" >
			</div>
			
			<!--qr-code-->
			<div id="qrcode_div">
			
			</div>
			
			<!--show result-->
			<div id="showresult">
			</div>
			
			<!--footer-->
			<div class="footer hidden-phone">
				<span class="copyright">&copy;HTWG Konstanz Marcel Erath &amp; Daniel Stooﬂ</span>
				<img src="../img/socialmedia.png" class="socialmedia" />
				<span class="impressum"><a href="">Impressum</a></span>
			</div>
			
		</div>
	</div>
</body>
</html>