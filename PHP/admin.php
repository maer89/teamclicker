<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Clicker Admin</title>

	<!--JQuery-->
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<!--Google Chart Tool-->
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
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

</head>
<body>
	<div id="bg_trans" style="display:none"></div>
	
	<div class="container content">
		<div class="row">
			<div class="span4">
				<ul class="nav nav-tabs">
					<li class="active"><a  id="addMessage">add message</a></li>
					<li><a id="showMessage">show messages</a></li>
				</ul>
			</div>
		</div>
		
		<div class="row ">
			<div class="span4 boxadmin" id="newMessage">
				<form>
				<p>
					<label>Question:</label>
					<textarea type="textarea" id="message" name="message" cols="65" rows="5" placeholder="Question..."></textarea>
				</p>
				<p>
					<label>Answers:</label>
					<div id="answers">
						<div id="answer1">Answer 1 <input type="text" name="answer1" id="answerText1" placeholder="Answer 1"/></div>
						<div id="answer2">Answer 2 <input type="text" name="answer2" id="answerText2" placeholder="Answer 2"/></div>
					</div>
					
					<div class="btn-group">
						<input class="btn" type="button" id="addanswer" value="add answer" />
						<input class="btn" type="button" id="delanswer" value="delete answer" />
					</div>
				</p>
				<p>
					<div class="btn-group">
						<input class="btn" type="button" onclick="saveMessage()" value="save message" />
						<input class="btn" type="reset" value="reset" />
					</div>
				</p>
				</form>
			</div>
			<!--show messages-->
			<div class="span12" id="showAllMessages">
				
			</div>
			<!--edit message-->
			<div id="edit" >
			</div>
			
			<div id="showresult">
				<a id="close"></a>
			</div>
			
		</div>
	</div>
</body>
</html>