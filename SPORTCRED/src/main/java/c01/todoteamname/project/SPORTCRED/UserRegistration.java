package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;

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
				deserialized.has("email");

		if (checkReq) {

			String username = deserialized.getString("username");
			String password = deserialized.getString("password");
			String email = deserialized.getString("email");
			
			int returnVal = neoDB.createUser(username, password, email);
			
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(returnVal, -1);
		}
		else {
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}

	}

}
