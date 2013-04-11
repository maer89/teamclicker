package models;

public class User {
	
	private int id = -1;
	private String name = "";
	private String password = "";
	
	public User() {};
	
	public int getID() {
		return this.id;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPassword() {
		return this.password;
	}
}
