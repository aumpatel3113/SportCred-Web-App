package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GetProfilePicture implements HttpHandler {
  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();
  
  public GetProfilePicture() {}
  
  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("POST")) {
        handlePost(r);
      } 
    } catch (Exception e) {
      try {
        r.sendResponseHeaders(400, -1);
        e.printStackTrace();
      } catch (IOException e1) {
        e1.printStackTrace();
      }
    }
  }
  
  public void handlePost(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    
    if (deserialized.has("username")) {
      String res = nb.getProfilePicture(r, deserialized.getString("username"));
      if (res != null) {
        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        r.getResponseHeaders().set("Content-Type", "application/json");
        r.sendResponseHeaders(200, res.length());
        OutputStream os = r.getResponseBody();
        os.write(res.getBytes());
        os.close();
        return;
      }
    }
    
    r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    r.sendResponseHeaders(400, -1);
  }
}
