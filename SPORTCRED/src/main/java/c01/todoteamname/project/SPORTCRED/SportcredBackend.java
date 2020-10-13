package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;

public class SportcredBackend {
  static int PORT = 8080;

  public static void main(String[] args) {

    try {

      HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", PORT), 0);
      server.createContext("/api/v1/getSoloTrivia", new GetQuestions());
      server.createContext("/api/v1/addQuestions", new AddQuestions());
      server.start();
      System.out.println("Server on port:" + PORT);
    } catch (IOException e) {
      System.err.println("Server Could Not Be Started");
    }

  }

}
