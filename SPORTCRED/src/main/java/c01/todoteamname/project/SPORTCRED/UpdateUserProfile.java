package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import org.json.JSONException;
import org.json.JSONObject;
import org.neo4j.driver.exceptions.ClientException;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class UpdateUserProfile implements HttpHandler {
  
  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();
  
  public UpdateUserProfile() {}
  
  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("POST")) {
        handlePost(r);
      }
    } catch (Exception e) {
      try {
        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        r.sendResponseHeaders(400, -1);
      } catch (IOException e1) {}
    }
  }
  
  public void handlePost(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    
    r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    
    try {
      if (deserialized.has("username")) {
        nb.updateUserProfile(r, deserialized);
        r.sendResponseHeaders(200, -1);
        return;
      }
      r.sendResponseHeaders(400, -1);
    } catch (ClientException e) {
      String res = "Current password is invalid.";
      r.sendResponseHeaders(200, res.length());
      OutputStream os = r.getResponseBody();
      os.write(res.getBytes());
      os.close();
      return;
    }
  }
}
