package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class DebateGroup implements HttpHandler {

  Neo4JDB nb = Neo4JDB.createInstanceOfDatabase();

  public DebateGroup() {}

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
    String username;
    String question;
    String post;
    int roomID;
    int userNum;
    int[] roomInfo;

    if (deserialized.has("username") && deserialized.has("question") && deserialized.has("post")) {
      username = deserialized.getString("username");
      question = deserialized.getString("question");
      post = deserialized.getString("post");


      roomInfo = this.nb.getDebateRoom(r, question);
      roomID = roomInfo[0];
      userNum = roomInfo[1];
      this.nb.updateDebateRoom(r, username, post, roomID, userNum);
      r.sendResponseHeaders(200, -1);

    }

    else {
      r.sendResponseHeaders(400, -1);
    }

  }

}
