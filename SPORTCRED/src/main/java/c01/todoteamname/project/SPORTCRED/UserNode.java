package c01.todoteamname.project.SPORTCRED;

public class UserNode {

	private String username, email, password, biography, picture;
	private String Q1, Q2, Q3, Q4, Q5;
	private double ACS, triviaScore, debateScore, pickScore, historyScore;
	private Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();

	public UserNode(String username) {
		
		neoDB.fillUser(this, username);
		
	}

	public String getUsername() {
		return username;
	}

	public String getQ1() {
		return Q1;
	}

	public void setQ1(String q1) {
		Q1 = q1;
	}

	public String getQ2() {
		return Q2;
	}

	public void setQ2(String q2) {
		Q2 = q2;
	}

	public String getQ3() {
		return Q3;
	}

	public void setQ3(String q3) {
		Q3 = q3;
	}

	public String getQ4() {
		return Q4;
	}

	public void setQ4(String q4) {
		Q4 = q4;
	}

	public String getQ5() {
		return Q5;
	}

	public void setQ5(String q5) {
		Q5 = q5;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getBiography() {
		return biography;
	}

	public String getPicture() {
		return picture;
	}

	public double getACS() {
		return ACS;
	}

	public double getTriviaScore() {
		return triviaScore;
	}

	public double getDebateScore() {
		return debateScore;
	}

	public double getPickScore() {
		return pickScore;
	}

	public double getHistoryScore() {
		return historyScore;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public void setACS(double aCS) {
		ACS = aCS;
	}

	public void setTriviaScore(double triviaScore) {
		this.triviaScore = triviaScore;
	}

	public void setDebateScore(double debateScore) {
		this.debateScore = debateScore;
	}

	public void setPickScore(double pickScore) {
		this.pickScore = pickScore;
	}

	public void setHistoryScore(double historyScore) {
		this.historyScore = historyScore;
	}
	
}
