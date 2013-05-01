package models;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import play.db.DB;

public class User {
	
	private int id = -1;
	private String name = "";
	private String password = "";
	
	private Connection con = null;
	private DataSource ds = null;
	
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
		// write to DB
		// TODO: implement
	}
	
	public String getPassword() {
		return this.password;
	}
	
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
	
	public boolean checkUser() {
		openDB();
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "SELECT id, name, password FROM users WHERE name = \'" + getName() + "\'";
		try {
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				if (getPassword().equals(rs.getString("password"))) {
					id = rs.getInt("id");
					return true;
				} else {
					return false;
				}
			} else {
				// no User with this name in table
				return false;
			}
		}catch (SQLException e1) {
			System.out.println(e1.toString());
		}
		
		closeDB();
		return false;
	}
}
