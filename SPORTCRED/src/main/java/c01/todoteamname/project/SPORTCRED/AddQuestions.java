package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class AddQuestions implements HttpHandler {

  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public AddQuestions() {}

  @Override
  public void handle(HttpExchange r) {
    try {
      if (r.getRequestMethod().equals("PUT")) {
        handlePut(r);
      }
    } catch (Exception e) {
      try {
        r.sendResponseHeaders(400, -1);
      } catch (IOException e1) {
      }
    }
  }

  public void handlePut(HttpExchange r) throws IOException, JSONException {
    String body = Utils.convert(r.getRequestBody());
    JSONObject deserialized = new JSONObject(body);
    String question;
    String answer1;
    String answer2;
    String answer3;
    String answer4;
    String correct;

    if (deserialized.has("question") && deserialized.has("answer1") && deserialized.has("answer2")
        && deserialized.has("answer3") && deserialized.has("answer4")
        && deserialized.has("correct")) {
      question = deserialized.getString("question");
      answer1 = deserialized.getString("answer1");
      answer2 = deserialized.getString("answer2");
      answer3 = deserialized.getString("answer3");
      answer4 = deserialized.getString("answer4");
      correct = deserialized.getString("correct");

      this.nb.storeQuestion(r, question, answer1, answer2, answer3, answer4, correct);
      r.sendResponseHeaders(200, -1);

    }

    else {
      System.out.println("hi");
      r.sendResponseHeaders(400, -1);
    }

  }

}
