import React, { useState, useEffect} from "react";
import "./Latest.css";
import axios from "axios";

const TheLatest = () => {
    const [latestPosts, setLatestPosts] = useState([]);

    const [teamSort, setTeamSort] = useState('All Teams');
    const [yearSort, setYearSort] = useState('2019');
    const [page, setPage] = useState(1);

    const headers = {
        'Content-Type': 'text/plain',
    }
   
    // WIN / LOSE COLOURS
    const winColor = "#00ff00";
    const loseColor = "#ca0000";

    // TEAM COLOURS
    var myMap = new Map();
    myMap.set("LA Clippers", "#004edf");
    myMap.set("Atlanta Hawks", "#fd4800");
    myMap.set("Los Angeles Lakers", "#af01ff");
    myMap.set("Charlotte Hornets", "#00ffaa");
    myMap.set("Toronto Raptors", "red");
    myMap.set("Milwaukee Bucks", "#0c3a10");
    myMap.set("Phoenix Suns", "#de3aff");
    myMap.set("Golden State Warriors", "#ffe600");
    myMap.set("Brooklyn Nets", "#b8b7b2");
    myMap.set("Houston Rockets", "#640000");
    myMap.set("Boston Celtics", "#07a50f");
    myMap.set("New Orleans Pelicans", "#645500");
    myMap.set("Denver Nuggets", "yellow");
    myMap.set("Chicago Bulls", "#ff3d3d");
    myMap.set("Memphis Grizzlies", "#1f436d");
    myMap.set("Minnesota Timberwolves", "blue");
    myMap.set("New York Knicks", "#ff7300");
    myMap.set("Washington Wizards", "#2600ff");
    myMap.set("Miami Heat", " #ff00b3");
    myMap.set("Indiana Pacers", "#bde700");
    myMap.set("Sacramento Kings", "#67317c");
    myMap.set("San Antonio Spurs", "#3c383d");
    myMap.set("Utah Jazz", "#afa122");
    myMap.set("Portland Trail Blazers", "#b30000");
    myMap.set("Cleveland Cavaliers","#882525")
    myMap.set("Philadelphia 76ers", "#00a2ff");
    myMap.set("Oklahoma City Thunder", "#ffd900");
    myMap.set("Orlando Magic", "#009ee7");
    myMap.set("Dallas Mavericks", "#01a2ff");
    myMap.set("Detroit Pistons", "#333131");

    const colourTeam = (team) => {
        return myMap.get(team);
    };

    const colourTeamScore = (score1, score2) => {
        if (score1 > score2) return winColor;
        if (score1 < score2) return loseColor;
    };

    //Rerender the posts whenever the user selects a new sorting method
    useEffect(() => {
        setPage(1)

        if (teamSort == 'All Teams'){
            axios.post('http://localhost:8080/api/v1/getGameFeed', { 'season': yearSort, 'page': "1"}, {headers})
            .then(res => {
                setLatestPosts([])
                    for (var i = 0; i < res.data.data.length; i++) {
                        setLatestPosts(posts => [...posts,
                            {
                              id: res.data.data[i].id,
                              homeScore: res.data.data[i].home_team_score,
                              awayScore: res.data.data[i].visitor_team_score,
                              homeTeam: res.data.data[i].home_team.full_name,
                              awayTeam: res.data.data[i].visitor_team.full_name,
                              date: res.data.data[i].date.substring(0,10),
                              season: res.data.data[i].season
                            }
                        ]);
                    }
            })
            .catch(err => {
                console.log(err.status);
                console.log(err.code);
                alert("Error fetching the games");
            })
        } else {
            axios.post('http://localhost:8080/api/v1/getGameFeed', { 'season': yearSort, 'team': teamSort, 'page': "1"}, {headers})
            .then(res => {
                //setLatestPosts(res.data.data)
                setLatestPosts([])
                for (var i = 0; i < res.data.data.length; i++) {
                    setLatestPosts(posts => [...posts,
                        {
                          id: res.data.data[i].id,
                          homeScore: res.data.data[i].home_team_score,
                          awayScore: res.data.data[i].visitor_team_score,
                          homeTeam: res.data.data[i].home_team.full_name,
                          awayTeam: res.data.data[i].visitor_team.full_name,
                          date: res.data.data[i].date.substring(0,10),
                          season: res.data.data[i].season
                        }
                    ]);
                }
                
            })
            .catch(err => {
                console.log(err.status);
                console.log(err.code);
            })
        }
        
      }, [teamSort, yearSort])

      function nextPage(){
        changePage(1)
      }

      function previousPage(){
        if(page > 1){
            changePage(-1)
        }
      }

      function changePage(change){
        if (teamSort == 'All Teams'){
            console.log(page + change)
            axios.post('http://localhost:8080/api/v1/getGameFeed', { 'season': yearSort, 'page': page + change}, {headers})
            .then(res => {
                setLatestPosts([])
                    for (var i = 0; i < res.data.data.length; i++) {
                        setLatestPosts(posts => [...posts,
                            {
                              id: res.data.data[i].id,
                              homeScore: res.data.data[i].home_team_score,
                              awayScore: res.data.data[i].visitor_team_score,
                              homeTeam: res.data.data[i].home_team.full_name,
                              awayTeam: res.data.data[i].visitor_team.full_name,
                              date: res.data.data[i].date.substring(0,10),
                              season: res.data.data[i].season
                            }
                        ]);
                    }
                setPage(page + change)
            })
            .catch(err => {
                console.log(err.response.status)
                if (err.response.status == 400){
                    alert('No more games to display')
                }
                console.log(err.status);
                console.log(err.code);
            })
        } else {
            console.log(page + change)
            axios.post('http://localhost:8080/api/v1/getGameFeed', { 'season': yearSort, 'team': teamSort, 'page':  page + change}, {headers})
            .then(res => {
                console.log('din ding ding')
                setLatestPosts([])
                for (var i = 0; i < res.data.data.length; i++) {
                    setLatestPosts(posts => [...posts,
                        {
                          id: res.data.data[i].id,
                          homeScore: res.data.data[i].home_team_score,
                          awayScore: res.data.data[i].visitor_team_score,
                          homeTeam: res.data.data[i].home_team.full_name,
                          awayTeam: res.data.data[i].visitor_team.full_name,
                          date: res.data.data[i].date.substring(0,10),
                          season: res.data.data[i].season
                        }
                    ]);
                }
                setPage(page + change)
            })
            .catch(err => {
                console.log(err.response.status)
                if (err.response.status == 400){
                    alert('No more games to display')
                }
                console.log(err.status);
                console.log(err.code);
            })
        } 
      }

    useEffect(() => {
        axios.post('http://localhost:8080/api/v1/getGameFeed', {'season': "2019", 'page': "1"}, {headers})
        .then (res => {
            if (res.data) {
                console.log("hewwo?")
                console.log(res.data)
                console.log(res.data.data.length)
                for (var i = 0; i < res.data.data.length; i++) {
                    setLatestPosts(posts => [...posts,
                        {
                          id: res.data.data[i].id,
                          homeScore: res.data.data[i].home_team_score,
                          awayScore: res.data.data[i].visitor_team_score,
                          homeTeam: res.data.data[i].home_team.full_name,
                          awayTeam: res.data.data[i].visitor_team.full_name,
                          date: res.data.data[i].date.substring(0,10),
                          season: res.data.data[i].season
                        }
                    ]);
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

      return (
          <div className="latest-table">
          <h3> DISPLAYING LATEST GAMES ... </h3>

            <select size="1" className="filterSelect" onChange={(e) => setTeamSort(e.target.value)}>
                <option value='All Teams'>All Teams</option>
                <option value='Atlanta Hawks'>Atlanta Hawks</option>
                <option value='Boston Celtics'>Boston Celtics</option>
                <option value='Brooklyn Nets'>Brooklyn Nets</option>
                <option value='Charlotte Hornets'>Charlotte Hornets</option>
                <option value='Chicago Bulls'>Chicago Bulls</option>
                <option value='Cleveland Cavaliers'>Cleveland Cavaliers</option>
                <option value='Dallas Mavericks'>Dallas Mavericks</option>
                <option value='Denver Nuggets'>Denver Nuggets</option>
                <option value='Detroit Pistons'>Detroit Pistons</option>
                <option value='Golden State Warriors'>Golden State Warriors</option>
                <option value='Houston Rockets'>Houston Rockets</option>
                <option value='Indiana Pacers'>Indiana Pacers</option>
                <option value='LA Clippers'>Los Angeles Clippers</option>
                <option value='Los Angeles Lakers'>Los Angeles Lakers</option>
                <option value='Memphis Grizzlies'>Memphis Grizzlies</option>
                <option value='Miami Heat'>Miami Heat</option>
                <option value='Milwaukee Bucks'>Milwaukee Bucks</option>
                <option value='Minnesota Timberwolves'>Minnesota Timberwolves</option>
                <option value='New Orleans Pelicans'>New Orleans Pelicans</option>
                <option value='New York Knicks'>New York Knicks</option>
                <option value='Oklahoma City Thunder'>Oklahoma City Thunder</option>
                <option value='Orlando Magic'>Orlando Magic</option>
                <option value='Philadelphia 76ers'>Philadelphia 76ers</option>
                <option value='Phoenix Suns'>Phoenix Suns</option>
                <option value='Portland Trail Blazers'>Portland Trail Blazers</option>
                <option value='Sacramento Kings'>Sacramento Kings</option>
                <option value='San Antonio Spurs'>San Antonio Spurs</option>
                <option value='Toronto Raptors'>Toronto Raptors</option>
                <option value='Utah Jazz'>Utah Jazz</option>
                <option value='Washington Wizards'>Washington Wizards</option>
            </select>

            <select size="1" className="filterSelect" onChange={(e) => setYearSort(e.target.value)}>
                <option value='2019'>2019</option>
                <option value='2018'>2018</option>
                <option value='2017'>2017</option>
                <option value='2016'>2016</option>
            </select>

            <a href="#" class="previous round" onClick={previousPage}>&#8249;</a>
            <div className="page">Page: {page}</div>
            <a href="#" class="next round" onClick={nextPage}>&#8250;</a>

          <table>
          <td><b>DATE</b></td>
          <td><b>HOME TEAM</b></td>
          <td><b>VISITOR TEAM</b></td>
          <td><b>FINAL SCORE</b></td>
          <td><b>SEASON</b></td>
          {latestPosts.map(latestPost => (
                   <tbody>
                   <td>{latestPost.date}</td>
                   <td style={{ color: colourTeam(latestPost.homeTeam) }}>{`${latestPost.homeTeam} `}</td>
                   <td style={{ color: colourTeam(latestPost.awayTeam) }}>{`${latestPost.awayTeam} `}</td>
                   <td> <span style={{ color: colourTeamScore(latestPost.homeScore, latestPost.awayScore) }}> {`${latestPost.homeScore} `} </span> - <span style={ { color: colourTeamScore(latestPost.awayScore, latestPost.homeScore) }}> {`${latestPost.awayScore} `} </span>  </td>
                   <td>{latestPost.season}</td>
                    </tbody>
            ))}
            </table>
          </div>
    );
}

export default TheLatest;