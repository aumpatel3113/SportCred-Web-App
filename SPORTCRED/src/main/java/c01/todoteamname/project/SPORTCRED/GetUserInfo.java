package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GetUserInfo implements HttpHandler {

    public GetUserInfo() {}

    @Override
    public void handle(HttpExchange r) throws IOException {

        try {
            if (r.getRequestMethod().equals("POST")) {
                handleGet(r);
            }
        } catch (Exception e) {

        }

    }

    private void handleGet(HttpExchange r) throws IOException, JSONException {

        String body = Utils.convert(r.getRequestBody());
        JSONObject deserialized = new JSONObject(body);

        boolean checkReq = deserialized.has("username");

        if (checkReq) {

            String username = deserialized.getString("username");
            UserNode user = new UserNode(username); 
            JSONObject output = new JSONObject(); 
            output.put("biography", user.getBiography());
            output.put("Q1", user.getQ1());
            output.put("Q2", user.getQ2());
            output.put("Q3", user.getQ3());
            output.put("Q4", user.getQ4());
            output.put("Q5", user.getQ5());
            r.getResponseHeaders().set("Content-Type", "application/json");
            r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            r.sendResponseHeaders(200, output.toString().length());
            OutputStream os = r.getResponseBody();
            os.write(output.toString().getBytes());
            os.close();
        }
        else {
            r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            r.sendResponseHeaders(400, -1);
        }

    }

}

