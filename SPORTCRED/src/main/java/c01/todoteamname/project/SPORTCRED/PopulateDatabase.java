package c01.todoteamname.project.SPORTCRED;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class PopulateDatabase {

  final static boolean addQuestions = true;
  final static boolean addDebate = true;
  final static String questions = "resources/questions.txt";
  final static String debate = "resources/debate.txt";
  final static String addLink = "http://localhost:8080/api/v1/addQuestions";
  final static String addDebateLink = "http://localhost:8080/api/v1/addDebateQuestions";


  private static void populateTrivia() {
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

  private static void populateDebate() {
    try {
      ArrayList<String> questionList = new ArrayList<>();
      FileReader questionToAdd = new FileReader(debate);
      String currentLine;
      String rank = "FANALYST";
      String request;
      int i = 0;
      BufferedReader input = new BufferedReader(questionToAdd);
      input.readLine();
      input.readLine();
      while ((currentLine = input.readLine()) != null) {
        if (currentLine.equals("new#")) {
          rank = input.readLine().replace("\n", "");
          i = 0;
        } else if (i < 2) {
          i++;
          URL url = new URL(addDebateLink);
          URLConnection con = url.openConnection();
          HttpURLConnection http = (HttpURLConnection) con;
          http.setRequestMethod("PUT");
          http.setDoOutput(true);
          request = String.format("{\"question\":\"%s\",\"rank\":\"%s\"}",
              currentLine.replace("\n", ""), rank);
          byte[] out = request.getBytes(StandardCharsets.UTF_8);
          int length = out.length;

          http.setFixedLengthStreamingMode(length);
          http.setRequestProperty("Content-Type", "application/json");
          http.connect();
          try (OutputStream os = http.getOutputStream()) {
            os.write(out);
          }

        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

  }

  public static void main(String[] args) {
    if (addQuestions) {
      populateTrivia();
    }
    if (addDebate) {
      populateDebate();
    }
  }
}
