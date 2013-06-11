package models;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

import javax.sql.DataSource;

import org.apache.commons.lang3.RandomStringUtils;

import play.db.*;

public class Message {
	
	public int id = -1;
	public int uID = -1;
	public String text = "";
	public boolean enabled = false;
	public String password = "";
	public String group = "";
	
	private Connection con = null;
	@SuppressWarnings("unused")
	private DataSource ds = null;
	
	private ArrayList<Answer> answers;
	private ArrayList<Response> results;
	
	public Message() {
		this.answers = new ArrayList<Answer>();
		this.results = new ArrayList<Response>();
	};
	
	public Message(String text) {
		this.answers = new ArrayList<Answer>();
		this.results = new ArrayList<Response>();
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
	
	@SuppressWarnings("unused")
	public void saveMessage(int userID) {
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
		
		String sql = "INSERT INTO messages VALUES (null, " + userID + " ,'"+this.text+"',0,'', '" + this.group + "')";
		try {
			int rs = stmt.executeUpdate(sql);
		} catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		sql = "SELECT id FROM messages WHERE messageText = '"+this.text+"'";
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
	
	@SuppressWarnings("unused")
	public void delete(){
		openDB();
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "DELETE FROM messages WHERE id = " + this.id;
		String sqlans = "DELETE FROM answers WHERE messageID = " + this.id;
		try {
			int rs = stmt.executeUpdate(sql);
			int rsans = stmt.executeUpdate(sqlans);
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		closeDB();
	}
	
	@SuppressWarnings("unused")
	public void updateMessage(String text, String group) throws IOException{
		openDB();
		this.text = text;
		this.group = group;
		
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
		
		String sql = "UPDATE messages SET messageText = '" + this.text + "', messageGroup = '" + this.group + "' WHERE id = " + this.id;
		String sqlans = "UPDATE answers SET answer1='"+ans1+"',answer2='"+ans2+"',answer3='"+ans3+"',answer4='"+ans4+"',answer5='"+ans5+"',answer6='"+ans6+"' WHERE messageID = " + this.id;
		try {
			int rs = stmt.executeUpdate(sql);
			rs = stmt.executeUpdate(sqlans);
		} catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		closeDB();
	}
	
	public void updateAnswer(int id, String text) throws IOException{
			this.answers.get(id).setText(text);
	}
	/*  has to be commented out because with this Json.toJson(Message) doesn't work anymore (don't know why)
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
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public boolean getEnabled() {
		return this.enabled;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String pw) {
		this.password = pw;
	}
	
	*/
	public String getTextFromDB() {
		String s = "";
		openDB();
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			//System.out.println(e2.toString());
		}
		String sql = "SELECT messageText FROM messages WHERE id = " + this.id;
		try{
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()){
				s = rs.getString("messageText");
			}
		}catch(SQLException ex){
			//System.out.println(ex.toString());
		}
		closeDB();
		return s;
	}
	
	@SuppressWarnings("unused")
	public void setEnabled(boolean e) {
		this.enabled = e;
		openDB();
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		if(e == true){
			/*enable*/
			/*generate password*/
			String pw="";
			String getpw = "SELECT password FROM messages WHERE id = " + this.id;
			
			/*get pw from DB*/
			try{
				ResultSet rs = stmt.executeQuery(getpw);
				while (rs.next()){
					pw = rs.getString("password");
				}
			}catch(SQLException ex){
				System.out.println(ex.toString());
			}
			
			if(pw.equals("")){
				pw = RandomStringUtils.randomAlphanumeric(4);
				this.password = pw;
				String sql = "UPDATE messages SET enabled=1, password='"+pw+"' WHERE id=" + this.id;
				try {
					int rs = stmt.executeUpdate(sql);
				}catch (SQLException e1) {
					System.out.println(e1.toString());
				}
			}else{
				//do nothing
			}
		}else{
			/*disable*/
			String sql = "UPDATE messages SET enabled = 0, password='' WHERE id=" + this.id;
			try {
				int rs = stmt.executeUpdate(sql);
			}catch (SQLException e1) {
				System.out.println(e1.toString());
			}
		}
		
		closeDB();
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
    	
		String sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM answers WHERE messageID = " + this.id;
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
			} else {
				// no Answers in db
				// send empty answers
				Answer a1 = addAnswer();
				Answer a2 = addAnswer();
				Answer a3 = addAnswer();
				Answer a4 = addAnswer();
				Answer a5 = addAnswer();
				Answer a6 = addAnswer();
				
				a1.setText("");
				a2.setText("");
				a3.setText("");
				a4.setText("");
				a5.setText("");
				a6.setText("");
				
				res = true;
			}
		} catch (SQLException e1) {
			System.out.println(e1.toString());
		}		
		closeDB();
		
		if (res) return answers;
		else return null;
	}
	
	public ArrayList<Response> getResults() {
		return this.results;
	}
	
	public Response getResponse(int id) {
		for (int i = 0; i <= results.size()-1; i++) {
			if (results.get(i).getID() == id) {
				return results.get(i);
			}
		}
		return null;
	}
	
	public void addResponse(Response r) {
		results.add(r);
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
		
		String sql = "SELECT password FROM messages WHERE id = " + this.id 
					 + " AND enabled  = 1";
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
					// Check pw
					if (this.password.equals(rs.getString("password"))) {
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
	
	@SuppressWarnings("unused")
	public void resetAnswers() {
		openDB();
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "UPDATE results " +
					 "SET answer1 = 0, " +
					 "answer2 = 0, " +
					 "answer3 = 0, " +
					 "answer4 = 0, " +
					 "answer5 = 0, " +
					 "answer6 = 0 " +
					 "WHERE messageID = " + this.id; 
		try {
			int rs = stmt.executeUpdate(sql);		
		} catch (SQLException e1) {
			e1.printStackTrace();
		}	
		
		// Delete answers from list
		answers.clear();
		
		closeDB();
	}
}
