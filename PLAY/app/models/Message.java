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
		
		// in Answers eigene Methode writeToDB (oder so ähnlich) implementieren
		// und diese dann von hier mit den einzelnen Answer-Objekten aufrufen
		sql = "INSERT INTO answers VALUES(null,"+id+",'"+ans1+"','"+ans2+"','"+ans3+"','"+ans4+"','"+ans5+"','"+ans6+"')";
		try {
			int rs = stmt.executeUpdate(sql);
		} catch (SQLException e) {
			System.out.println(e.toString());
		}
		
		closeDB();
	}
	
	public void delete(){
		openDB();
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "DELETE FROM messages WHERE id = " + this.getID();
		String sqlans = "DELETE FROM answers WHERE messageID = " + this.getID();
		try {
			int rs = stmt.executeUpdate(sql);
			int rsans = stmt.executeUpdate(sqlans);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		closeDB();
	}
	
	public void setID(int id) {
		this.id = id;
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
		String text = "";
		openDB();
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "SELECT messageText FROM messages WHERE id = " + getID();
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				text = rs.getString("messageText");
			}
		} catch (SQLException e1) {
			System.out.println(e1.toString());
		}		
		closeDB();
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public boolean getEnabled() {
		return this.enabled;
	}
	
	public void setEnabled(boolean e) {
		this.enabled = e;
		openDB();
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "UPDATE messages SET enabled=1 WHERE id = " + this.getID();
		try {
			int rs = stmt.executeUpdate(sql);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		if(e == true){
			/*enable*/
			/*password*/
			String pw = "1234";
			
			sql = "UPDATE messages SET password='"+pw+"' WHERE id=" + this.getID();
			try {
				int rs = stmt.executeUpdate(sql);
			}catch (SQLException e1) {
				System.out.println(e1.toString());
			}
		}else{
			/*disable*/
			sql = "UPDATE messages SET enabled = 0 WHERE id=" + this.getID();
			String sqlpw = "UPDATE messages SET password='' WHERE id=" + this.getID();
			try {
				int rs = stmt.executeUpdate(sql);
				int rspw = stmt.executeUpdate(sqlpw);
			}catch (SQLException e1) {
				System.out.println(e1.toString());
			}
		}
		
		closeDB();
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
	
	public Answer addAnswer() {
		Answer a = new Answer();
		addAnswer(a);
		return a;
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
		boolean res = false;
		openDB();
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = " + getID();
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				Answer a1 = addAnswer();
				Answer a2 = addAnswer();
				Answer a3 = addAnswer();
				Answer a4 = addAnswer();
				Answer a5 = addAnswer();
				Answer a6 = addAnswer();
				
				a1.setText(rs.getString("answer1"));
				a2.setText(rs.getString("answer2"));
				a3.setText(rs.getString("answer3"));
				a4.setText(rs.getString("answer4"));
				a5.setText(rs.getString("answer5"));
				a6.setText(rs.getString("answer6"));
				
				res = true;
			}
		} catch (SQLException e1) {
			System.out.println(e1.toString());
		}		
		closeDB();
		
		if (res) return answers;
		else return null;
	}
	
	public ArrayList<Result> getResults() {
		return this.results;
	}
	
	public int check() {
		
		openDB();
		int res = -1;
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "SELECT password FROM messages WHERE id = " + getID() 
					 + " AND enabled  = 1";
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
					// Check pw
					if (getPassword().equals(rs.getString("password"))) {
						// correct pw
						res = 1;
					} else {
						// wrong pw
						res = 0;
					}	
			}
		} catch (SQLException e1) {
			e1.printStackTrace();
		}		
		closeDB();
		return res;
	}
}
