package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class EditRadar implements HttpHandler {

  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public EditRadar() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("PUT")) {
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
    String add;

    if (deserialized.has("searchedUser") && deserialized.has("username")
        && deserialized.has("add")) {
      searchedUser = deserialized.getString("searchedUser");
      username = deserialized.getString("username");
      add = deserialized.getString("add");
      if (!(username.equals(searchedUser))) {
        if (add.equals("true")) {
          this.nb.addRadar(r, username, searchedUser);
          r.sendResponseHeaders(200, -1);
        } else if (add.equals("false")) {
          this.nb.deleteRadar(r, username, searchedUser);
          r.sendResponseHeaders(200, -1);
        } else {
          r.sendResponseHeaders(400, -1);
        }
      }
    }

    else {
      r.sendResponseHeaders(400, -1);
    }

  }

}
