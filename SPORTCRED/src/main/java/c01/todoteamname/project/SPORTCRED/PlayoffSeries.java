package c01.todoteamname.project.SPORTCRED;

public class PlayoffSeries {
  private int id;
  private int round;
  private String team1;
  private String team2;
  private String winner;
  private int seriesLength;
  
  public PlayoffSeries(int id, int round, String team1, String team2, String winner, int seriesLength) {
    this.id = id;
    this.round = round;
    this.team1 = team1;
    this.team2 = team2;
    this.winner = winner;
    this.seriesLength = seriesLength;
  }
  
  public int getId() {
    return id;
  }
  
  public int getRound() {
    return round;
  }

  public String getTeam1() {
    return team1;
  }

  public String getTeam2() {
    return team2;
  }

  public String getWinner() {
    return winner;
  }

  public int getSeriesLength() {
    return seriesLength;
  }
}