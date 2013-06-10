import org.junit.*;

import models.*;
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
    	m.id = 1;
    	assertThat(m.id).isEqualTo(1);
    }
    
    @Test
    public void messageUID() {
    	Message m = new Message();
    	m.uID = 1;
    	assertThat(m.uID).isEqualTo(1);
    }
   
}
