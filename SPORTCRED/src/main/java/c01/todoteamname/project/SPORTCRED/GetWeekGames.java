package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import org.joda.time.DateTime;
import org.json.JSONException;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GetWeekGames implements HttpHandler {
  
  private final String APIURL = "https://www.balldontlie.io/api/v1/games?";

  @Override
  public void handle(HttpExchange r) throws IOException {  
    try {
      if(r.getRequestMethod().equals("GET")) {
        handleGet(r); 
      }  
    } catch (Exception e){
      
    }
  }
  
  private static String[] getEndOfWeek() {
    DateTime today = new DateTime().minusYears(1).minusDays(4); 
    DateTime end = today.plusDays(7);
    String[] interval = new String[]{today.toString("yyyy'-'MM'-'d"), end.toString("yyyy'-'MM'-'d")}; 
    return interval; 
  }
  
  private void handleGet(HttpExchange r) throws JSONException, IOException {
    
    String[] week = GetWeekGames.getEndOfWeek(); 
    JSONObject gameData = getGamesInPeriod(week[0], week[1]);
    r.getResponseHeaders().add("Content-Type", "application/json");
    r.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    if (gameData == null) {
      r.sendResponseHeaders(500, -1);
    } else if(gameData.getJSONArray("data").length() == 0) {
      JSONObject empty = new JSONObject(); 
      r.sendResponseHeaders(200, empty.toString().length());
      OutputStream os = r.getResponseBody();
      os.write(empty.toString().getBytes());
      os.close();
    } else {
      r.sendResponseHeaders(200, gameData.toString().length());
      OutputStream os = r.getResponseBody();
      os.write(gameData.toString().getBytes());
      os.close();
    }
    
   
  }
  
  private JSONObject getGamesInPeriod(String start, String end) {
    try {
      
      String urlWithParams = APIURL + "start_date=" + start + "&end_date=" + end;
      
      URL url = new URL(urlWithParams);
      HttpURLConnection http = (HttpURLConnection) url.openConnection();
      http.setRequestMethod("GET");

      InputStream is = http.getInputStream();
      JSONObject jsonFromGET = new JSONObject(Utils.convert(is));
      
      return jsonFromGET;

    } catch (Exception e) {
      return null;
    }
  }

}
