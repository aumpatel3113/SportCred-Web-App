package c01.todoteamname.project.SPORTCRED;

import static org.neo4j.driver.Values.parameters;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;
import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import org.neo4j.driver.exceptions.ClientException;
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

  public int updateScore(String username, double ACS, double categoryScore, String category) {
    try (Session session = driver.session()) {
      String line =
          String.format("MATCH (u:User {username:$a}) SET u.ACS=$b SET u.%s=$c", category);
      session.writeTransaction(
          tx -> tx.run(line, parameters("a", username, "b", ACS, "c", categoryScore)));
      session.close();
      return 200;
    } catch (Exception e) {
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

  public int createUser(String username, String password, String email,
      String[] answeredQuestions) {

    double zeroScore = 0;
    String emptyString = "";
    String coolPicture = "./lebron.jpg";
    String Q1 = answeredQuestions[0], Q2 = answeredQuestions[1], Q3 = answeredQuestions[2],
        Q4 = answeredQuestions[3], Q5 = answeredQuestions[4];

    try (Session session = driver.session()) {

      Result checkUser;

      try (Transaction tx = session.beginTransaction()) {

        checkUser = tx.run("MATCH (A:User {username: $x}) RETURN A", parameters("x", username));

        if (checkUser.hasNext()) {
          return 409;
        }

        checkUser = tx.run("MATCH (B:User {email: $x}) RETURN B", parameters("x", email));

        if (checkUser.hasNext()) {
          return 412;
        }

        tx.run(
            "CREATE (n:User {username: $u, Q1: $a, Q2: $b, Q3: $c, Q4: $d, Q5: $e, password: $v, biography: $w, "
                + "picture: $z, ACS: $x, trivia: $x, debate: $x, picks: $x, "
                + "history: $x, email: $y})",
            parameters("a", Q1, "b", Q2, "c", Q3, "d", Q4, "e", Q5, "u", username, "v", password,
                "w", emptyString, "x", zeroScore, "y", email, "z", coolPicture));

        tx.commit();
        return 201;

      }

    } catch (Exception e) {
      return 500;
    }

  }

  public String getProfilePicture(HttpExchange r, String username) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        Result result =
            tx.run("MATCH (n{username:$x}) RETURN n.picture", parameters("x", username));
        return result.peek().get("n.picture").asString();
      }
    } catch (Exception e) {
      internalErrorCatch(r);
      return null;
    }
  }

  public void fillUser(UserNode fillIn, String username) {

    try (Session session = driver.session()) {

      Result userInDB;

      try (Transaction tx = session.beginTransaction()) {

        userInDB = tx.run(
            "MATCH (U:User {username: $x}) RETURN U.username, "
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

    try (Session session = driver.session()) {

      try (Transaction tx = session.beginTransaction()) {

        Result checkCredentials = tx.run("MATCH (U:User {username: $x, password: $y}) RETURN U",
            parameters("x", username, "y", password));

        if (checkCredentials.hasNext()) {
          return 200;
        } else {
          return 404;
        }

      }

    } catch (Exception e) {
      return 500;
    }

  }

  public void storeRoom(HttpExchange r, String username, JSONArray questions,
      String questionsAnswered, String questionsCorrect) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String line =
            "CREATE (r:room {username:$b, questionsAnswered:$c,questionsCorrect:$d}) Return ID(r)";
        Result result =
            tx.run(line, parameters("b", username, "c", questionsAnswered, "d", questionsCorrect));

        int num = result.next().get(0).asInt();

        for (int i = 0; i < 10; i++) {
          line =
              "MATCH (r:room) WHERE ID(r)=$a MATCH (u:trivia) WHERE u.question=$g CREATE (r)-[z:asked]->(u)";
          tx.run(line, parameters("a", num, "g", (String) questions.get(i)));
        }
        tx.commit();

      }
    } catch (Exception e) {
      internalErrorCatch(r);
    }
  }

  public Map<String, Object> getRoomNumbers(HttpExchange r, String username) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String line = "MATCH (u:room)\n" + "WHERE NOT u.username=$a\n WITH u, rand() AS number\n"
            + "RETURN ID(u), u.username\n" + "ORDER BY number\n" + "LIMIT 10";
        Result result = tx.run(line, parameters("a", username));

        int i = 0;
        HashMap<String, Object> tempMap;
        ArrayList<Object> responseArray = new ArrayList<>();

        while (result.hasNext()) {
          tempMap = new HashMap<>();
          Record temp = result.next();
          String roomNum = Integer.toString(temp.get(0).asInt());
          String user = temp.get(1).asString();
          tempMap.put("roomNumber", roomNum);
          tempMap.put("username", user);
          responseArray.add(tempMap);
          i++;
        }
        while (i < 10) {
          tempMap = new HashMap<>();
          tempMap.put("roomNumber", "");
          tempMap.put("username", ("Ti9B"));
          responseArray.add(tempMap);
          i++;
        }

        HashMap<String, Object> returnMap = new HashMap<>();
        returnMap.put("roomNumbers", responseArray.toArray());
        return returnMap;


      }
    } catch (Exception e) {
      internalErrorCatch(r);
      return null;
    }
  }

  public void deleteRoomNode(HttpExchange r, String roomNumber) {
    try (Session session = driver.session()) {
      String line = "MATCH (u:room)" + "WHERE ID(u)=$a\n DETACH DELETE u";
      session.writeTransaction(tx -> tx.run(line, parameters("a", Integer.parseInt(roomNumber))));
      session.close();
    } catch (Exception e) {
      internalErrorCatch(r);
    }
  }

  public Map<String, Object> sendOpponentDetails(HttpExchange r, String roomNumber) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String line = "MATCH (u:room)" + "WHERE ID(u)=$a\n RETURN u";
        Result result = tx.run(line, parameters("a", Integer.parseInt(roomNumber)));
        String line2 = "MATCH (u:room)-[r:asked]->(x:trivia)" + "WHERE ID(u)=$a\n RETURN x";
        Result result2 = tx.run(line2, parameters("a", Integer.parseInt(roomNumber)));

        HashMap<String, Object> returnMap = new HashMap<>();

        if (result.hasNext()) {
          Map<String, Object> temp2 = result.next().fields().get(0).value().asMap();
          returnMap.put("username", temp2.get("username"));
          returnMap.put("opponentCorrect", temp2.get("questionsCorrect"));
          returnMap.put("opponentAnswered", temp2.get("questionsAnswered"));
          deleteRoomNode(r, roomNumber);

          HashMap<String, Object> endMap;
          HashMap<String, Object> tempMap;
          String curAns;
          ArrayList<Object> answerArray;
          ArrayList<Object> returnArray = new ArrayList<>();

          while (result2.hasNext()) {
            answerArray = new ArrayList<>();
            endMap = new HashMap<>();
            Map<String, Object> temp = result2.next().fields().get(0).value().asMap();
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
          returnMap.put("questionList", returnArray.toArray());
          return returnMap;
        }
      }
      r.sendResponseHeaders(404, -1);
      return null;

    } catch (Exception e) {
      internalErrorCatch(r);
      return null;
    }
  }


  public void updateUserProfile(HttpExchange r, JSONObject deserialized) {
    try (Session session = driver.session()) {
      // building the query
      String username = deserialized.getString("username");
      String query = String.format("MATCH(n{username: '%s'}) SET ", username);
      Iterator<?> properties = deserialized.keys();
      String[] passwords = {null, null};

      while (properties.hasNext()) {
        String current = (String) properties.next();
        if (current.equals("password")) {
          passwords[0] = deserialized.getString(current);
        } else if (current.equals("oldPassword")) {
          passwords[1] = deserialized.getString(current);
        } else if (!current.equals("username")) {
          query += String.format("n.%s = '%s', ", current, deserialized.getString(current));
        }
      }

      if (passwords[0] != null && passwords[1] != null) {
        String addToQuery = validatePassword(username, passwords);
        if (addToQuery != null)
          query += addToQuery;
        else
          throw new ClientException("invalid password");
      }

      query = query.substring(0, query.length() - 2);

      // running the query
      String message = query;
      session.writeTransaction(tx -> tx.run(message));
      session.close();
    } catch (Exception e) {
      try {
        if (e.getMessage().equals("invalid password"))
          throw new ClientException("invalid password");
        r.sendResponseHeaders(500, -1);
      } catch (IOException e1) {
      }
    }
  }

  private String validatePassword(String username, String[] passwords) {
    try (Session session = driver.session()) {
      if (username != null) {
        String query = String.format("MATCH(n{username: '%s'}) RETURN n.password", username);
        Result result = session.run(query);
        String actualPassword = result.peek().get("n.password").asString();
        if (actualPassword.equals(passwords[1])) {
          return String.format("n.password = '%s', ", passwords[0]);
        }
      }
      return null;
    } catch (Exception e) {
      return null;
    }
  }

  public Map<String, Object> getRankBasedQuestions(HttpExchange r, String rank) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String line = "MATCH (d:debateQuestion {rank:$a})\n" + "RETURN (d)";
        Result result = tx.run(line, parameters("a", rank));

        HashMap<String, Object> endMap = new HashMap<>();
        ArrayList<Object> answerArray = new ArrayList<>();

        while (result.hasNext()) {
          Map<String, Object> temp = result.next().fields().get(0).value().asMap();
          answerArray.add(temp.get("question"));
        }
        endMap.put("questions", answerArray.toArray());
        return endMap;
      }
    } catch (Exception e) {
      e.printStackTrace();
      internalErrorCatch(r);
      return null;
    }
  }

  public void updateDebateRoom(HttpExchange r, String username, String post, int roomID,
      int userNum) {
    try (Session session = driver.session()) {
      String line = String.format("MATCH (d:debateRoom)\n MATCH(u:User {username:$b})"
          + "WHERE ID(d)=$a\n SET d.user%s=$b\n  SET d.user%sPost=$c\n CREATE (u)-[:debated]->(d)",
          userNum, userNum);
      session
          .writeTransaction(tx -> tx.run(line, parameters("a", roomID, "b", username, "c", post)));
      session.close();
    } catch (Exception e) {
      internalErrorCatch(r);
    }
  }

  public void createNewDebateRoom(HttpExchange r, String question) {
    try (Session session = driver.session()) {
      String line = "CREATE (d:debateRoom {question:$a, user1:$b,user2:$b,user3:$b,user1Post:$b,"
          + "user2Post:$b,user3Post:$b, user1Score:$c,user2Score:$c,user3Score:$c, user1Votes:$c,"
          + "user2Votes:$c,user3Votes:$c})";
      session.writeTransaction(tx -> tx.run(line, parameters("a", question, "b", "NULL", "c", 0)));
      session.close();
    } catch (Exception e) {
      internalErrorCatch(r);
    }
  }


  public int[] getDebateRoom(HttpExchange r, String question) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String line =
            "MATCH (d:debateRoom {question:$a, user3:$b})\n WHERE NOT d.user2=$b\n Return ID(d)";
        Result result = tx.run(line, parameters("a", question, "b", "NULL"));

        if (result.hasNext()) {
          int[] retArray = {result.next().get(0).asInt(), 3};
          return retArray;
        }

        line = "MATCH (d:debateRoom {question:$a, user2:$b}) Return ID(d)";
        result = tx.run(line, parameters("a", question, "b", "NULL"));

        if (result.hasNext()) {
          int[] retArray = {result.next().get(0).asInt(), 2};
          return retArray;
        }

        createNewDebateRoom(r, question);
        line = "MATCH (d:debateRoom {question:$a, user1:$b}) Return ID(d)";
        result = tx.run(line, parameters("a", question, "b", "NULL"));

        int[] retArray = {result.next().get(0).asInt(), 1};
        return retArray;

      }
    } catch (Exception e) {
      e.printStackTrace();
      internalErrorCatch(r);
      return null;
    }
  }

  public Map<String, Object> isValidPost(HttpExchange r, String username) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        boolean valid = true;
        String line =
            "MATCH(u:User {username:$a}) MATCH(d:debateRoom) MATCH ((u)-[f:debated]->(d)) RETURN(f)";
        Result result = tx.run(line, parameters("a", username));

        HashMap<String, Object> endMap = new HashMap<>();

        if (result.hasNext()) {
          valid = false;
        }
        endMap.put("isValid", valid);
        return endMap;
      }
    } catch (Exception e) {
      e.printStackTrace();
      internalErrorCatch(r);
      return null;
    }
  }

  public void storeDebateQuestion(HttpExchange r, String question, String rank) {
    try (Session session = driver.session()) {
      String line = "MERGE (m:debateQuestion {question:$a, rank:$b})";
      session.writeTransaction(tx -> tx.run(line, parameters("a", question, "b", rank)));
      session.close();
    } catch (Exception e) {
      internalErrorCatch(r);
    }

  }

  public Map<String, Object> getDebateGroup(HttpExchange r, String username) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String line =
            "MATCH(d:debateRoom) WHERE NOT d.user3=$b MATCH(u:User {username:$a}) WHERE NOT "
                + "((u)-[:debated|voted]->(d)) RETURN(d)";
        Result result = tx.run(line, parameters("a", username, "b", "NULL"));

        HashMap<String, Object> endMap = new HashMap<>();
        ArrayList<Object> postList = new ArrayList<Object>();

        if (result.hasNext()) {
          Map<String, Object> temp = result.next().fields().get(0).value().asMap();
          Object[] usernames = {temp.get("user1"), temp.get("user2"), temp.get("user3")};
          Object[] posts = {temp.get("user1Post"), temp.get("user2Post"), temp.get("user3Post")};
          Object[] scores =
              {temp.get("user1Score"), temp.get("user2Score"), temp.get("user3Score")};

          for (int z = 0; z < 3; z++) {
            HashMap<String, Object> tempMap = new HashMap<>();
            tempMap.put("user", usernames[z]);
            tempMap.put("post", posts[z]);
            tempMap.put("scores", scores[z]);
            tempMap.put("question", temp.get("question"));
            postList.add(new JSONObject(tempMap));
          }
        }

        endMap.put("postGroup", postList.toArray());
        return endMap;
      }
    } catch (Exception e) {
      e.printStackTrace();
      internalErrorCatch(r);
      return null;
    }
  }

  public int addZonePost(String author, String content) {

    try (Session session = driver.session()) {

      try (Transaction tx = session.beginTransaction()) {

        Result checkPostNumber = tx.run("MATCH (p:ZonePost) RETURN COUNT(p)");

        int numPosts = ((Long) checkPostNumber.next().asMap().get("COUNT(p)")).intValue();
        int zeroCount = 0;

        tx.run(
            "CREATE (p:ZonePost {postID: $w, author: $x, content: $y, likeCount: $z, dislikeCount: $z})",
            parameters("w", numPosts + 1, "x", author, "y", content, "z", zeroCount));
        tx.commit();

        return numPosts + 1;

      }

    } catch (Exception e) {
      return -1;
    }

  }

  public int ratePost(boolean likingPost, int parentPostID, String currentUser) {

    try (Session session = driver.session()) {

      try (Transaction tx = session.beginTransaction()) {

        if (checkIfRated(currentUser, parentPostID) == 1) {
          return 403;
        } else if (checkIfRated(currentUser, parentPostID) == -1) {
          return 405;
        }

        if (likingPost) {

          tx.run("MATCH (p:ZonePost {postID: $x}) SET p.likeCount = p.likeCount + 1",
              parameters("x", parentPostID));
          tx.run(
              "MATCH (p:ZonePost {postID: $x}), (u:User {username: $y}) CREATE (u)-[r:LIKED_POST]->(p)",
              parameters("x", parentPostID, "y", currentUser));

        } else {
          tx.run("MATCH (p:ZonePost {postID: $x}) SET p.dislikeCount = p.dislikeCount + 1",
              parameters("x", parentPostID));
          tx.run(
              "MATCH (p:ZonePost {postID: $x}), (u:User {username: $y}) CREATE (u)-[r:DISLIKED_POST]->(p)",
              parameters("x", parentPostID, "y", currentUser));
        }
        tx.commit();

        return 200;

      }

    } catch (Exception e) {
      System.out.println(e);
      return 500;
    }

  }

  private int checkIfRated(String username, int postID) {

    // Return 0 if not rated, 1 if liked, -1 if disliked
    try (Session session = driver.session()) {

      try (Transaction tx = session.beginTransaction()) {

        Result checkExistingRating = tx.run(
            "MATCH (p:ZonePost {postID: $x}), "
                + "(u:User {username: $y}), (u)-[r:LIKED_POST]->(p) RETURN r",
            parameters("x", postID, "y", username));

        if (checkExistingRating.hasNext()) {
          tx.commit();
          return 1;
        }

        checkExistingRating = tx.run(
            "MATCH (p:ZonePost {postID: $x}), "
                + "(u:User {username: $y}), (u)-[r:DISLIKED_POST]->(p) RETURN r",
            parameters("x", postID, "y", username));

        if (checkExistingRating.hasNext()) {
          tx.commit();
          return -1;
        }
        tx.commit();
        return 0;
      }

    }

  }

  public int addZoneComment(String currentUsername, int parentPostID, String commentContent) {

    try (Session session = driver.session()) {

      try (Transaction tx = session.beginTransaction()) {

        Result checkCommentNumber =
            tx.run("MATCH (p:ZonePost {postID: $x}), (c)-[r:COMMENT_ON]->(p) RETURN COUNT(c)",
                parameters("x", parentPostID));

        int numComments = ((Long) checkCommentNumber.next().asMap().get("COUNT(c)")).intValue();

        tx.run(
            "MATCH (p:ZonePost {postID: $w}) "
                + "CREATE (c:ZoneComment {commentID: $x, content: $y, author: $z}), "
                + "(c)-[r:COMMENT_ON]->(p)",
            parameters("w", parentPostID, "x", numComments + 1, "y", commentContent, "z",
                currentUsername));
        tx.commit();

        return 200;

      }

    } catch (Exception e) {
      return 500;
    }


  }

  private void deleteDebateQuestions(HttpExchange r) {
    try (Session session = driver.session()) {
      String line = "MATCH (d:debateQuestion) DETACH DELETE (d)";
      session.writeTransaction(tx -> tx.run(line));
      session.close();
    } catch (Exception e) {
      e.printStackTrace();
      internalErrorCatch(r);
    }
  }


  public void resetDebateQuestions(HttpExchange r) {
    try (Session session = driver.session()) {
      String line = "MATCH (r:debateRoom) DETACH DELETE(r)";
      session.writeTransaction(tx -> tx.run(line));
      session.close();
      deleteDebateQuestions(r);
    } catch (Exception e) {
      e.printStackTrace();
      internalErrorCatch(r);
    }
  }

  public List<JSONObject> getZoneFeed(String currentUser) {

    List<JSONObject> toReturn = new ArrayList<JSONObject>();

    try (Session session = driver.session()) {

      try (Transaction tx = session.beginTransaction()) {


        Result allPost = tx.run(
            "MATCH (p:ZonePost) RETURN p.postID, p.author, p.content, p.likeCount, p.dislikeCount");
        Result allComments;
        Result checkRatedByUser;

        Record currentPost;
        Record currentComment;

        List<String> listOfCommentsOnCurrent;

        while (allPost.hasNext()) {

          listOfCommentsOnCurrent = new ArrayList<>();

          currentPost = allPost.next();

          int currentPostID = ((Long) currentPost.asMap().get("p.postID")).intValue();
          int currentPostLikeCount = ((Long) currentPost.asMap().get("p.likeCount")).intValue();
          int currentPostDislikeCount =
              ((Long) currentPost.asMap().get("p.dislikeCount")).intValue();
          String currentPostAuthor = (String) currentPost.asMap().get("p.author");
          String currentPostContent = (String) currentPost.asMap().get("p.content");

          boolean likedCurrentPost;
          boolean dislikedCurrentPost;

          checkRatedByUser = tx.run(
              "MATCH (p:ZonePost {postID: $x}), " + "(u:User {username: $y}), "
                  + "(u)-[r:LIKED_POST]->(p) RETURN r",
              parameters("x", currentPostID, "y", currentUser));
          likedCurrentPost = checkRatedByUser.hasNext();

          checkRatedByUser = tx.run(
              "MATCH (p:ZonePost {postID: $x}), " + "(u:User {username: $y}), "
                  + "(u)-[r:DISLIKED_POST]->(p) RETURN r",
              parameters("x", currentPostID, "y", currentUser));
          dislikedCurrentPost = checkRatedByUser.hasNext();

          allComments = tx.run(
              "MATCH (p:ZonePost {postID: $x}), " + "(c)-[r:COMMENT_ON]->(p) "
                  + "RETURN c.author, c.content ORDER BY c.commentID DESC",
              parameters("x", currentPostID));



          while (allComments.hasNext()) {

            currentComment = allComments.next();

            String author = new String(
                Base64.getDecoder().decode((String) currentComment.asMap().get("c.author")));
            String commentContent = (String) currentComment.asMap().get("c.content");
            // String author = (String) currentComment.asMap().get("c.author");
            // String commentContent = (String) currentComment.asMap().get("c.content");

            String completeComment = author + ": " + commentContent;
            listOfCommentsOnCurrent.add(completeComment);
            System.out.println("ON POSTID: " + currentPostID + " COMMENT IS: " + completeComment);
          }

          JSONObject postAsJSON = new JSONObject();
          postAsJSON.put("postID", currentPostID);
          postAsJSON.put("author", currentPostAuthor);
          postAsJSON.put("content", currentPostContent);
          postAsJSON.put("likes", currentPostLikeCount);
          postAsJSON.put("dislikes", currentPostDislikeCount);
          postAsJSON.put("userHasLiked", likedCurrentPost);
          postAsJSON.put("userHasDisliked", dislikedCurrentPost);
          postAsJSON.put("comments", listOfCommentsOnCurrent.toArray());

          toReturn.add(postAsJSON);
        }

        return toReturn;
      }

    } catch (Exception e) {
      return null;
    }

  }

  public void storePlayoffBracket(HttpExchange r, String playoffsID, PlayoffSeries[] series) {
    try (Session session = driver.session()) {
      String pre = String.format("MERGE (n:playoffBracket {playoffsID:'%s',numSeries:%s",
          playoffsID, series.length);

      for (int i = 0; i < series.length; i++) {
        pre += String.format(",series%d:['%d', '%d','%s','%s','%s','%d']", i + 1, series[i].getId(),
            series[i].getRound(), series[i].getTeam1(), series[i].getTeam2(), series[i].getWinner(),
            series[i].getSeriesLength());
      }

      String post = pre += "})";
      session.writeTransaction(tx -> tx.run(post));
      session.close();
    } catch (Exception e) {
      internalErrorCatch(r);
    }
  }

  public String getPlayoffBrackets(HttpExchange r) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String response = "{\n\t\"playoffs\" : [\n\t\t";
        Result result = tx.run("MATCH(n:playoffBracket) RETURN n");
        List<Record> records = result.list();

        for (Record x : records) {
          String playoffsID = x.get(0).get("playoffsID").asString();
          int numSeries = x.get(0).get("numSeries").asInt();
          response += "{\n\t\t\t\"playoffsID\" : \"" + playoffsID + "\",\n\t\t\t\"series\" : [\n";

          for (int i = 0; i < numSeries; i++) {
            List<Object> current = x.get(0).get(String.format("series%d", i + 1)).asList();
            response += "\t\t\t\t{\"id\" : \"" + current.get(0) + "\", \"round\" : \""
                + current.get(1) + "\"," + " \"team1\" : \"" + current.get(2) + "\", \"team2\" : \""
                + current.get(3) + "\"," + " \"winner\" : \"" + current.get(4)
                + "\", \"seriesLength\" : \"" + current.get(5) + "\"},\n";
          }
          response = response.substring(0, response.length() - 2) + "]\n\t\t},\n\t\t";
        }
        response = response.substring(0, response.length() - 4) + "\n\t]\n}";
        return response;
      }
    } catch (Exception e) {
      internalErrorCatch(r);
      return null;
    }
  }

  public String storeBracketPrediction(HttpExchange r, String username, String playoffsID,
      PlayoffSeries[] series) {
    try (Session session = driver.session()) {
      Boolean exists = checkForUserBracket(username, playoffsID);

      if (!exists) {
        String pre = String.format(
            "MERGE (n:playoffBracketPrediction {username:'%s'," + "playoffsID:'%s',numSeries:%s",
            username, playoffsID, series.length);

        for (int i = 0; i < series.length; i++) {
          pre += String.format(",series%d:['%d', '%s']", series[i].getId(), series[i].getId(),
              series[i].getWinner());
        }

        String post = pre += "})";
        session.writeTransaction(tx -> tx.run(post));
      }
      return compareBracketPrediction(r, series, playoffsID, username, exists);
    } catch (Exception e) {
      internalErrorCatch(r);
      return null;
    }
  }

  private Boolean checkForUserBracket(String username, String playoffsID) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String query = String.format(
            "MATCH(n:playoffBracketPrediction {username:'%s', playoffsID:'%s'})" + "RETURN n",
            username, playoffsID);
        return tx.run(query).hasNext();
      }
    }
  }

  private String compareBracketPrediction(HttpExchange r, PlayoffSeries[] prediction,
      String playoffsID, String username, Boolean exists) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String response =
            "{\n\t\"username\" : \"" + username + "\",\n\"playoffsID\" : \"" + playoffsID + "\",\n";
        int score = 0;

        for (int i = 0; i < prediction.length; i++) {
          String query = String.format(
              "MATCH(n:playoffBracket {playoffsID:'%s'})" + " RETURN n.series%d[0], n.series%d[4]",
              playoffsID, i + 1, i + 1);
          Result result = tx.run(query);
          List<Record> records = result.list();

          if (records.get(0).get(1).asString().equals("null"))
            return null;
          Boolean correct = prediction[i].getWinner().equals(records.get(0).get(1).asString());

          if (correct)
            score += 2;
          else
            score -= 2;

          response += String.format(
              "\t\"series%d\" : {\"id\" : \"%d\", \"team\" : \"%s\"," + " \"correct\" : %s},\n",
              i + 1, i + 1, prediction[i].getWinner(), correct);
        }
        UserNode user = new UserNode(username);
        if (!exists)
          user.updateScore(score, "picks");
        response = response.substring(0, response.length() - 2) + "\n}";
        return response;
      } catch (Exception e) {
        internalErrorCatch(r);
        return null;
      }
    }
  }

  public String checkForUserBracket(HttpExchange r, String username, String playoffsID) {
    try (Session session = driver.session()) {
      try (Transaction tx = session.beginTransaction()) {
        String response = "{\n\t\"username\" : \"" + username + "\",\n\t\"playoffsID\" : \""
            + playoffsID + "\",\n";

        // check if user has already made a prediction about this playoffs event
        String query = String.format(
            "MATCH(n:playoffBracketPrediction {username:'%s', playoffsID:'%s'})" + "RETURN n",
            username, playoffsID);
        Result result = tx.run(query);

        if (result.hasNext()) { // prediction data exists
          int numSeries = result.list().get(0).get(0).get("numSeries").asInt();
          for (int i = 0; i < numSeries; i++) {
            query = String.format(
                "MATCH(n:playoffBracketPrediction {playoffsID:'%s',"
                    + " username:'%s'}) RETURN n.series%d[0], n.series%d[1]",
                playoffsID, username, i + 1, i + 1);
            result = tx.run(query);
            List<Record> records = result.list();
            response += String.format("\t\"series%d\" : {\"id\" : \"%s\", \"team\" : \"%s\"},\n",
                i + 1, records.get(0).get(0).asString(), records.get(0).get(1).asString());
          }
          response = response.substring(0, response.length() - 2) + "\n}";
          return response;
        }
        return null;
      }
    } catch (Exception e) {
      internalErrorCatch(r);
      return null;
    }
  }
}
