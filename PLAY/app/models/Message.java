package models;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

import javax.sql.DataSource;

import play.db.*;

public class Message {
	
	private int id = -1;
	private int uID = -1;
	private String text = "";
	private boolean enabled = false;
	private String password = "";
	private Connection con = null;
	private DataSource ds = null;
	
	private ArrayList<Answer> answers;
	private ArrayList<Result> results;
	
	public Message() {
		this.answers = new ArrayList<Answer>();
		this.results = new ArrayList<Result>();
	};
	
	public Message(String text) {
		this.answers = new ArrayList<Answer>();
		this.results = new ArrayList<Result>();
		this.text = text;
	}
	
	/*Database*/
	private void openDB() {
		ds = DB.getDataSource();
		con = DB.getConnection();
	}
	
	private void closeDB() {
		if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
            }
        }
	}
	
	public void saveMessage() {
		openDB();
		
		Statement stmt = null;
		String ans1 = answers.get(0).getText();
		String ans2 = answers.get(1).getText();
		String ans3 = answers.get(2).getText();
		String ans4 = answers.get(3).getText();
		String ans5 = answers.get(4).getText();
		String ans6 = answers.get(5).getText();
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "INSERT INTO messages VALUES (null, 1 ,'"+getText()+"',0,'')";
		try {
			int rs = stmt.executeUpdate(sql);
		} catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		sql = "SELECT id FROM messages WHERE messageText = '"+getText()+"'";
		try {
			ResultSet rs = stmt.executeQuery(sql);
			rs.next();
			this.id = rs.getInt("id");
		} catch (SQLException e) {
			System.out.println(e.toString());
		}		
		
		
		sql = "INSERT INTO answers VALUES(null,"+id+",'"+ans1+"','"+ans2+"','"+ans3+"','"+ans4+"','"+ans5+"','"+ans6+"')";
		try {
			int rs = stmt.executeUpdate(sql);
		} catch (SQLException e) {
			System.out.println(e.toString());
		}
		
		closeDB();
	}
	
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
