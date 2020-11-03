package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class PredictPlayoffBracket implements HttpHandler {
  
  Neo4JDB db = Neo4JDB.createInstanceOfDatabase();
  
  public PredictPlayoffBracket() {}
  
  @Override
  public void handle(HttpExchange r) throws IOException {
    try {
      if (r.getRequestMethod().equals("POST")) {
        handlePost(r);
      } 
    } catch (Exception e){
      try {
        r.sendResponseHeaders(500, -1);
      } catch (IOException e1) {
      }
    }
  }
  
  public void handlePost(HttpExchange r) throws IOException, JSONException { 
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    String username;
    String playoffsID;
    PlayoffSeries[] series;
    String response;
    
    if (deserialized.has("username") && deserialized.has("playoffsID") 
        && deserialized.has("series")) {
      username = deserialized.getString("username");
      playoffsID = deserialized.getString("playoffsID");
      int numSeries = deserialized.getJSONArray("series").length();
      series = new PlayoffSeries[numSeries];
      
      for (int i = 0; i < numSeries ; i++) {
        JSONObject current = (JSONObject) deserialized.getJSONArray("series").get(i);
        series[i] = new PlayoffSeries(current.getInt("id"), -1, null, null, current.getString("team"), -1);
      }
      response = db.storeBracketPrediction(r, username, playoffsID, series);
      
      r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
      
      if (response == null) { //not enough information on the playoff bracket
        r.sendResponseHeaders(404, -1);
      } else {
        r.getResponseHeaders().set("Content-Type", "application/json");
        r.sendResponseHeaders(200, response.length());
        OutputStream os = r.getResponseBody();
        os.write(response.getBytes());
        os.close();
      }
    } else {
      r.sendResponseHeaders(400, -1);
    }
  }
}
