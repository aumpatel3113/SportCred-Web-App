package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class CheckPlayoffPrediction implements HttpHandler {
  
  Neo4JDB db = Neo4JDB.createInstanceOfDatabase();
  
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
    String response;
    String username;
    String playoffsID;
    
    r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	
    if (deserialized.has("username") && deserialized.has("playoffsID")) {
      username = deserialized.getString("username");
      playoffsID = deserialized.getString("playoffsID");
      response = db.checkForUserBracket(r, username, playoffsID);
      if (response != null) {
        r.getResponseHeaders().set("Content-Type", "application/json");
        r.sendResponseHeaders(200, response.length());
      } else {
        response = "";
        r.sendResponseHeaders(404, response.length());
      }
      OutputStream os = r.getResponseBody();
      os.write(response.getBytes());
      os.close();
    } else {
      r.sendResponseHeaders(400, -1);
    }
  }
}