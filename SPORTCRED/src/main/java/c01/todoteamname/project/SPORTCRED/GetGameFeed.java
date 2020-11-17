package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GetGameFeed implements HttpHandler {
	
	private final String APIURL = "https://www.balldontlie.io/api/v1/games?"; 
	
	private final Map<String, Integer> mapOfTeams= new HashMap<String, Integer>() {{
		
		put("Atlanta Hawks", 1);
		put("Boston Celtics", 2);
		put("Brooklyn Nets", 3);
		put("Charlotte Hornets", 4);
		put("Chicago Bulls", 5);
		put("Cleveland Cavaliers", 6);
		put("Dallas Mavericks", 7);
		put("Denver Nuggets", 8);
		put("Detroit Pistons", 9);
		put("Golden State Warriors", 10);
		put("Houston Rockets", 11);
		put("Indiana Pacers", 12);
		put("LA Clippers", 13);
		put("Los Angeles Lakers", 14);
		put("Memphis Grizzlies", 15);
		put("Miami Heat", 16);
		put("Milwaukee Bucks", 17);
		put("Minnesota Timberwolves", 18);
		put("New Orleans Pelicans", 19);
		put("New York Knicks", 20);
		put("Oklahoma City Thunder", 21);
		put("Orlando Magic", 22);
		put("Philadelphia 76ers", 23);
		put("Phoenix Suns", 24);
		put("Portland Trail Blazers", 25);
		put("Sacramento Kings", 26);
		put("San Antonio Spurs", 27);
		put("Toronto Raptors", 28);
		put("Utah Jazz", 29);
		put("Washington Wizards", 30);

	}};
	
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
		
		if (deserialized.has("season") && deserialized.has("page")) {
			
			String season = deserialized.getString("season");
			int page = deserialized.getInt("page");
			
			String team = null;
			
			if (deserialized.has("team")) {
				team = deserialized.getString("team");
			}
			
			JSONObject gameData = getGameData(season, team, page);
			
			if (gameData == null) {
		        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
				r.sendResponseHeaders(500, -1);
			}
			else {
				
				if (gameData.getJSONArray("data").length() == 0) {
			        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
					r.sendResponseHeaders(400, -1);
				}
				else {
					
			        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			        r.sendResponseHeaders(200, gameData.toString().length());
			        
			        OutputStream os = r.getResponseBody();
			        os.write(gameData.toString().getBytes());
			        os.close();
			        
				}
				
			}
			
		}
		else {
	        r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
			r.sendResponseHeaders(400, -1);
		}


	}

	private JSONObject getGameData(String season, String team, int page) {
		
		try {
			
			String urlWithParams = APIURL + "seasons[]=" + season + "&page=" + page;
			
			if (team != null) {
				urlWithParams += "&team_ids[]=" + mapOfTeams.get(team).toString();
			}
			
			URL url = new URL(urlWithParams);
			URLConnection con = url.openConnection();
			HttpURLConnection http = (HttpURLConnection) con;
			http.setRequestMethod("GET");

			InputStream is = http.getInputStream();
			JSONObject jsonFromGET = new JSONObject(Utils.convert(is));

			return jsonFromGET;

		} catch (Exception e) {
			return null;
		}
		
	}

}
