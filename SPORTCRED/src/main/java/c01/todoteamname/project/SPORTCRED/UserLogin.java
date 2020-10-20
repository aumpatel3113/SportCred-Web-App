package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class UserLogin implements HttpHandler {

	private Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();
	
	public UserLogin() {}
	
	@Override
	public void handle(HttpExchange r) throws IOException {
		try {
			if (r.getRequestMethod().equals("GET")) {
				handleGet(r);
			}
		} catch (Exception e) {

		}
		
	}

	private void handleGet(HttpExchange r) throws JSONException, IOException {
		
		String body = Utils.convert(r.getRequestBody());
		JSONObject deserialized = new JSONObject(body);

		boolean checkReq = deserialized.has("username") && 
				deserialized.has("password");
		
		if (checkReq) {
			
			String username = deserialized.getString("username");
			String password = deserialized.getString("password");
		
			int returnVal = neoDB.checkLogin(username, password);
			
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(returnVal, -1);
		}
		else {
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}
		
	}

}
