package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class LikeDislikeZonePost implements HttpHandler {

	Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();

	public LikeDislikeZonePost() {}

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

		boolean checkReq = (deserialized.has("likePost") || deserialized.has("dislikePost")) 
				&& deserialized.has("postID") && deserialized.has("username");

		if (checkReq) {

			String currentUser = deserialized.getString("username");
			int parentPostID = deserialized.getInt("postID");
			boolean likingPost = deserialized.has("likePost");

			int responseCode = neoDB.ratePost(likingPost, parentPostID, currentUser);

			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(responseCode, -1);

		}
		else {
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}

	}

}
