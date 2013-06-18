package controllers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import javax.sql.DataSource;

import org.codehaus.jackson.node.ObjectNode;

import play.db.DB;
import play.libs.Json;
import models.*;
import play.mvc.*;

public class Application extends Controller {
	
	private static Messages m = new Messages();
	
	/* shows index.html */
    public static Result index() {
        return ok(views.html.index.render());
    }
    
    /* shows admin.html */
    public static Result admin(){
    	return ok(views.html.admin.render());
    }
    
    /* shows question.html */
    public static Result question(){
    	return ok(views.html.question.render());
    }
    
    /* shows adminarea.html */
    public static Result adminarea() {
    	m = new Messages();
    	return ok(views.html.adminarea.render());
    }
    
    /* loads messages/questions for a specific user */
    public static Result loadMessages() throws IOException {
    	Map<String, String[]> queryParameters = request().queryString();
    	int userID = Integer.parseInt(queryParameters.get("id")[0]);
    	m.ReadFromDB(userID);
    	return ok();
    }
    
    /* shows result.html */
    public static Result result(){
    	return ok(views.html.result.render());
    }
    
    /*save Message*/
    public static Result saveMessage(){
    	Map<String, String[]> queryParameters = request().queryString();
    	Message msg = new Message(queryParameters.get("text")[0]);
    	Answer ans1 = new Answer(queryParameters.get("ans1")[0]);
    	Answer ans2 = new Answer(queryParameters.get("ans2")[0]);
    	Answer ans3 = new Answer(queryParameters.get("ans3")[0]);
    	Answer ans4 = new Answer(queryParameters.get("ans4")[0]);
    	Answer ans5 = new Answer(queryParameters.get("ans5")[0]);
    	Answer ans6 = new Answer(queryParameters.get("ans6")[0]);
    	int userID = Integer.parseInt(queryParameters.get("userID")[0]);
    	msg.group = queryParameters.get("group")[0]; 
    			

    	msg.addAnswer(ans1);
    	msg.addAnswer(ans2);
    	msg.addAnswer(ans3);
    	msg.addAnswer(ans4);
    	msg.addAnswer(ans5);
    	msg.addAnswer(ans6);
   	
    	msg.saveMessage(userID);
    	return ok();
    }
    
    /*enable message*/
    public static Result enable(){
    	Map<String, String[]> queryParameters = request().queryString();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	
    	Message msg = m.getMessageWithID(messageID);
    	msg.setEnabled(true);
    	return ok(Json.toJson(msg));
    }
    
    /*disable message*/
    public static Result disable(){
    	Map<String, String[]> queryParameters = request().queryString();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	
    	Message msg = m.getMessageWithID(messageID);
    	msg.setEnabled(false);
    	return ok();
    }
    
    /*delete message*/
    public static Result delete() throws IOException{
    	Map<String, String[]> queryParameters = request().queryString();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	
    	/*get message*/
    	Message msg = m.getMessageWithID(messageID);
    	
    	/*delete message from DB*/
    	msg.delete();
    	
    	/*delete message from messages*/
    	int idx = m.getMessageIdx(messageID);
    	m.deleteMessage(idx);
    	
    	return ok();
    }
    
    /*edit message*/
    public static Result getMessage(){
    	Map<String, String[]> queryParameters = request().queryString();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	Message msg = m.getMessageWithID(messageID);
    	
    	return ok(Json.toJson(msg));
    }
    
    /* get answers and text for message/question xy */ 
    public static Result getAnswers(){
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	Message mes = new Message();
    	mes.id = messageID;
    	ArrayList<Answer> a = mes.getAnswers();
    	Answer message = new Answer();
    	message.setText(mes.getTextFromDB());
    	a.add(message);
    	return ok(Json.toJson(a));
    }
    
    /*save changes*/
    public static Result saveChanges() throws IOException{
    	Map<String, String[]> queryParameters = request().queryString();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	String text = queryParameters.get("text")[0];
    	
    	Message msg = m.getMessageWithID(messageID);
    	
    	msg.updateAnswer(0, queryParameters.get("ans1")[0]);
    	msg.updateAnswer(1, queryParameters.get("ans2")[0]);
    	msg.updateAnswer(2, queryParameters.get("ans3")[0]);
    	msg.updateAnswer(3, queryParameters.get("ans4")[0]);
    	msg.updateAnswer(4, queryParameters.get("ans5")[0]);
    	msg.updateAnswer(5, queryParameters.get("ans6")[0]);
    	
    	msg.updateMessage(text, queryParameters.get("group")[0]);
    	
    	return ok();
    }
    
