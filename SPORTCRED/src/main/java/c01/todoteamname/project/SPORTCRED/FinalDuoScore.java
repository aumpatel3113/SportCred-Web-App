package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class FinalDuoScore implements HttpHandler {

  private final int MATCHPOINTS = 2;

  public FinalDuoScore() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("POST")) {
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
    String usernameWinner;
    String usernameLoser;

    if (deserialized.has("usernameWinner") && deserialized.has("usernameLoser")) {
      usernameWinner = deserialized.getString("usernameWinner");
      usernameLoser = deserialized.getString("usernameLoser");

      UserNode winUser = new UserNode(usernameWinner);
      UserNode loseUser = new UserNode(usernameLoser);
      r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

      if (winUser.updateScore(MATCHPOINTS, "trivia") != 200
          || loseUser.updateScore((-1 * MATCHPOINTS), "trivia") != 200) {
        r.sendResponseHeaders(500, -1);
      } else {
        r.sendResponseHeaders(200, -1);
      }

    } else {
      r.sendResponseHeaders(400, -1);
    }
  }

}
