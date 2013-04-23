package models;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import play.db.DB;

public class Response {
	
	private int id = -1;
	private int mID = -1;
	private int count;
	
	private Connection con = null;
	private DataSource ds = null;
	
	public Response() {
		this.count = 0;
	}
	
	public int getID() {
		return this.id;
	}
	
	public void setID(int id) {
		this.id = id;
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
	
	public void readFromDB() {
		openDB();
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "SELECT answer" + getID() + " FROM results WHERE messageID = " + getMID();
		
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				this.setCount(rs.getInt("answer" + getID()));
			} else {
				// error
			}
		} catch (SQLException e) {
			System.out.println(e.toString());
		}	
		
		closeDB();
	}
	
	public void writeToDB() {
		openDB();
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "SELECT id FROM results WHERE messageID = " + getMID();

		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				// entry exists --> Update
				sql = "UPDATE results SET answer" + getID() + "=answer" + getID() + "+1"
					  + " WHERE messageID = " + getMID();
			} else {
				// entry doesn't exist --> insert
				sql = "INSERT INTO results (messageID, answer" + getID() + ") VALUES ("+ getMID() 
					  + ", answer"+ getID() + "+1)";
			}
			int res = stmt.executeUpdate(sql);
		} catch (SQLException e) {
		}	
		
		closeDB();		
	}
}