    /*update table*/
    public static Result updateTable() throws IOException{
    	m.clear();
    	Map<String, String[]> queryParameters = request().queryString();
    	int userID = Integer.parseInt(queryParameters.get("id")[0]);
		String content = m.ReadFromDBString(userID);			
    	return ok(content);
    }
    
    /*get Question */
    public static Result getQuestion(int id, String pw) {   	
    	return ok(views.html.showQuestion.render(id, pw));
    }
    
    /*check Question-Parameters */
    public static Result checkQuestion() {
    	/* get Paramters */
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	String messagePW = queryParameters.get("pw")[0];
    	
    	int res;
    	Message mes = new Message();
    	mes.id = messageID ;
    	mes.password = messagePW;
    	res = mes.check();
    	return ok(String.valueOf(res));
    }
    
    /* write the selected answer to DB */
    public static Result sendAnswer() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int q_id = Integer.parseInt(queryParameters.get("q_id")[0]);
    	int id = Integer.parseInt(queryParameters.get("answer")[0]);
    	
    	
    	Message mes = m.getMessageWithID(q_id);
    	if (mes == null) {
    		// message isn't in list --> add it
    		mes = new Message();
    		mes.id = q_id;
    		m.addMessage(mes);
    	} 
    	
    	Response r = mes.getResponse(id);
    	if (r == null) {
    		// response doesn't exist --> create it
    		r = new Response();
    		r.setMID(q_id);
    		r.setID(id);
    		mes.addResponse(r);
    		r.readFromDB();
    	} else {
    		// read actual values from DB
    		r.readFromDB();
    	}
    	r.setCount(r.getCount()+1);

