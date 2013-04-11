package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

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
     
}
