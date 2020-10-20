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
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import static org.neo4j.driver.Values.parameters;
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
      internalErrorCatch(r);
    }
  }

  public void internalErrorCatch(HttpExchange r) {
    try {
      r.sendResponseHeaders(500, -1);
    } catch (IOException e) {
    }
  }

  public int updateScore(String username, String ACS, String categoryScore, String category) {
    try (Session session = driver.session()) {
      String line =
          String.format("MATCH (u:User {username:$a}) SET u.ACS=$b SET u.%s=$c", category);
      session.writeTransaction(
          tx -> tx.run(line, parameters("a", username, "b", ACS, "c", categoryScore)));
      session.close();
      return 200;
    } catch (Exception e) {
      e.printStackTrace();
      return 500;
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
        String curAns;
        ArrayList<Object> answerArray;
        ArrayList<Object> returnArray = new ArrayList<>();

        while (result.hasNext()) {
          answerArray = new ArrayList<>();
          endMap = new HashMap<>();
          Map<String, Object> temp = result.next().fields().get(0).value().asMap();
          endMap.put("question", temp.get("question"));
          curAns = (String) temp.get("correct");
          for (int i = 1; i < 5; i++) {
            tempMap = new HashMap<>();
            tempMap.put("answerText", temp.get(String.format("answer%s", i)));
            tempMap.put("isCorrect", curAns.equals(String.format("%s", i)));
            answerArray.add(tempMap);
          }
          endMap.put("answerOptions", answerArray.toArray());
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
  
	public int createUser(String username, String password, String email, String[] answeredQuestions) {

		double zeroScore = 0;
		String emptyString = "";
		String Q1 = answeredQuestions[0], 
				Q2 = answeredQuestions[1], 
				Q3 = answeredQuestions[2], 
				Q4 = answeredQuestions[3], 
				Q5 = answeredQuestions[4];

		try (Session session = driver.session()){

			Result checkUser;

			try (Transaction tx = session.beginTransaction()){

				checkUser = tx.run("MATCH (A:User {username: $x}) RETURN A",
						parameters("x", username));

				if (checkUser.hasNext()) {
					return 409;
				}

				checkUser = tx.run("MATCH (B:User {email: $x}) RETURN B", 
						parameters("x", email));

				if (checkUser.hasNext()) {
					return 412;
				}

				tx.run("CREATE (n:User {username: $u, Q1: $a, Q2: $b, Q3: $c, Q4: $d, Q5: $e, password: $v, biography: $w, "
						+ "picture: $w, ACS: $x, trivia: $x, debate: $x, picks: $x, "
						+ "history: $x, email: $y})",
						parameters("a", Q1, "b", Q2, "c", Q3, "d", Q4, "e", Q5, "u", 
								username, "v", password, "w", emptyString, "x", zeroScore, "y", email));

				tx.commit();
				return 201;

			}

		} catch (Exception e) {
			return 500;
		}

	}

	public void fillUser(UserNode fillIn, String username) {

		try (Session session = driver.session()){

			Result userInDB;

			try (Transaction tx = session.beginTransaction()){

				userInDB = tx.run("MATCH (U:User {username: $x}) RETURN U.username, "
						+ "U.password, U.email, U.biography, U.picture, U.answers, "
						+ "U.ACS, U.trivia, U.debate, U.picks, U.history, U.Q1, U.Q2, U.Q3, U.Q4, U.Q5",
						parameters("x", username));

				Map<String, Object> returnedData = userInDB.next().asMap();

				fillIn.setUsername((String) returnedData.get("U.username"));
				fillIn.setPassword((String) returnedData.get("U.password"));
				fillIn.setEmail((String) returnedData.get("U.email"));
				fillIn.setBiography((String) returnedData.get("U.biography"));
				fillIn.setPicture((String) returnedData.get("U.picture"));
				fillIn.setQ1((String) returnedData.get("U.Q1"));
				fillIn.setQ2((String) returnedData.get("U.Q2"));
				fillIn.setQ3((String) returnedData.get("U.Q3"));
				fillIn.setQ4((String) returnedData.get("U.Q4"));
				fillIn.setQ5((String) returnedData.get("U.Q5"));
				fillIn.setACS((double) returnedData.get("U.ACS"));
				fillIn.setTriviaScore((double) returnedData.get("U.trivia"));
				fillIn.setDebateScore((double) returnedData.get("U.debate"));
				fillIn.setPickScore((double) returnedData.get("U.picks"));
				fillIn.setHistoryScore((double) returnedData.get("U.history"));

				tx.commit();

			}

		} catch (Exception e) {
			System.out.println(e);
		}

	}

	public int checkLogin(String username, String password) {

		try (Session session = driver.session()){

			try (Transaction tx = session.beginTransaction()){

				Result checkCredentials = tx.run("MATCH (U:User {username: $x, password: $y}) RETURN U", 
						parameters("x", username, "y", password));

				if (checkCredentials.hasNext()) {
					return 200;
				}
				else {
					return 404;
				}

			}

		} catch (Exception e) {
			return 500;
		}

	}

}

