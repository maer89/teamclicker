package controllers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.*;

import org.codehaus.jackson.node.ObjectNode;

import play.libs.Json;

import models.Answer;
import models.Message;
import models.Messages;
import play.*;
import play.api.libs.json.Writes;
import play.mvc.*;
import scala.util.parsing.json.JSONArray;
import scala.util.parsing.json.JSONObject;

import views.*;

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
    	return ok();
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
    public static Result delete(){
    	Map<String, String[]> queryParameters = request().queryString();
    	int messageID = Integer.parseInt(queryParameters.get("id")[0]);
    	
    	Message msg = m.getMessageWithID(messageID);
    	msg.delete();
    	int idx = m.getMessageIdx(messageID);
    	m.deleteMessage(idx);
    	
    	return ok();
    }
    
    /*edit message*/
    public static Result getMessage(){
    	return ok();
    }
    public static Result getAnswers(){
    	return ok();
    }
    
    /*save Changes*/
    public static Result saveChanges(){
    	return ok();
    }
    
    /*update Table*/
    public static Result updateTable() throws IOException{
    	m.ReadFromDB(userID);
    	ObjectNode result = Json.newObject();
    	result.put("name", "Marcel");
    	result.put("name", "Daniel");
    	/*for(int i = 0; i < m.size()-1; i++){
    		result.put("id",m.getMessage(i).getID());
    		result.put("user",m.getMessage(i).getUID());
    		result.put("text",m.getMessage(i).getText());
    		result.put("enabled",m.getMessage(i).getEnabled());
    		result.put("pw",m.getMessage(i).getPassword());
    	}*/
    	return ok(result);
    }
    
}
