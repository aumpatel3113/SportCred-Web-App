package c01.todoteamname.project.SPORTCRED;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;

public class PopulateDatabase {

  final static String questions = "resources/questions.txt";
  final static String addLink = "http://localhost:8080/api/v1/addQuestions";

  static void populateTrivia() {
    try {
      String question;
      String answer1;
      String answer2;
      String answer3;
      String answer4;
      String correct;
      String request;

      FileReader questionToAdd = new FileReader(questions);
      String currentLine;
      BufferedReader input = new BufferedReader(questionToAdd);
      while ((currentLine = input.readLine()) != null) {
        URL url = new URL(addLink);
        URLConnection con = url.openConnection();
        HttpURLConnection http = (HttpURLConnection) con;
        http.setRequestMethod("PUT");
        http.setDoOutput(true);
        currentLine.replace("\n", "");
        question = currentLine;
        answer1 = input.readLine().replace("\n", "");
        answer2 = input.readLine().replace("\n", "");
        answer3 = input.readLine().replace("\n", "");
        answer4 = input.readLine().replace("\n", "");
        correct = input.readLine().replace("\n", "");
        input.readLine();
        request = String.format(
            "{\"question\":\"%s\",\"answer1\":\"%s\",\"answer2\":\"%s\","
                + "\"answer3\":\"%s\",\"answer4\":\"%s\",\"correct\":\"%s\"}",
            question, answer1, answer2, answer3, answer4, correct);
        byte[] out = request.getBytes(StandardCharsets.UTF_8);
        int length = out.length;

        http.setFixedLengthStreamingMode(length);
        http.setRequestProperty("Content-Type", "application/json");
        http.connect();
        try (OutputStream os = http.getOutputStream()) {
          os.write(out);
        }

      }
    } catch (Exception e) {
    }
  }

  public static void main(String[] args) {
    populateTrivia();
  }
}
