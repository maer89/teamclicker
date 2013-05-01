import static play.test.Helpers.*;
import org.junit.*;
import play.mvc.*;
import static org.fest.assertions.Assertions.assertThat;

public class ControllersTest {

	@Test
	public void callIndex() {
		Result result = callAction(controllers.routes.ref.Application.index());
		assertThat(status(result)).isEqualTo(OK);
		assertThat(contentType(result)).isEqualTo("text/html");
	}
	
	@Test
	public void callAdmin() {
		Result result = callAction(controllers.routes.ref.Application.admin());
		assertThat(status(result)).isEqualTo(OK);
		assertThat(contentType(result)).isEqualTo("text/html");
	}
	
	@Test
	public void callQuestion() {
		Result result = callAction(controllers.routes.ref.Application.question());
		assertThat(status(result)).isEqualTo(OK);
		assertThat(contentType(result)).isEqualTo("text/html");
	}
	
	@Test
	public void callResult() {
		Result result = callAction(controllers.routes.ref.Application.result());
		assertThat(status(result)).isEqualTo(OK);
		assertThat(contentType(result)).isEqualTo("text/html");
	}
	
	@Test
	public void callGetQuestion() {
		Result result = callAction(controllers.routes.ref.Application.getQuestion(1, ""));
		assertThat(status(result)).isEqualTo(OK);
		assertThat(contentType(result)).isEqualTo("text/html");
	}
}
