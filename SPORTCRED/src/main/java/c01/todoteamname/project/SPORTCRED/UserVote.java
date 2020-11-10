package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class UserVote implements HttpHandler {

  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public UserVote() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("POST")) {
        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        handlePost(r);
      }
    } catch (Exception e) {
      try {
        r.sendResponseHeaders(500, -1);
      } catch (IOException e1) {
      }
    }
  }

  public void handlePost(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    String ratingUser;
    String scoredUser;
    int score;

    if (deserialized.has("scoredUser") && deserialized.has("ratingUser")
        && deserialized.has("score")) {
      ratingUser = deserialized.getString("ratingUser");
      scoredUser = deserialized.getString("scoredUser");
      score = Integer.parseInt(deserialized.getString("score"));

      this.nb.addVote(r, ratingUser, scoredUser, score);
      r.sendResponseHeaders(200, -1);

    }

    else {
      r.sendResponseHeaders(400, -1);
    }

  }

}
