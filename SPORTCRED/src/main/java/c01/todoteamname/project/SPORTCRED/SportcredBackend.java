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
      server.createContext("/api/v1/updateUserData", new UpdateUserProfile());
      server.createContext("/api/v1/sendFinalSoloScore", new FinalSoloTriviaScore());
      server.createContext("/api/v1/registerUser", new UserRegistration());
      server.createContext("/api/v1/updateUserData", new UpdateUserProfile());
      server.createContext("/api/v1/getProfilePicture", new GetProfilePicture());
      server.createContext("/api/v1/userLogin", new UserLogin());
      server.createContext("/api/v1/sendNewChallengerTrivia", new NewChallenger());
      server.createContext("/api/v1/getAvailableRooms", new RoomList());
      server.createContext("/api/v1/getOpponent", new GetOpponent());
      server.createContext("/api/v1/sendFinalDuoScore", new FinalDuoScore());
      server.createContext("/api/v1/getACSScore", new GetACS());
      server.createContext("/api/v1/getUserInfo", new GetUserInfo());
      server.createContext("/api/v1/addZonePost", new AddZonePost());
      server.createContext("/api/v1/getCurrentQuestions", new GetDebateQuestions());
      server.createContext("/api/v1/acceptNewDebate", new DebateGroup());
      server.createContext("/api/v1/validateDebate", new ValidateDebate());
      server.createContext("/api/v1/addDebateQuestions", new AddDebateQuestion());
      server.start();
      System.out.println("Server on port:" + PORT);
    } catch (IOException e) {
      System.err.println("Server Could Not Be Started");
    }

  }

}
