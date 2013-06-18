package models;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import javax.sql.DataSource;

import controllers.Application;
import controllers.routes;
import play.db.DB;

public class Messages {
	private ArrayList<Message> messages;  // A list with all the messages of this user
	private Connection con = null;
	@SuppressWarnings("unused")
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
		StringBuilder content = new StringBuilder();
		content.append("<div id='accordion'>");
		openDB();
		Statement stmt = null;
		try {
			stmt = con.createStatement();
			stmt.setFetchSize(1000);
		} catch (SQLException e2) {
		}
		
		int id = -1;
		String sql = "SELECT * FROM messages WHERE userID = '" + userID + "' ORDER BY messageGroup";
		int i = 0;
		String group = "";
		String head = "</h3><div><p><table border='1' class='table table-hover'><tr><td><b>ID</b></td><td><b>Text</b></td><td><b>Enable</b></td><td><b>Edit</b></td><td><b>Delete</b></td><td><b>Reset</b></td><td><b>Password</b></td><td><b>Link</b></td><td><b>QR</b></td><td><b>Result</b></td></tr>";
		String groupOld = "";
		boolean firstTime = true;
		try {
			ResultSet rs = stmt.executeQuery(sql);
			rs.setFetchSize(1000);
			while (rs.next()) {
				groupOld = rs.getString("messageGroup");
				if (!groupOld.equals(group)) {
					group = groupOld;
					if (firstTime) {
						content.append("<h3>" + group + head);
						firstTime = false;
					} else {
						content.append("</table></p></div><h3>" + group + head);
					}
				}
				String text = rs.getString("messageText");
				Boolean enabled = rs.getBoolean("enabled");			
				id = rs.getInt("id");
				String password = rs.getString("password");
				
				content.append("<tr><td id='id" + i +"'>" + id + "</td>" +
						"<td>" + text + "</td>");
				
				if(enabled) {
					content.append("<td><input type='radio' onclick='disable("+i+")' checked='checked'/></td>");
				} else {
					content.append("<td><input type='radio' onclick='enable("+i+")' /></td>");
				}
				
				content.append("<td><a onclick='editMessage("+i+")'><i class='icon-pencil'></i></a></td>" + 
				"<td><a onclick='deleteMessage("+i+")'><i class='icon-trash'></i></a></td>" + 
				"<td><a onclick='resetAnswers("+i+")'><i class='icon-refresh'></i></a></td>" +
				"<td id='pw" + i + "'>" + password + "</td>");
				
				if (enabled) {
					content.append("<td><a href='");
					content.append(routes.Application.getQuestion(id, password).absoluteURL(Application.request()));
					content.append("'>");
					content.append(routes.Application.getQuestion(id, password).absoluteURL(Application.request()));
					content.append("</a></td>");
				} else {
					content.append("<td> - </td>");
				}
				
				if (enabled) {
					content.append("<td><a id='qr" + id + "/" + password + "' onclick='qr_code(id)' style='visibility: visible' ><i class='icon-qrcode'></i></a></td>");
				} else {
					content.append("<td><a id='qr" + id + "/" + "' onclick='qr_code(id)' style='visibility: hidden' ><i class='icon-qrcode'></i></a></td>");
				}
				content.append("<td><a onclick='result("+i+")'><i class='icon-align-left'></i></a></td></tr>");
				
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
		content.append("</table></p></div></div>");
		closeDB();
		return content.toString();
	}
}
