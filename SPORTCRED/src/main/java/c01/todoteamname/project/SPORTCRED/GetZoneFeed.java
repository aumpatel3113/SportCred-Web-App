package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GetZoneFeed implements HttpHandler {

	Neo4JDB neoDB = Neo4JDB.createInstanceOfDatabase();
	
	public GetZoneFeed() {}

	@Override
	public void handle(HttpExchange r) throws IOException {
		
		try {
			if (r.getRequestMethod().equals("POST")) {
				handlePost(r);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	private void handlePost(HttpExchange r) throws IOException, JSONException {
		
		String body = Utils.convert(r.getRequestBody());
		JSONObject deserialized = new JSONObject(body);
		
		boolean checkReq = deserialized.has("username");
		
		if (checkReq) {
				
			String currentUser = deserialized.getString("username");
			
			List<JSONObject> listOfPosts = neoDB.getZoneFeed(currentUser);
			
			if (listOfPosts != null) {
				
				r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
				
				JSONObject completeFeed = new JSONObject();
				completeFeed.put("POSTS", listOfPosts.toArray());
				String feedAsString = completeFeed.toString();
				
				r.sendResponseHeaders(200, feedAsString.length());
				
				OutputStream os = r.getResponseBody();
	            os.write(feedAsString.getBytes());
	            os.close();
				
			}
			else {
				r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
				r.sendResponseHeaders(500, -1);
			}
		}
		else {
			r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}
		
		
	}
	
	
}
