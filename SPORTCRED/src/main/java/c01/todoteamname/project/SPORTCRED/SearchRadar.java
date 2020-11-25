package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
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
      if (r.getRequestMethod().equals("POST")) {
        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
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
        if (ableToAdd) {
          r.sendResponseHeaders(200, -1);
        } else {
          r.sendResponseHeaders(201, -1);
        }
      } else {
        r.sendResponseHeaders(202, -1);
      }
    }

    else {
      r.sendResponseHeaders(400, -1);
    }

  }

}
