package models;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import play.db.DB;

public class Response {
	
	private int id = -1;
	private int mID = -1; // messageID
	private int count; // counts the votes for this question
	
	private Connection con = null;
	@SuppressWarnings("unused")
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
	
	/* get the actual value from the DB */
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
	
	/* write new value to DB */
	@SuppressWarnings("unused")
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
				sql = "UPDATE results SET answer" + getID() + " = " + this.getCount()
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

	/* get all results for messageID */
	// not in use
	public ArrayList<Integer> getResult(){
		openDB();
		int ans1=0,ans2=0,ans3=0,ans4=0,ans5=0,ans6 = 0;
		int ans1neu=0,ans2neu=0,ans3neu=0,ans4neu=0,ans5neu=0,ans6neu=0;
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e2) {
			System.out.println(e2.toString());
		}
		
		String sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID = " + getMID();
		try {
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()){
				ans1 = rs.getInt("answer1");
				ans2 = rs.getInt("answer2");
				ans3 = rs.getInt("answer3");
				ans4 = rs.getInt("answer4");
				ans5 = rs.getInt("answer5");
				ans6 = rs.getInt("answer6");
			}
		} catch (SQLException e) {
			System.out.println(e.toString());
		}	
		
		long start = System.currentTimeMillis();
		long end = System.currentTimeMillis();
		
		while(end-start < 2000){
			sql = "SELECT answer1,answer2,answer3,answer4,answer5,answer6 FROM results WHERE messageID = " + getMID();
			try {
				ResultSet rs = stmt.executeQuery(sql);
				while(rs.next()){
					ans1neu = rs.getInt("answer1");
					ans2neu = rs.getInt("answer2");
					ans3neu = rs.getInt("answer3");
					ans4neu = rs.getInt("answer4");
					ans5neu = rs.getInt("answer5");
					ans6neu = rs.getInt("answer6");
				}
			} catch (SQLException e) {
				System.out.println(e.toString());
			}	
			
			if(ans1neu > ans1 || ans2neu > ans2 || ans3neu > ans3 || ans4neu > ans4 || ans5neu > ans5 || ans6neu > ans6){
				ArrayList<Integer> response = new ArrayList<Integer>();
				response.add(ans1neu);
				response.add(ans2neu);
				response.add(ans3neu);
				response.add(ans4neu);
				response.add(ans5neu);
				response.add(ans6neu);
				
				return response;
			}
			
			end = System.currentTimeMillis();
		}
		
		closeDB();

		return null;
	}
}
