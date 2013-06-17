#**Clicker**#

###Index###
1. Description
2. Getting started
3. Manual

###Description###

###Getting started###
* Requirements
  - For the php-version you only need a MySQL database and an apache server.
  - For the play-version you have to download and install the play-framework in version 2.1 and you also need a 
    MySQL database.
* Setup database	
	- For the php-versions:
  	To setup your MySQL database you have to edit the database 
  	informations in DB_data.php like into the example: 
  

		```php
		  <?php
		    $ServerAdr = "my server address";
			  $UserName = "my username";
			  $pw = "my password";
			  $database = "my database";
		  ?>
		```

  	After that you can run the DB_install.php script.
  	
	- For the play-version:
		You also have to edit the database informations into the application.conf file:

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


###Manual###


