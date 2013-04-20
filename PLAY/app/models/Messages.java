package models;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import play.db.DB;

public class Messages {
	private ArrayList<Message> messages;
	private Connection con = null;
	private DataSource ds = null;
	
	public Messages(){
		this.messages = new ArrayList<Message>();
	}
	
	public Message getMessage(int idx) {
		return messages.get(idx);
	}
	
	public Message getMessageWithID(int id) {
		for (int i = 0; i < size()-1; i++) {
			if (getMessage(i).getID() == id) {
				return getMessage(i);
			}
		}
		return null;
	}
	
	public int getMessageIdx(int id){
		for (int i = 0; i < size()-1; i++) {
			if (getMessage(i).getID() == id) {
				return i;
			}
		}
		return 0;
	}
	
	public boolean addMessage(Message m) {
		return messages.add(m);
	}
	
	public Message addMessage() {
		Message m = new Message();
		addMessage(m);
		return m;
	}
		
	public Message deleteMessage(int i) {
		return messages.remove(i);
	}
	
	public boolean isEmpty() {
		return messages.isEmpty();
	}
	
	public void clear() {
		messages.clear();
	}
	
	@SuppressWarnings("unchecked")
	public ArrayList<Message> clone() {
		return (ArrayList<Message>) messages.clone();
	}
	
	
	public int indexOf(Message m) {
		return messages.indexOf(m);
	}
	
	public int size() {
		return messages.size();
	}
	
	public void setEnabled(int id, boolean enable) {
		messages.get(id).setEnabled(enable);
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
	
	public void ReadFromDB(int userID) throws IOException {
		openDB();
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		int id = -1;
		Message m = null;
		String sql = "SELECT * FROM messages WHERE userID = " + userID;
		File file = new File("blabla.txt");
		FileWriter writer = new FileWriter(file,true);
		
		try {
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				id = rs.getInt("id");
				writer.write("Id: " + id + "\n");

				writer.flush();
				m = addMessage();
				m.setID(id);
				m.setText(rs.getString("messageText"));
				m.setEnabled(rs.getBoolean("enabled"));
				m.setUID(userID);
				m.setPassword(rs.getString("password"));
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		writer.close();
		
		closeDB();
	}
}
