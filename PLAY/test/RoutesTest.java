import org.junit.*;

import play.mvc.Result;
import static play.test.Helpers.fakeRequest;
import static play.test.Helpers.routeAndCall;

import static play.test.Helpers.*;
import static org.fest.assertions.Assertions.*;

public class RoutesTest {
	
	@SuppressWarnings("deprecation")
	@Test
	public void mainRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/"));
		assertThat(result).isNotNull();
		result = routeAndCall(fakeRequest(GET, "/index"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void adminRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/admin"));
		assertThat(result).isNotNull();
	}

	@SuppressWarnings("deprecation")
	@Test
	public void questionnRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/question"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void adminareaRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/adminarea"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void resultRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/result"));
		assertThat(result).isNotNull();
	}

	@SuppressWarnings("deprecation")
	@Test
	public void saveRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/save"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void enableRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/enable"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void disableRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/disable"));
		assertThat(result).isNotNull();
	}

	@SuppressWarnings("deprecation")
	@Test
	public void deleteRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/delete"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void getMessageRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/getMessage"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void saveChangesRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/saveChanges"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void updateTableRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/updateTable"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void getQuestionRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/getQuestion?id=1&pw=''"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void loadMessagesRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/loadMessages"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void outcomeRoute() {
		Result result = routeAndCall(fakeRequest(GET, "/outcome"));
		assertThat(result).isNotNull();
	}

	@SuppressWarnings("deprecation")
	@Test
	public void checkQuestionRoute() {
		Result result = routeAndCall(fakeRequest(POST, "/checkQuestion"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void getAnswersRoute() {
		Result result = routeAndCall(fakeRequest(POST, "/getAnswers"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void sendAnswerRoute() {
		Result result = routeAndCall(fakeRequest(POST, "/sendAnswer"));
		assertThat(result).isNotNull();
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void loginRoute() {
		Result result = routeAndCall(fakeRequest(POST, "/login"));
		assertThat(result).isNotNull();
	}
}
