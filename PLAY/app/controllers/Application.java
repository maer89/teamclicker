package controllers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import play.libs.Json;
import models.*;
import play.mvc.*;

public class Application extends Controller {
	
	private static Messages m = new Messages();
	private static int userID = 1;
	
  
    public static Result index() {
        return ok(views.html.index.render());
    }
    
    public static Result admin(){
    	return ok(views.html.admin.render());
    }
    
    public static Result question(){
    	return ok(views.html.question.render());
    }
    
    public static Result adminarea() throws IOException{
    	m = new Messages();
    	userID = 1;
    	m.ReadFromDB(userID);
    	return ok(views.html.adminarea.render());
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

    	msg.addAnswer(ans1);
    	msg.addAnswer(ans2);
    	msg.addAnswer(ans3);
    	msg.addAnswer(ans4);
    	msg.addAnswer(ans5);
    	msg.addAnswer(ans6);
    	
    	msg.saveMessage();
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
    	
    	File file = new File("update.txt");
		FileWriter writer = new FileWriter(file,true);
		writer.write("ans1 "+ queryParameters.get("ans1")[0] + "\n"
				+ "ans4 " + queryParameters.get("ans4")[0] + "\n");
		writer.flush();
		writer.close();
    	
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
}
