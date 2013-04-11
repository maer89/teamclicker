package models;

public class Result {
	
	private int id = -1;
	private int mID = -1;
	private int count;
	
	public Result() {
		this.count = 0;
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
	
	public int getCount() {
		return this.count;
	}
	
	public void setCount(int value) {
		this.count = value;
	}
}
