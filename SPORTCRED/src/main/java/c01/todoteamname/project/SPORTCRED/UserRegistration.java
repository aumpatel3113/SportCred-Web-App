package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class UserRegistration implements HttpHandler {

	private Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();

	public UserRegistration() {}

	@Override
	public void handle(HttpExchange r) throws IOException {

		try {
			if (r.getRequestMethod().equals("POST")) {
				handlePost(r);
			}
		} catch (Exception e) {

		}

	}

	private void handlePost(HttpExchange r) throws IOException, JSONException {

		String body = Utils.convert(r.getRequestBody());
		JSONObject deserialized = new JSONObject(body);

		boolean checkReq = deserialized.has("username") && 
				deserialized.has("password") && 
				deserialized.has("email") && 
				deserialized.has("answeredQuestions");

		if (checkReq) {

			String username = deserialized.getString("username");
			String password = deserialized.getString("password");
			String email = deserialized.getString("email");
			
			JSONArray arrayForQuestions = deserialized.getJSONArray("answeredQuestions");
			String[] answeredQuestions = new String[arrayForQuestions.length()];

			for (int i = 0; i < arrayForQuestions.length(); i++) {
				answeredQuestions[i] = arrayForQuestions.getString(i);
			}
			
			int returnVal = neoDB.createUser(username, password, email, answeredQuestions);
			
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(returnVal, -1);
		}
		else {
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}

	}

}
