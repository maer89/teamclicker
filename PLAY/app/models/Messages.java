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
		for (int i = 0; i <= size()-1; i++) {
			if (getMessage(i).id == id) {
				return getMessage(i);
			}
		}
		return null;
	}
	
	public int getMessageIdx(int id){
		for (int i = 0; i < size()-1; i++) {
			if (getMessage(i).id == id) {
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
	
	public ArrayList<Message> getList() {
		return messages;
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
		
		try {
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				id = rs.getInt("id");
				m = new Message();
				addMessage(m);
				m.id = id;
				m.text = rs.getString("messageText");
				m.setEnabled(rs.getBoolean("enabled"));
				m.uID = userID;
				m.password = rs.getString("password");
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		closeDB();
	}
	
	public String ReadFromDBString(int userID) throws IOException {		
		String content = "";
		content = "<div id='accordion'>";

		openDB();
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			//System.out.println(e2.toString());
		}
		int id = -1;
		String sql = "SELECT * FROM messages WHERE userID = '" + userID + "' ORDER BY messageGroup";
		int i = 0;
		String group = "";
		
		boolean firstTime = true;
		try {
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				if (!rs.getString("messageGroup").equals(group)) {
					group = rs.getString("messageGroup");
					if (firstTime) {
						content = content + "<h3>" + group + "</h3><div><p><table border='1'>"+
				"<tr><td><b>ID</b></td><td><b>Text</b></td><td><b>enable</b></td><td><b>edit</b></td><td><b>delete</b></td><td><b>password</b></td></tr>";
						firstTime = false;
					} else {
						content = content + "</table></p></div><h3>" + group + "</h3><div><p><table border='1'>"+
				"<tr><td><b>ID</b></td><td><b>Text</b></td><td><b>enable</b></td><td><b>edit</b></td><td><b>delete</b></td><td><b>password</b></td></tr>";
					}
				}
				String text = rs.getString("messageText");
				Boolean enabled = rs.getBoolean("enabled");			
				id = rs.getInt("id");
				String password = rs.getString("password");
				
				content = content + "<tr class='row'><td id='id" + i +"'>" + id + "</td>" +
						"<td>" + text + "</td>";
				
				if(enabled) {
					content = content + "<td><input type='radio' onclick='disable("+i+")' checked='checked'/></td>";
				} else {
					content = content + "<td><input type='radio' onclick='enable("+i+")' /></td>";
				}
				
				content = content + "<td><a><img src='assets/images/edit.png' onclick='editMessage("+i+")'/></a></td>" + 
				"<td><img src='assets/images/delete.png' onclick='deleteMessage("+i+")'/></td>" + 
				"<td id='pw" + i + "'>" + password + "</td>";
				
				if (enabled) {
					content = content + "<td><button id='qr" + id + "/" + password + "' onclick='qr_code(id)' style='visibility: visible' >Generate QR-Code</button></td></tr>";
				} else {
					content = content + "<td><button id='qr" + id + "/" + "' onclick='qr_code(id)' style='visibility: hidden' >Generate QR-Code</button></td></tr>";
				}
				Message m = new Message();
				addMessage(m);
				m.id = id;
				m.text = text;
				m.enabled = enabled;
				m.uID = userID;
				m.password = password;
				m.group = group;
				i++;
			}
		}catch (SQLException e1) {

		}
		content = content + "</p></div></div>";

		closeDB();
		return content;
	}
}
