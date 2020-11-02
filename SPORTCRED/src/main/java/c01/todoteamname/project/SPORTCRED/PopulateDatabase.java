package c01.todoteamname.project.SPORTCRED;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;

public class PopulateDatabase {

  final static String password = "SPORTCRED IS VERY COOL, YES IT IS";

  // Set to true if new questions in question.txt
  final static boolean addQuestions = true;

  // Set to true if new question in debate.txt

  final static boolean addDebate = true;

  // Set to true to remove old debate questions from database
  final static boolean removeDebate = false;

  // Set to true to do all of above
  final static boolean fullAdd = false;

  // Files for debate/questions
  final static String questions = "resources/questions.txt";
  final static String debate = "resources/debate.txt";

  // Contexts for adding debate/trivia question
  final static String addLink = "http://localhost:8080/api/v1/addQuestions";
  final static String addDebateLink = "http://localhost:8080/api/v1/addDebateQuestions";

  // Context for deleting trivia questions
  final static String removeDebateLink = "http://localhost:8080/api/v1/clearDebates";


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
            "{\"password\":\"%s\",\"question\":\"%s\",\"answer1\":\"%s\",\"answer2\":\"%s\","
                + "\"answer3\":\"%s\",\"answer4\":\"%s\",\"correct\":\"%s\"}",
            password, question, answer1, answer2, answer3, answer4, correct);
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
      e.printStackTrace();
      System.out.println("Could not send request to add Trivia Questions");
    }
  }

  private static void populateDebate() {
    try {
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
          request = String.format("{\"password\":\"%s\",\"question\":\"%s\",\"rank\":\"%s\"}",
              password, currentLine.replace("\n", ""), rank);
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
      System.out.println("Could not send request to add Debate Questions");
    }

  }

  private static void depopulateDebate() {
    try {
      String request;
      URL url = new URL(removeDebateLink);
      URLConnection con = url.openConnection();
      HttpURLConnection http = (HttpURLConnection) con;
      http.setRequestMethod("PUT");
      http.setDoOutput(true);
      request = String.format("{\"password\":\"%s\"}", password);
      byte[] out = request.getBytes(StandardCharsets.UTF_8);
      int length = out.length;

      http.setFixedLengthStreamingMode(length);
      http.setRequestProperty("Content-Type", "application/json");
      http.connect();
      try (OutputStream os = http.getOutputStream()) {
        os.write(out);
      }

    } catch (Exception e) {
      System.out.println("Could not send request to delete Debate Questions");
    }
  }

  public static void main(String[] args) {
    if (addQuestions || fullAdd) {
      populateTrivia();
    }

    if (removeDebate || fullAdd) {
      depopulateDebate();
    }

    if (addDebate || fullAdd) {
      populateDebate();
    }
  }
}
