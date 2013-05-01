import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.JsonNode;
import org.junit.*;

import play.mvc.*;
import play.test.*;
import play.data.DynamicForm;
import play.data.validation.ValidationError;
import play.data.validation.Constraints.RequiredValidator;
import play.i18n.Lang;
import play.libs.F;
import play.libs.F.*;
import models.*;

import static play.test.Helpers.*;
import static org.fest.assertions.Assertions.*;


/**
*
* Simple (JUnit) tests that can call all parts of a play app.
* If you are interested in mocking a whole application, see the wiki for more details.
*
*/
public class ApplicationTest {

    @Test 
    public void simpleCheck() {
        int a = 1 + 1;
        assertThat(a).isEqualTo(2);
    }
    
    @Test
    public void renderTemplate() {
        //Content html = views.html.index.render("Your new application is ready.");
        //assertThat(contentType(html)).isEqualTo("text/html");
        //assertThat(contentAsString(html)).contains("Your new application is ready.");
    }
  
    
    // Tests for class User 
    @Test
    public void name() {
    	User u = new User();
    	u.setName("test");
    	assertThat(u.getName()).isEqualTo("test");
    }
    
    @Test
    public void password() {
    	User u = new User();
    	u.setPassword("pass");
    	assertThat(u.getPassword()).isEqualTo("pass");
    }
    
    @Test
    public void checkUserTrue() {
    	User u = new User();
    	u.setName("user");
    	u.setPassword("password");
    	boolean t = u.checkUser();
    	assertThat(t).isEqualTo(true);
    }
    
    @Test
    public void checkUserFalse() {
    	User u = new User();
    	u.setName("user");
    	u.setPassword("pass");
    	assertThat(u.checkUser()).isEqualTo(false);
    }
    
    
    // Tests for class Message
    @Test
    public void messageID() {
    	Message m = new Message();
    	m.setID(1);
    	assertThat(m.getID()).isEqualTo(1);
    }
    
    @Test
    public void messageUID() {
    	Message m = new Message();
    	m.setUID(1);
    	assertThat(m.getUID()).isEqualTo(1);
    }
   
}
