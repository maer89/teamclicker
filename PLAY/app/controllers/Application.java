package controllers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.*;

import models.Answer;
import models.Message;
import play.*;
import play.mvc.*;

import views.*;

public class Application extends Controller {
  
    public static Result index() {
        return ok(views.html.index.render());
    }
    
    public static Result admin(){
    	return ok(views.html.admin.render());
    }
    
    public static Result question(){
    	return ok(views.html.question.render());
    }
    
    public static Result adminarea(){
    	return ok(views.html.adminarea.render());
    }
    
    public static Result result(){
    	return ok(views.html.result.render());
    }
    
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
     
}
