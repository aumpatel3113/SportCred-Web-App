package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class NewChallenger implements HttpHandler {


  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public NewChallenger() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("POST")) {
        handlePost(r);
      }
    } catch (Exception e) {
      try {
        e.printStackTrace();
        r.sendResponseHeaders(500, -1);
      } catch (IOException e1) {
      }
    }
  }

  public void handlePost(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    String username;
    JSONArray questions;
    String questionsAnswered;
    String questionsCorrect;

    if (deserialized.has("username") && deserialized.has("questions")
        && deserialized.has("questionsAnswered") && deserialized.has("questionsCorrect")) {
      username = deserialized.getString("username");
      questions = (JSONArray) deserialized.get("questions");
      questionsAnswered = deserialized.getString("questionsAnswered");
      questionsCorrect = deserialized.getString("questionsCorrect");
      r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

      this.nb.storeRoom(r, username, questions, questionsAnswered, questionsCorrect);
      r.sendResponseHeaders(200, -1);

    } else {
      r.sendResponseHeaders(400, -1);
    }
  }
}
