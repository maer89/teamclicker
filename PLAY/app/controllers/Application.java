package controllers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import javax.sql.DataSource;

import play.db.DB;
import play.libs.Comet;
import play.libs.Json;
import models.*;
import play.mvc.*;

public class Application extends Controller {
	
	private static Messages m = new Messages();
	
  
    public static Result index() {
        return ok(views.html.index.render());
    }
    
    public static Result admin(){
    	return ok(views.html.admin.render());
    }
    
    public static Result question(){
    	return ok(views.html.question.render());
    }
    
    public static Result adminarea() {
    	m = new Messages();
    	return ok(views.html.adminarea.render());
    }
    
    /* loads messages for specific user */
    public static Result loadMessages() throws IOException {
    	Map<String, String[]> queryParameters = request().queryString();
    	int userID = Integer.parseInt(queryParameters.get("id")[0]);
    	m.ReadFromDB(userID);
    	return ok();
    }
    
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
    
    /* get answers for question xy */ 
    public static Result getAnswers(){
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	Message mes = new Message();
    	mes.setID(messageID);
    	ArrayList<Answer> a = mes.getAnswers();
    	Answer message = new Answer();
    	message.setText(mes.getTextFromDB());
    	a.add(message);
    	return ok(Json.toJson(a));
    }
    
    /*save Changes*/
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
    	
    	msg.updateMessage(text);
    	
    	return ok();
    }
    
    /*update Table*/
    public static Result updateTable() throws IOException{
    	m.clear();
    	Map<String, String[]> queryParameters = request().queryString();
    	int userID = Integer.parseInt(queryParameters.get("id")[0]);
    	m.ReadFromDB(userID);
    	return ok(Json.toJson(m.getList()));
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
    	mes.setID(messageID);
    	mes.setPassword(messagePW);
    	res = mes.check();
    	return ok(String.valueOf(res));
    }
    
    /* send the selected answer to DB */
    public static Result sendAnswer() {
    	Map<String, String[]> queryParameters = request().body().asFormUrlEncoded();
    	int q_id = Integer.parseInt(queryParameters.get("q_id")[0]);
    	int id = Integer.parseInt(queryParameters.get("answer")[0]);
    	
    	Message mes = m.getMessageWithID(q_id);
    	if (mes == null) {
    		// message isn't in list --> add it
    		mes = new Message();
    		mes.setID(q_id);
    		m.addMessage(mes);
    	} 
    	
    	Response r = mes.getResponse(id);
    	if (r == null) {
    		// response doesn't exist --> create it
    		r = new Response();
    		r.setMID(q_id);
    		r.setID(id);
    		mes.addResponse(r);
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
    	int userID = Integer.parseInt(queryParameters.get("id")[0]);
    	
    	return ok(new Comet("parent.test"){
    		public void onConnected(){
    			
    			//DB....
    			DataSource ds = DB.getDataSource();
    			Connection con = DB.getConnection();
    			
    			int ans1=0,ans2=0,ans3=0,ans4=0,ans5=0,ans6 = 0;
    			int ans1neu=0,ans2neu=0,ans3neu=0,ans4neu=0,ans5neu=0,ans6neu=0;
    			int answers = 0;
    			
    			Statement stmt = null;
    			try {
    				stmt = con.createStatement();
    			} catch (SQLException e2) {
    				System.out.println(e2.toString());
    			}
    			/*get answers*/
    			String res ="SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = 101";
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
	    				/*$ans1text = $data['answer1'];
	    				$ans2text = $data['answer2'];
	    				$ans3text = $data['answer3'];
	    				$ans4text = $data['answer4'];
	    				$ans5text = $data['answer5'];
	    				$ans6text = $data['answer6'];*/
	    			}
    			}catch(Exception e){
    				
    			}
    			
    			String sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID = 101";
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
    			
    			long start = System.currentTimeMillis();
    			long end = System.currentTimeMillis();
    			
    			boolean i = true;
    			while(end-start < 2000){
    				sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID = 101";
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
    				
    				if(ans1neu > ans1 || ans2neu > ans2 || ans3neu > ans3 || ans4neu > ans4 || ans5neu > ans5 || ans6neu > ans6 || i==true){
    					ArrayList<Integer> response = new ArrayList<Integer>();
    					response.add(ans1neu);
    					response.add(ans2neu);
    					response.add(ans3neu);
    					response.add(ans4neu);
    					response.add(ans5neu);
    					response.add(ans6neu);
    					response.add(answers);
    					
    					this.sendMessage(Json.toJson(response));
    					
    	    			close();
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
    			//this.sendMessage("Text...");
    		}
    	});
    }
}
