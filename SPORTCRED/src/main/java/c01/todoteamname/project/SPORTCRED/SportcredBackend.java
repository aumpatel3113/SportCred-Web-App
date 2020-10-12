package c01.todoteamname.project.SPORTCRED;

import java.io.IOException;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;

public class SportcredBackend 
{
	static int PORT = 8080;

    public static void main(String[] args) {
        
        try {
        	
			HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", PORT), 0);
			System.out.println("Server on port:" + PORT);
		} catch (IOException e) {
			System.err.println("Server Could Not Be Started");
		}
        
    }
    
}
