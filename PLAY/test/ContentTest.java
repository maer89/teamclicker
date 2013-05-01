import static play.test.Helpers.*;
import org.junit.*;
import play.mvc.*;
import static org.fest.assertions.Assertions.assertThat;

public class ContentTest {

	@Test
	public void indexViewTest() {
		Content html = views.html.index.render();
		assertThat(contentType(html)).isEqualTo("text/html");
	}
	
	@Test
	public void adminareaViewTest() {
		Content html = views.html.adminarea.render();
		assertThat(contentType(html)).isEqualTo("text/html");
	}
	
	@Test
	public void adminViewTest() {
		Content html = views.html.admin.render();
		assertThat(contentType(html)).isEqualTo("text/html");
	}
	
	@Test
	public void mainViewTest() {
		Content html = views.html.main.render("test", null);
		assertThat(contentType(html)).isEqualTo("text/html");
		assertThat(contentAsString(html)).contains("test");
	}
	
	@Test
	public void questionViewTest() {
		Content html = views.html.question.render();
		assertThat(contentType(html)).isEqualTo("text/html");
	}
	
	@Test
	public void resultViewTest() {
		Content html = views.html.result.render();
		assertThat(contentType(html)).isEqualTo("text/html");
	}
	
	@Test
	public void showQuestionViewTest() {
		Content html = views.html.showQuestion.render(1, "");
		assertThat(contentType(html)).isEqualTo("text/html");
	}
}
