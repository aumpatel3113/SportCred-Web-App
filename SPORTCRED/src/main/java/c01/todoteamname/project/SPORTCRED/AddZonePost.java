package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;

import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class AddZonePost implements HttpHandler {

	private Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();

	public AddZonePost() {}

	@Override
	public void handle(HttpExchange r) {

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

		if (deserialized.has("author") && deserialized.has("content")) {

			String author = deserialized.getString("author");
			String content = deserialized.getString("content");

			int postID = neoDB.addZonePost(author, content);

			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

			if (postID != -1) {
				JSONObject postResponse = new JSONObject();
				postResponse.put("postID", postID);
	
				r.sendResponseHeaders(200, postResponse.toString().length());
				OutputStream os = r.getResponseBody();
				os.write(postResponse.toString().getBytes());
				os.close();
				
			}
			else {
				r.sendResponseHeaders(500, -1);
			}

		}
		else {
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}

	}

}