    	// write response back to DB
    	r.writeToDB();
    	return ok();
    }
    
    /* login */
    public static Result login() {
    	User u = new User();
    	int res = -1;
    	
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	String name = queryParameters.get("user")[0];
    	String pw = queryParameters.get("pw")[0];
    	u.setName(name);
    	u.setPassword(pw);
    	if (u.checkUser()) {
    		res = u.getID();
    	}
    	return ok(String.valueOf(res));
    }

    /*get Result*/
    public static Result outcome() throws IOException{
    	Map<String, String[]> queryParameters = request().queryString();
    	int id = Integer.parseInt(queryParameters.get("id")[0]);
    	ObjectNode response = Json.newObject();
    			
		//DB....
		@SuppressWarnings("unused")
		DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		int ans1=0,ans2=0,ans3=0,ans4=0,ans5=0,ans6 = 0;
		int ans1neu=0,ans2neu=0,ans3neu=0,ans4neu=0,ans5neu=0,ans6neu=0;
		String ans1text="",ans2text="",ans3text="",ans4text="",ans5text="",ans6text="";
		int answers = 0;
		String msg = "";
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		/*get answers*/
		String res ="SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = " + id;
		try{
			ResultSet result = stmt.executeQuery(res);
			while(result.next()){
				if(result.getString("answer3").compareTo("") == 0){ 
					answers = 2;
				}else if(result.getString("answer4").compareTo("")  == 0){
					answers = 3;
				}else if(result.getString("answer5").compareTo("")  == 0){
					answers = 4;
				}else if(result.getString("answer6").compareTo("")  == 0){
					answers = 5;
				}else{
					answers = 6;
				}
				ans1text = result.getString("answer1");
				ans2text = result.getString("answer2");
				ans3text = result.getString("answer3");
				ans4text = result.getString("answer4");
				ans5text = result.getString("answer5");
				ans6text = result.getString("answer6");
			}
		}catch(Exception e){
		}
		
		/* get answers from results */
		String sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID =" + id;
		try {
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()){
				ans1 = rs.getInt("answer1");
				ans2 = rs.getInt("answer2");
				ans3 = rs.getInt("answer3");
				ans4 = rs.getInt("answer4");
				ans5 = rs.getInt("answer5");
				ans6 = rs.getInt("answer6");
			}
		} catch (SQLException e) {
			System.out.println(e.toString());
		}	
		
		/* get the message text */
		sql= "SELECT messageText FROM messages WHERE id = " + id;
		try{
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()){
				msg = rs.getString("messageText");
			}
		}catch(SQLException esql){
		}
		
		long start = System.currentTimeMillis();
		long end = System.currentTimeMillis();
		
		boolean i = true;
		while(end-start < 2000){
			sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID = " + id;
			try {
				ResultSet rs = stmt.executeQuery(sql);
				while(rs.next()){
					ans1neu = rs.getInt("answer1");
					ans2neu = rs.getInt("answer2");
					ans3neu = rs.getInt("answer3");
					ans4neu = rs.getInt("answer4");
					ans5neu = rs.getInt("answer5");
					ans6neu = rs.getInt("answer6");
				}
			} catch (SQLException e) {
				System.out.println(e.toString());
			}
			
			if(ans1neu != ans1 || ans2neu != ans2 || ans3neu != ans3 || ans4neu != ans4 || ans5neu != ans5 || ans6neu != ans6 || i==true){
				response.put("ans1text",ans1text);
				response.put("ans1", ans1neu);
				response.put("ans2text", ans2text);
				response.put("ans2", ans2neu);
				response.put("ans3text", ans3text);
				response.put("ans3", ans3neu);
				response.put("ans4text", ans4text);
				response.put("ans4", ans4neu);
				response.put("ans5text", ans5text);
				response.put("ans5", ans5neu);
				response.put("ans6text", ans6text);
				response.put("ans6", ans6neu);
				response.put("answers",answers);
				response.put("msg", msg);
				    					
				
				if(!i){
					return created(response);
				}
			}
			i = false;
			end = System.currentTimeMillis();
		}
		
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }    			
    	return created(response);
    }
    
    /* load groups for this user */
    @SuppressWarnings("unused")
	public static Result loadGroups() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int uid = Integer.parseInt(queryParameters.get("uid")[0]);
    	
    	// openDB
    	DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		Statement stmt = null;
		
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
    	
		String sql = "SELECT * FROM groups WHERE userID = " + uid;
		ArrayList<Group> a = new ArrayList<Group>();
		Group AGroup = null;
		try {
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				AGroup = new Group();
				AGroup.name = rs.getString("name");
				AGroup.id = rs.getInt("id");
				a.add(AGroup);
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// closeDB
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }

		// return ArrayList
    	return ok(Json.toJson(a));
    }

    /* add a new Group to this users groupslist */
    @SuppressWarnings("unused")
	public static Result addGroup() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int uid = Integer.parseInt(queryParameters.get("uid")[0]);
    	String name = queryParameters.get("groupName")[0];
    	
    	// openDB
    	DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		Statement stmt = null;
		
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
    	
		// check if group already exists
		String sql = "SELECT * FROM groups WHERE userID = " + uid + " AND name = '" + name + "'";
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if(!rs.next()) {
				sql = "INSERT INTO groups (name, userID) VALUES ('" + name + "'," + uid + ")";
				
				try {
					int res = stmt.executeUpdate(sql);
				}catch (SQLException e1) {
					System.out.println(e1.toString());
				}
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// closeDB
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }

		// return ArrayList
    	return ok();
    }
    
    /* delete a group from this user */
    @SuppressWarnings("unused")
	public static Result deleteGroup() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int uid = Integer.parseInt(queryParameters.get("uid")[0]);
    	String name = queryParameters.get("name")[0];
    	
    	// openDB
    	DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		Statement stmt = null;
		
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
    	
		// delete group in groups table
		String sql = "DELETE FROM groups WHERE userID = " + uid + " AND name = '" + name + "'";
		try {
			int res = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// first get all messageIDs to delete the answers to the questions 
		sql = "SELECT id FROM messages WHERE messageGroup = '" + name + "'";
		ArrayList<Integer> a = new ArrayList<Integer>();
		try {
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {
				a.add(rs.getInt("id"));
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// delete messages of deleted group in messages
		sql = "DELETE FROM messages WHERE messageGroup = '" + name + "'";
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// delete answers to the deleted questions
		for (int i = 0; i < a.size()-1; i++) {
			sql = "DELETE FROM answers WHERE messageID = " + a.get(i);
			try {
				int rs = stmt.executeUpdate(sql);
			}catch (SQLException e1) {
				System.out.println(e1.toString());
			}
		}
		
		// closeDB
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }
    	return ok();
    }
    
    /* set all answer-counts for this question to 0 */
    public static Result resetAnswers() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int id = Integer.parseInt(queryParameters.get("id")[0]);
    	m.getMessageWithID(id).resetAnswers();
    	return ok();
    }
    
    /* Register */
    @SuppressWarnings("unused")
	public static Result checkEmail() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	String mail = queryParameters.get("mail")[0];
    	
    	int res = -1;
    	
    	// openDB
    	DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		Statement stmt = null;
		
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
    	
		// delete group in groups table
		String sql = "SELECT id FROM users WHERE email = '" + mail + "'";
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				res = 0;
			} else {
				res = 1;
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// closeDB
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }
    	
    	return ok(String.valueOf(res));
    }
    
    /* check if username is already in use */
    @SuppressWarnings("unused")
	public static Result checkUsername() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	String name = queryParameters.get("name")[0];
    	
    	int res = -1;
    	
    	// openDB
    	DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		Statement stmt = null;
		
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
    	
		// delete group in groups table
		String sql = "SELECT id FROM users WHERE name = '" + name + "'";
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				res = 0;
			} else {
				res = 1;
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// closeDB
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }
    	
    	return ok(String.valueOf(res));
    }
    
    /* write this user to the DB */
    @SuppressWarnings("unused")
	public static Result writeUserToDB() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	String mail = queryParameters.get("mail")[0];
    	String pass = queryParameters.get("pass")[0];
    	String name = queryParameters.get("name")[0];
    	    	
    	// openDB
    	DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		Statement stmt = null;
		
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
    	
		// delete group in groups table
		String sql = "INSERT INTO users (name, password, email) VALUES ('" + name + "', '" + pass + "', '" + mail + "')";
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// closeDB
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }
    	
    	return ok();
    }
    
    /* Creates all the tables which are needed to get started with this Application */
   @SuppressWarnings("unused")
