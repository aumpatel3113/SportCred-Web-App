package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class RecoverPassword implements HttpHandler {
  
  Neo4JDB db = Neo4JDB.createInstanceOfDatabase();
  
  @Override
  public void handle(HttpExchange r) throws IOException {
    try {
      if (r.getRequestMethod().equals("POST")) {
        handlePost(r);
      }
    } catch (Exception e) {
      r.sendResponseHeaders(500, -1);
    }
  }
  
  public void handlePost(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    
    r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    
    if (deserialized.has("email")) {
      String userEmail = deserialized.getString("email");
      String response = db.getPassword(r, userEmail);
      r.sendResponseHeaders(200, response.length());
      OutputStream os = r.getResponseBody();
      os.write(response.getBytes());
      os.close();
    } else {
      r.sendResponseHeaders(400, -1);
    }
  }
}
