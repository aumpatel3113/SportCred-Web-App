package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import org.joda.time.DateTime;
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
    DateTime today = new DateTime().minusYears(1); 
    DateTime end = today.plusDays(7);
    String[] interval = new String[]{today.toString("yyyy'-'MM'-'d"), end.toString("yyyy'-'MM'-'d")}; 
    return interval; 
  }
  
  private void handleGet(HttpExchange r) {
   
  }
  
  private JSONObject getGamesInPeriod(String start, String end) {
    try {
      
      String urlWithParams = APIURL + "start_date=" + start + "&end_date=" + end;
      
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
  
  public static void main(String[] args) {
    System.out.println(getEndOfWeek()[0]+"\n"+getEndOfWeek()[1]);
  }

}
