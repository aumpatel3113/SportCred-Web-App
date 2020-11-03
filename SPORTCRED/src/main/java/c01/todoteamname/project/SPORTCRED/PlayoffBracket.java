package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class PlayoffBracket implements HttpHandler {
  
  Neo4JDB db = Neo4JDB.createInstanceOfDatabase();

  public PlayoffBracket() {}

  @Override
  public void handle(HttpExchange r) throws IOException {
    try {
      if (r.getRequestMethod().equals("PUT")) {
        handlePut(r);
      } else if (r.getRequestMethod().equals("POST")) {
        handlePost(r);
      }
    } catch (Exception e){
      try {
        r.sendResponseHeaders(500, -1);
      } catch (IOException e1) {
      }
    }
  }
  
  public void handlePut(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    String playoffsID;
    PlayoffSeries[] series;
    
    r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    
    if (deserialized.has("playoffsID") && deserialized.has("series")) {
      playoffsID = deserialized.getString("playoffsID");
      int numSeries = deserialized.getJSONArray("series").length();
      series = new PlayoffSeries[numSeries];
      
      for (int i = 0; i < numSeries ; i++) {
        JSONObject current = (JSONObject) deserialized.getJSONArray("series").get(i);
        series[i] = new PlayoffSeries(i+1, current.getInt("round"), current.getString("team1"),
            current.getString("team2"), current.getString("winner"), current.getInt("seriesLength"));
      }
      
      db.storePlayoffBracket(r, playoffsID, series);
      r.sendResponseHeaders(200, -1);
    } else {
      r.sendResponseHeaders(400, -1);
    }
  }
  
  public void handlePost(HttpExchange r) throws IOException {
    String response = db.getPlayoffBrackets(r);
    r.getResponseHeaders().set("Content-Type", "application/json");
    r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    r.sendResponseHeaders(200, response.length());
    OutputStream os = r.getResponseBody();
    os.write(response.getBytes());
    os.close();
    r.sendResponseHeaders(200, -1);
  }
}
