<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Clicker Admin</title>
	<!--CSS-->
	<!--<link type="text/css" rel="stylesheet" href="../css/admin.css" >-->
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
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <script src="../bootstrap/js/bootstrap.min.js"></script>
	
	<!--css-->
	<link type="text/css" rel="stylesheet" href="../css/resultadmin.css" >
	
</head>
<body>
	<div id="bg_trans" style="display:none"></div>
	<div class="nav">
		<button id="addMessage">add message</button>
		<button id="showMessage">show messages</button>
	</div>
	<div class="content">
		<div id="newMessage">
			<form>
			<p>
				Question:<br />
				<textarea type="textarea" id="message" name="message" cols="35" rows="5" placeholder="Question..."></textarea>
			</p>
			<p>
				Answers:<br />
				<div id="answers">
					<div id="answer1">Answer 1 <input type="text" name="answer1" id="answerText1" placeholder="Answer 1"/></div>
					<div id="answer2">Answer 2 <input type="text" name="answer2" id="answerText2" placeholder="Answer 2"/></div>
				</div>
				<input type="button" id="addanswer" value="add answer" />
				<input type="button" id="delanswer" value="delete answer" />
			</p>
			<p>
				<input type="button" onclick="saveMessage()" value="save message" />
				<input type="reset" value="reset" />
			</p>
			</form>
		</div>
		<!--show messages-->
		<div id="showAllMessages">
			
		</div>
		<!--edit message-->
		<div id="edit" >
		</div>
		
		<div id="showresult">
			<a id="close"></a>
			<!--<span class="ecs_tooltip">Press Esc to close <span class="arrow"></span></span>-->
			
		</div>
		<!--<div id="backgroundPopup"></div>-->
	</div>
</body>
</html>