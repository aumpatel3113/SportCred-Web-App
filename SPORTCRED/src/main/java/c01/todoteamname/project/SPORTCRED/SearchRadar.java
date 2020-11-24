package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class SearchRadar implements HttpHandler {

  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public SearchRadar() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("PUT")) {
        handlePut(r);
      }
    } catch (Exception e) {
      try {
        r.sendResponseHeaders(500, -1);
      } catch (IOException e1) {
      }
    }
  }

  public void handlePut(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    String searchedUser;
    String username;

    if (deserialized.has("searchedUser") && deserialized.has("username")) {
      searchedUser = deserialized.getString("searchedUser");
      username = deserialized.getString("username");
      boolean ableToAdd = false;
      if (!(username.equals(searchedUser))) {
        ableToAdd = this.nb.searchRadar(r, username, searchedUser);
      }
      HashMap<String, Object> resultMap = new HashMap<>();
      resultMap.put("ableToAdd", ableToAdd);
      JSONObject json = new JSONObject(resultMap);
      String response = json.toString();
      r.getResponseHeaders().set("Content-Type", "application/json");
      r.sendResponseHeaders(200, response.length());
      OutputStream os = r.getResponseBody();
      os.write(response.getBytes());
      os.close();
    }

    else {
      r.sendResponseHeaders(400, -1);
    }

  }

}
