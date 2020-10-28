package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class AddZoneComment implements HttpHandler {

	Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();

	public AddZoneComment() {}

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
		
		boolean checkReq = deserialized.has("username") && deserialized.has("postID") && deserialized.has("content");
		
		if (checkReq) {
			
			String currentUsername = deserialized.getString("username");
			int parentPostID = deserialized.getInt("postID");
			String commentContent = deserialized.getString("content");
			
			int responseCode = neoDB.addZoneComment(currentUsername, parentPostID, commentContent);
			
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(responseCode, -1);
			
		}
		else {
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}
		
	}

}
