package c01.todoteamname.project.SPORTCRED;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import static org.neo4j.driver.Values.parameters;

public class Neo4JDB {

	private Driver driver;
	private String uriDb;
	
	public Neo4JDB() {
		
		uriDb = "bolt://localhost:7687";
		driver = GraphDatabase.driver(uriDb, AuthTokens.basic("neo4j","1234"));
		
	}
	
}
