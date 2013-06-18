package models;

public class Answer {
	
	private int id = -1; // id
	private int mID = -1;  // messageID
	private String text = ""; // Text for this answer
	
	public Answer() {};
	
	public Answer(String text){
		this.text = text;
	}
	
	public int getID() {
		return this.id;
	}
	
	public int getMID() {
		return this.mID;
	}
	
	public void setMID(int mID) {
		this.mID = mID;
	}
	
	public String getText() {
		return this.text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
}
