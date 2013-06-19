<?php
	include 'DB_data.php';

	// Connect with DB
	$con = mysql_connect($ServerAdr, $UserName, $pw);
	if(!$con) {
		die('Cold not connect: ' .mysql_error());
	}
	
	mysql_select_db($database,$con);
	
	echo "create table 'answers'....<br />";
	
	$answers = mysql_query("
		CREATE TABLE IF NOT EXISTS `answers` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `messageID` int(11) DEFAULT NULL,
		  `answer1` char(30) COLLATE utf8_bin DEFAULT NULL,
		  `answer2` char(30) COLLATE utf8_bin DEFAULT NULL,
		  `answer3` char(30) COLLATE utf8_bin DEFAULT NULL,
		  `answer4` char(30) COLLATE utf8_bin DEFAULT NULL,
		  `answer5` char(30) COLLATE utf8_bin DEFAULT NULL,
		  `answer6` char(30) COLLATE utf8_bin DEFAULT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=190 ;");
	
	if (!$answers) {
		die('Error: ' . mysql_error());
	} 
		
	echo "create table 'groups'...<br />";	
		
	$groups = mysql_query("
		CREATE TABLE IF NOT EXISTS `groups` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `name` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '',
		  `userID` int(11) NOT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=59 ;");

	if (!$groups) {
		die('Error: ' . mysql_error());
	} 
	
	echo "create table 'messages'...<br />";	
		
	$messages = mysql_query("
		CREATE TABLE IF NOT EXISTS `messages` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `userID` int(11) DEFAULT NULL,
		  `messageText` char(250) COLLATE utf8_bin DEFAULT NULL,
		  `enabled` tinyint(1) NOT NULL,
		  `password` varchar(4) COLLATE utf8_bin NOT NULL,
		  `messageGroup` varchar(50) COLLATE utf8_bin DEFAULT '',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC AUTO_INCREMENT=3642 ;");

	if (!$messages) {
		die('Error: ' . mysql_error());
	} 
	
	echo "create table 'results'...<br />";

	$results = mysql_query("
		CREATE TABLE IF NOT EXISTS `results` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `messageID` int(11) NOT NULL,
		  `answer1` int(50) NOT NULL DEFAULT '0',
		  `answer2` int(50) NOT NULL DEFAULT '0',
		  `answer3` int(50) NOT NULL DEFAULT '0',
		  `answer4` int(50) NOT NULL DEFAULT '0',
		  `answer5` int(50) NOT NULL DEFAULT '0',
		  `answer6` int(50) NOT NULL DEFAULT '0',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=71 ;");

	if (!$results) {
		die('Error: ' . mysql_error());
	} 
	
	echo "create table 'users'...<br />";
	
	$users = mysql_query("
		CREATE TABLE IF NOT EXISTS `users` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `name` char(20) COLLATE utf8_bin NOT NULL DEFAULT '',
		  `password` char(20) COLLATE utf8_bin DEFAULT NULL,
		  `email` varchar(50) COLLATE utf8_bin NOT NULL,
		  PRIMARY KEY (`id`,`name`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=12 ;");
	
	if (!$users) {
		die('Error: ' . mysql_error());
	} 	
	
	echo "<p><b>all tables created!</b></p>";
?>