public static Result dbInstall() {
	   // openDB
   		DataSource ds = DB.getDataSource();
		Connection con = DB.getConnection();
		
		Statement stmt = null;
		
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
   	
		// create table 'answers'
		String sql = "CREATE TABLE IF NOT EXISTS `answers` ("
					 + "`id` int(11) NOT NULL AUTO_INCREMENT, "
					 + "`messageID` int(11) DEFAULT NULL, "
					 + "`answer1` char(30) COLLATE utf8_bin DEFAULT NULL, "
				 	 + "`answer2` char(30) COLLATE utf8_bin DEFAULT NULL, "
			 	 	 + "`answer3` char(30) COLLATE utf8_bin DEFAULT NULL, "
		 	 		 + "`answer4` char(30) COLLATE utf8_bin DEFAULT NULL, "
		 	 		 + "`answer5` char(30) COLLATE utf8_bin DEFAULT NULL, "
		 	 		 + "`answer6` char(30) COLLATE utf8_bin DEFAULT NULL, "
		 	 		 + "PRIMARY KEY (`id`)"
		 	 		 + ") ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=0 ;";
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// create table 'groups'
		sql = "CREATE TABLE IF NOT EXISTS `groups` ("
			  + "`id` int(11) NOT NULL AUTO_INCREMENT, "
			  + "`name` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '', "
			  + "`userID` int(11) NOT NULL, "
			  + "PRIMARY KEY (`id`) "
			  + ") ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=0 ;";
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// create table 'messages'
		sql = "CREATE TABLE IF NOT EXISTS `messages` ("
			  + "`id` int(11) NOT NULL AUTO_INCREMENT, "
			  + "`userID` int(11) DEFAULT NULL, "
			  + "`messageText` char(250) COLLATE utf8_bin DEFAULT NULL, "
			  + "`enabled` tinyint(1) NOT NULL, "
			  + "`password` varchar(4) COLLATE utf8_bin NOT NULL, "	
			  + "`messageGroup` varchar(50) COLLATE utf8_bin DEFAULT '', "
			  + "PRIMARY KEY (`id`) "
			  + ") ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC AUTO_INCREMENT=0 ;";
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// create table 'results'
		sql = "CREATE TABLE IF NOT EXISTS `results` ("
			  + "`id` int(11) NOT NULL AUTO_INCREMENT,"
			  + "`messageID` int(11) NOT NULL, "
			  + "`answer1` int(50) NOT NULL DEFAULT '0', "
			  + "`answer2` int(50) NOT NULL DEFAULT '0', "
			  + "`answer3` int(50) NOT NULL DEFAULT '0', "
			  + "`answer4` int(50) NOT NULL DEFAULT '0', "
			  + "`answer5` int(50) NOT NULL DEFAULT '0', "
			  + "`answer6` int(50) NOT NULL DEFAULT '0', "
			  + "PRIMARY KEY (`id`) "
			  + ") ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=0 ;";
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {

		}
		
		// create table 'users'
		sql = "CREATE TABLE IF NOT EXISTS `users` ("
			  + "`id` int(11) NOT NULL AUTO_INCREMENT, "
			  + "`name` char(20) COLLATE utf8_bin NOT NULL DEFAULT '', "
			  + "`password` char(20) COLLATE utf8_bin DEFAULT NULL, "
			  + "`email` varchar(50) COLLATE utf8_bin NOT NULL, "
			  + "PRIMARY KEY (`id`,`name`) "
			  + ") ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=0 ;";
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		// closeDB
		if (con != null) {
           try {
               con.close();
           } catch (Exception e) {
           }
       }
   	
		return ok("All tables were created!");
   }
}