package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class ResetDebate implements HttpHandler {

  final static String password = "SPORTCRED IS VERY COOL, YES IT IS";
  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public ResetDebate() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("PUT")) {
        handleGet(r);
      }
    } catch (Exception e) {
      try {
        r.sendResponseHeaders(400, -1);
      } catch (IOException e1) {
      }
    }
  }

  private void handleGet(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);

    if (deserialized.has("password")) {
      if (deserialized.get("password").equals(password)) {
        this.nb.resetDebateQuestions(r);
        r.sendResponseHeaders(200, -1);
      } else {
        r.sendResponseHeaders(400, -1);
      }

    }

    else {
      r.sendResponseHeaders(400, -1);
    }
  }

}
