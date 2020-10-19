package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class FinalSoloTriviaScore implements HttpHandler {
  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public FinalSoloTriviaScore() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("POST")) {
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


    if (deserialized.has("username") && deserialized.has("correctAnswers")
        && deserialized.has("totalAnswers")) {
      String username = deserialized.getString("username");
      int correctAnswers = Integer.parseInt(deserialized.getString("correctAnswers"));
      int totalAnswers = Integer.parseInt(deserialized.getString("totalAnswers"));
      int scoreChange = correctAnswers - (totalAnswers - correctAnswers);

      UserNode curUser = new UserNode(username);

      if (curUser.updateScore(scoreChange, "trivia") != 200) {
        r.sendResponseHeaders(500, -1);
      } else {
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("newACS", curUser.getACS());
        resultMap.put("newTriviaScore", curUser.getTriviaScore());
        resultMap.put("isTriviaMaximum", curUser.isMaxed("trivia"));
        resultMap.put("isTriviaMinimum", curUser.getTriviaScore() == 0);
        JSONObject json = new JSONObject(resultMap);
        String response = json.toString();
        r.getResponseHeaders().set("Content-Type", "application/json");
        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        r.sendResponseHeaders(200, response.length());
        OutputStream os = r.getResponseBody();
        os.write(response.getBytes());
        os.close();
        r.sendResponseHeaders(200, -1);
      }

    } else {
      r.sendResponseHeaders(400, -1);
    }
  }
}
