package c01.todoteamname.project.SPORTCRED;

import static org.neo4j.driver.Values.parameters;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONObject;
import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import com.sun.net.httpserver.HttpExchange;

public class Neo4JDB {

  private static Neo4JDB nb = null;
  private Driver driver;
  private String uriDb;

  private Neo4JDB() {

    uriDb = "bolt://localhost:7687";
    driver = GraphDatabase.driver(uriDb, AuthTokens.basic("neo4j", "1234"));

  }

  public static Neo4JDB createInstanceOfDatabase() {
    if (nb == null) {
      nb = new Neo4JDB();
    }
    return nb;
  }

  public void storeQuestion(HttpExchange r, String question, String answer1, String answer2,
      String answer3, String answer4, String correct) {
    try (Session session = driver.session()) {
      String line =
          "MERGE (m:trivia {question:$a, answer1:$b, answer2:$c,answer3:$d,answer4:$e,correct:$f})";
      session.writeTransaction(tx -> tx.run(line, parameters("a", question, "b", answer1, "c",
          answer2, "d", answer3, "e", answer4, "f", correct)));
      session.close();
    } catch (Exception e) {
      System.out.println("hi");
      internalErrorCatch(r);
    }
  }

  public void internalErrorCatch(HttpExchange r) {
    try {
      r.sendResponseHeaders(500, -1);
    } catch (IOException e) {
    }
  }


  public Map<String, Object> getTriviaQuestions(HttpExchange r, String numQuestions) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String line = String.format("MATCH (u:trivia)\n" + "WITH u, rand() AS number\n"
            + "RETURN u\n" + "ORDER BY number\n" + "LIMIT %s", numQuestions);
        Result result = tx.run(line);

        HashMap<String, Object> endMap;
        HashMap<String, Object> tempMap;
        ArrayList<Object> returnArray = new ArrayList<>();

        while (result.hasNext()) {
          tempMap = new HashMap<>();
          endMap = new HashMap<>();
          Map<String, Object> temp = result.next().fields().get(0).value().asMap();
          endMap.put("question", temp.get("question"));
          tempMap.put("1", temp.get("answer1"));
          tempMap.put("2", temp.get("answer2"));
          tempMap.put("3", temp.get("answer3"));
          tempMap.put("4", temp.get("answer4"));
          endMap.put("answers", new JSONObject(tempMap));
          endMap.put("correct", temp.get("correct"));
          returnArray.add(new JSONObject(endMap));
        }
        HashMap<String, Object> returnMap = new HashMap<>();
        returnMap.put("questionList", returnArray.toArray());
        return returnMap;
      }
    } catch (Exception e) {
      internalErrorCatch(r);
      return null;
    }
  }

}
