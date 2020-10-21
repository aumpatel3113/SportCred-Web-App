package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GetACS implements HttpHandler {

  public GetACS() {}

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
    String username;
    String rank = "FANALYST";

    if (deserialized.has("username")) {
      username = deserialized.getString("username");

      UserNode winUser = new UserNode(username);

      HashMap<String, Object> resultMap = new HashMap<>();
      resultMap.put("ACS", Integer.toString((int) winUser.getACS()));
      if ((int) winUser.getACS() > 900) {
        rank = "EXPERT ANALYST";
      } else if ((int) winUser.getACS() > 600) {
        rank = "PRO ANALYST";
      } else if ((int) winUser.getACS() > 300) {
        rank = "ANALYST";
      }
      resultMap.put("rank", rank);
      JSONObject json = new JSONObject(resultMap);
      String response = json.toString();
      r.getResponseHeaders().set("Content-Type", "application/json");
      r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
      r.sendResponseHeaders(200, response.length());
      OutputStream os = r.getResponseBody();
      os.write(response.getBytes());
      os.close();

    } else {
      r.sendResponseHeaders(400, -1);
    }
  }

}
