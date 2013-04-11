package models;

import java.util.ArrayList;

public class Message {
	
	private int id = -1;
	private int uID = -1;
	private String text = "";
	private boolean enabled = false;
	private String password = "";
	
	private ArrayList<Answer> answers;
	private ArrayList<Result> results;
	
	public Message() {
		this.answers = new ArrayList<Answer>();
		this.results = new ArrayList<Result>();
	};
	
	public int getID() {
		return this.id;
	}
	
	public int getUID() {
		return this.uID;
	}
	
	public void setUID(int uID) {
		this.uID = uID;
	}
	
	public String getText() {
		return this.text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public boolean getEnabled() {
		return this.enabled;
	}
	
	public void setEnabled(boolean e) {
		this.enabled = e;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String pw) {
		this.password = pw;
	}
	
	public void addAnswer(Answer aAnswer) {
		this.answers.add(aAnswer);
	}
	
	public void removeAnswer(Answer aAnswer) {
		this.answers.remove(aAnswer);
	}
	
	public void removeAnswerWithIdx(int idx) {
		this.answers.remove(idx);
	}
	
	public Answer getAnswer(int idx) {
		return this.answers.get(idx);
	}
	
	public ArrayList<Answer> getAnswers() {
		return this.answers;
	}
	
	public ArrayList<Result> getResults() {
		return this.results;
	}
}
