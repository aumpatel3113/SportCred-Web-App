package c01.todoteamname.project.SPORTCRED;

import java.util.ArrayList;

public class UserNode {

  private final int MAXACS = 1100;
  private final int MAXTRIVIA = (int) (0.1 * MAXACS);
  private final int MAXPARTICIPATION = (int) (0.1 * MAXACS);
  private final int MAXPICKS = (int) (0.5 * MAXACS);
  private final int MAXDEBATE = (int) (0.3 * MAXACS);
  private String username, email, password, biography, picture;
  private String Q1, Q2, Q3, Q4, Q5;
  private double ACS, triviaScore, debateScore, pickScore, historyScore;
  private Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();

  public UserNode(String username) {

    neoDB.fillUser(this, username);
    // this.username = username;
    // ACS = 1000;
    // triviaScore = 109;

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

  private ArrayList<Integer> setCategoryValue(String category) {
    ArrayList<Integer> retArray = new ArrayList<>();
    switch (category) {
      case "trivia":
        retArray.add(MAXTRIVIA);
        retArray.add((int) triviaScore);
        return retArray;
      case "debate":
        retArray.add(MAXDEBATE);
        retArray.add((int) debateScore);
        return retArray;
      case "participation":
        retArray.add(MAXPARTICIPATION);
        retArray.add((int) historyScore);
        return retArray;
      case "picks":
        retArray.add(MAXPICKS);
        retArray.add((int) pickScore);
        return retArray;
    }
    return null;
  }

  public int updateScore(int scoreChange, String category) {
    ArrayList<Integer> valueArray = setCategoryValue(category);
    if (valueArray == null) {
      return 500;
    }
    int curr = valueArray.get(1);
    int max = valueArray.get(0);
    int newScore = curr + scoreChange;
    int update = scoreChange;

    if (newScore >= max) {
      update = max - curr;
    } else if (newScore <= 0) {
      update = 0 - curr;
    } else if ((ACS + scoreChange) < 100) {
      update = ((int) ACS - 100);
    }

    int retValue =
        neoDB.updateScore(username, (double) (ACS + update), (double) (curr + update), category);
    if (retValue == 200) {
      ACS += update;
      switch (category) {
        case "trivia":
          triviaScore += update;
          break;
        case "debate":
          debateScore += update;
          break;
        case "participation":
          historyScore += update;
          break;
        case "picks":
          pickScore += update;
          break;
      }
    }
    return retValue;
  }

  public boolean isMaxed(String category) {
    switch (category) {
      case "trivia":
        return triviaScore == MAXTRIVIA;
      case "debate":
        return debateScore == MAXDEBATE;
      case "participation":
        return historyScore == MAXPARTICIPATION;
      case "picks":
        return pickScore == MAXPICKS;
    }
    return false;
  }

}
