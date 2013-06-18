#**Clicker**#

###Index###
1. Description
2. Getting started
3. Manual

###Description###
The clicker is a nice application to make polls. You can free login and create your own questions easily.
Then people can answer a question and display the results in beautiful diagrams.

###Getting started###
* #####Requirements#####

  - For the php-version you only need a MySQL database and an apache server.
  - For the play-version you have to download and install the play-framework in version 2.1 as you can see 
  	[here](http://www.playframework.com/documentation/2.1.1/Installing). You also need a MySQL database.
* #####Setup database#####

	- For the php-version:
  	To setup your MySQL database you have to edit the database 
  	informations in DB_data.php like this: 
  

		```php
		  <?php
		    $ServerAdr = "my server address";
			  $UserName = "my username";
			  $pw = "my password";
			  $database = "my database";
		  ?>
		```
		After that you can run the PHP/DB_install.php script to create the required tables.
  	
	- For the play-version:
		Firstly you have to install the jdbc-mysql-driver on your system and then
		you have to edit the database informations in the application.conf file:

		```
			# Database configuration
			# ~~~~~ 
			# You can declare as many datasources as you want.
			# By convention, the default datasource is named `default`
			#
			db.default.driver=com.mysql.jdbc.Driver
			db.default.url="my server adress"
			db.default.user="my username"
			db.default.password="my password"
			#
		```
		After that you can run localhost:9000/db_install to create the required database tables.
		To start a play project you can read the documentation on the [play framework website](http://www.playframework.com/documentation/2.1.1/PlayConsole).


###Manual###
* #####Registration#####

	First register at "admin" -> "Register" by entering your email, your username and your password. Please klick the button "Register"
	to confirm your entys.
* #####Login#####

	Now you can login with your registered username and password.
* #####Create question#####

	In the adminarea you can create your own questions and your own groups.
* #####Show question#####

	Under the menu item "show questions" you can see your questions which you have already created.
	In the table you can enable, disable, reset and delete your questions. If you enable a question you will see
	the generated password for your question and a further button to create a qr code. 
	You can also see a hyperlink which leads you directly to the question. 
	To show the result of your poll you can click on the icon in the result column.
* #####Let people answer your question#####

	You have three ways to let people answer your questions.
	1. People can enter the question id and the belonging password under the menu item "question" to answers a question.
	2. People can scan the generated qr code of a question with their smartphone or their tablet and then can
		directly answer the question.
	3. People can follow the special link to answer a question.

