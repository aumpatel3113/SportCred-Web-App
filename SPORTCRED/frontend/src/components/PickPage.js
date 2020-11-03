import React, { useEffect, useState } from "react";
import "./PickPage.css";
import TeamInBracket from "./TeamInBracket";

const PickPage = () => {
  const [r1g1, setR1g1] = useState("");
  const [r1g2, setR1g2] = useState("");
  const [r1g3, setR1g3] = useState("");
  const [r1g4, setR1g4] = useState("");
  const [r1g5, setR1g5] = useState("");
  const [r1g6, setR1g6] = useState("");
  const [r1g7, setR1g7] = useState("");
  const [r1g8, setR1g8] = useState("");
  const [r2g1, setR2g1] = useState("");
  const [r2g2, setR2g2] = useState("");
  const [r2g3, setR2g3] = useState("");
  const [r2g4, setR2g4] = useState("");
  const [r3g1, setR3g1] = useState("");
  const [r3g2, setR3g2] = useState("");
  const [champ, setChamp] = useState("");
  const [winners, setWinners] = useState(undefined);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/v1/checkForUserBracket");
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status != 404) {
        console.log(xhr.response);
        setR1g1(xhr.response.series1.team);
        setR1g2(xhr.response.series2.team);
        setR1g3(xhr.response.series3.team);
        setR1g4(xhr.response.series4.team);
        setR1g5(xhr.response.series5.team);
        setR1g6(xhr.response.series6.team);
        setR1g7(xhr.response.series7.team);
        setR1g8(xhr.response.series8.team);
        setR2g1(xhr.response.series9.team);
        setR2g2(xhr.response.series10.team);
        setR2g3(xhr.response.series11.team);
        setR2g4(xhr.response.series12.team);
        setR3g1(xhr.response.series13.team);
        setR3g2(xhr.response.series14.team);
        setChamp(xhr.response.series15.team);
      }
    };
    xhr.onerror = () => {
      console.log(xhr.response);
      alert("Can't connect to server! Something went wrong!");
    };

    xhr.send(
      JSON.stringify({
        username: btoa(sessionStorage.getItem("username")),
        playoffsID: "NBA Playoffs",
      })
    );
  }, []);

  const submitBracket = (e) => {
    e.preventDefault();
    if (
      r1g1 &&
      r1g2 &&
      r1g3 &&
      r1g4 &&
      r1g5 &&
      r1g6 &&
      r1g7 &&
      r1g8 &&
      r2g1 &&
      r2g2 &&
      r2g3 &&
      r2g4 &&
      r3g1 &&
      r3g2 &&
      champ
    ) {
      const data = {
        playoffsID: "NBA Playoffs",
        username: btoa(sessionStorage.getItem("username")),
        series: [
          { id: "1", team: r1g1 },
          { id: "2", team: r1g2 },
          { id: "3", team: r1g3 },
          { id: "4", team: r1g4 },
          { id: "5", team: r1g5 },
          { id: "6", team: r1g6 },
          { id: "7", team: r1g7 },
          { id: "8", team: r1g8 },
          { id: "9", team: r2g1 },
          { id: "10", team: r2g2 },
          { id: "11", team: r2g3 },
          { id: "12", team: r2g4 },
          { id: "13", team: r3g1 },
          { id: "14", team: r3g2 },
          { id: "15", team: champ },
        ],
      };
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8080/api/v1/predictPlayoffBracket");
      xhr.responseType = "json";
      xhr.onload = () => {
        if (xhr.status < 400) {
          console.log(xhr.response);
          setWinners(xhr.response);
        } else {
          alert("400 Error Status");
        }
      };
      xhr.onerror = () => {
        alert("Can't connect to server! Something went wrong!");
      };
      xhr.send(JSON.stringify(data));
      alert("Bracket Predictions submitted");
    } else {
      alert("Please finish filling out bracket");
    }
  };

  return (
    <div className="pick-page">
      <h5>What's Your Pick?</h5>
      <h3 className="sect-title">2020 NBA Playoffs Bracket</h3>
      <hr />
      <div className="bracket-head">
        <h3 className="sect-title">First Round</h3>
        <h3 className="sect-title">Second Round</h3>
        <h3 className="sect-title">Conference Finals</h3>
        <h3 className="sect-title">Finals</h3>
        <h3 className="sect-title">Champion</h3>
      </div>
      <form onSubmit={submitBracket}>
        <div className="bracket">
          <div className="first-round">
            <div className="game-1">
              <div className="team Bucks">
                <TeamInBracket teamName="Bucks" />
              </div>
              <div className="team Magic">
                <TeamInBracket teamName="Magic" />
              </div>
            </div>
            <div className="game-1">
              <div className="team Pacers">
                <TeamInBracket teamName="Pacers" />
              </div>
              <div className="team Heat">
                <TeamInBracket teamName="Heat" />
              </div>
            </div>
            <div className="game-1">
              <div className="team Celtics">
                <TeamInBracket teamName="Celtics" />
              </div>
              <div className="team Seventy-6ers">
                <TeamInBracket teamName="Seventy-6ers" />
              </div>
            </div>
            <div className="game-1">
              <div className="team Raptors">
                <TeamInBracket teamName="Raptors" />
              </div>
              <div className="team Nets">
                <TeamInBracket teamName="Nets" />
              </div>
            </div>
            <div className="game-1">
              <div className="team Lakers">
                <TeamInBracket teamName="Lakers" />
              </div>
              <div className="team Blazers">
                <TeamInBracket teamName="Blazers" />
              </div>
            </div>
            <div className="game-1">
              <div className="team Rockets">
                <TeamInBracket teamName="Rockets" />
              </div>
              <div className="team Thunder">
                <TeamInBracket teamName="Thunder" />
              </div>
            </div>
            <div className="game-1">
              <div className="team Nuggets">
                <TeamInBracket teamName="Nuggets" />
              </div>
              <div className="team Jazz">
                <TeamInBracket teamName="Jazz" />
              </div>
            </div>
            <div className="game-1">
              <div className="team Clippers">
                <TeamInBracket teamName="Clippers" />
              </div>
              <div className="team Mavericks">
                <TeamInBracket teamName="Mavericks" />
              </div>
            </div>
          </div>

          <div className="second-round">
            <div className="game-2">
              <div className={"team " + r1g1}>
                <TeamInBracket
                  teamName={r1g1}
                  setGame={setR1g1}
                  team1="Bucks"
                  team2="Magic"
                />
              </div>
              <div className={"team " + r1g2}>
                <TeamInBracket
                  teamName={r1g2}
                  setGame={setR1g2}
                  team1="Pacers"
                  team2="Heat"
                />
              </div>
            </div>
            <div className="game-2">
              <div className={"team " + r1g3}>
                <TeamInBracket
                  teamName={r1g3}
                  setGame={setR1g3}
                  team1="Celtics"
                  team2="Seventy-6ers"
                />
              </div>
              <div className={"team " + r1g4}>
                <TeamInBracket
                  teamName={r1g4}
                  setGame={setR1g4}
                  team1="Raptors"
                  team2="Nets"
                />
              </div>
            </div>
            <div className="game-2">
              <div className={"team " + r1g5}>
                <TeamInBracket
                  teamName={r1g5}
                  setGame={setR1g5}
                  team1="Lakers"
                  team2="Blazers"
                />
              </div>
              <div className={"team " + r1g6}>
                <TeamInBracket
                  teamName={r1g6}
                  setGame={setR1g6}
                  team1="Rockets"
                  team2="Thunder"
                />
              </div>
            </div>
            <div className="game-2">
              <div className={"team " + r1g7}>
                <TeamInBracket
                  teamName={r1g7}
                  setGame={setR1g7}
                  team1="Nuggets"
                  team2="Jazz"
                />
              </div>
              <div className={"team " + r1g8}>
                <TeamInBracket
                  teamName={r1g8}
                  setGame={setR1g8}
                  team1="Clippers"
                  team2="Mavericks"
                />
              </div>
            </div>
          </div>

          <div className="third-round">
            <div className="game-3">
              <div className={"team " + r2g1}>
                {r1g1 && r1g2 && (
                  <TeamInBracket
                    teamName={r2g1}
                    setGame={setR2g1}
                    team1={r1g1}
                    team2={r1g2}
                  />
                )}
              </div>
              <div className={"team " + r2g2}>
                {r1g3 && r1g4 && (
                  <TeamInBracket
                    teamName={r2g2}
                    setGame={setR2g2}
                    team1={r1g3}
                    team2={r1g4}
                  />
                )}
              </div>
            </div>
            <div className="game-3">
              <div className={"team " + r2g3}>
                {r1g5 && r1g6 && (
                  <TeamInBracket
                    teamName={r2g3}
                    setGame={setR2g3}
                    team1={r1g5}
                    team2={r1g6}
                  />
                )}
              </div>
              <div className={"team " + r2g4}>
                {r1g7 && r1g8 && (
                  <TeamInBracket
                    teamName={r2g4}
                    setGame={setR2g4}
                    team1={r1g7}
                    team2={r1g8}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="finals">
            <div className="game-4">
              <div className={"team " + r3g1}>
                {r2g1 && r2g2 && (
                  <TeamInBracket
                    teamName={r3g1}
                    setGame={setR3g1}
                    team1={r2g1}
                    team2={r2g2}
                  />
                )}
              </div>
              <div className={"team " + r3g2}>
                {r2g3 && r2g4 && (
                  <TeamInBracket
                    teamName={r3g2}
                    setGame={setR3g2}
                    team1={r2g3}
                    team2={r2g4}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="champ">
            <div className="game-5">
              <div className={"team " + champ}>
                {r3g1 && r3g2 && (
                  <TeamInBracket
                    teamName={champ}
                    setGame={setChamp}
                    team1={r3g1}
                    team2={r3g2}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="submit-bracket">
          Submit Bracket Picks / See Results
        </button>
      </form>

      <h3 className="sect-title">Your Results</h3>
      <hr />
      {winners && (
        <div className="results">
          {winners.series1.correct ? (
            <h3 className="right">
              {"[Round 1 Series 1] You were right! " + r1g1 + " won!"}
            </h3>
          ) : (
            r1g1 && (
              <h3 className="wrong">
                {"[Round 1 Series 1] You guessed " + r1g1 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series2.correct ? (
            <h3 className="right">
              {"[Round 1 Series 2] You were right! " + r1g2 + " won!"}
            </h3>
          ) : (
            r1g2 && (
              <h3 className="wrong">
                {"[Round 1 Series 2] You guessed " + r1g2 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series3.correct ? (
            <h3 className="right">
              {"[Round 1 Series 3] You were right! " + r1g3 + " won!"}
            </h3>
          ) : (
            r1g3 && (
              <h3 className="wrong">
                {"[Round 1 Series 3] You guessed " + r1g3 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series4.correct ? (
            <h3 className="right">
              {"[Round 1 Series 4] You were right! " + r1g4 + " won!"}
            </h3>
          ) : (
            r1g4 && (
              <h3 className="wrong">
                {"[Round 1 Series 4] You guessed " + r1g4 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series5.correct ? (
            <h3 className="right">
              {"[Round 1 Series 5] You were right! " + r1g5 + " won!"}
            </h3>
          ) : (
            r1g5 && (
              <h3 className="wrong">
                {"[Round 1 Series 5] You guessed " + r1g5 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series6.correct ? (
            <h3 className="right">
              {"[Round 1 Series 6] You were right! " + r1g6 + " won!"}
            </h3>
          ) : (
            r1g6 && (
              <h3 className="wrong">
                {"[Round 1 Series 6] You guessed " + r1g6 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series7.correct ? (
            <h3 className="right">
              {"[Round 1 Series 7] You were right! " + r1g7 + " won!"}
            </h3>
          ) : (
            r1g7 && (
              <h3 className="wrong">
                {"[Round 1 Series 7] You guessed " + r1g7 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series8.correct ? (
            <h3 className="right">
              {"[Round 1 Series 8] You were right! " + r1g8 + " won!"}
            </h3>
          ) : (
            r1g8 && (
              <h3 className="wrong">
                {"[Round 1 Series 8] You guessed " + r1g8 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series9.correct ? (
            <h3 className="right">
              {"[Round 2 Series 1] You were right! " + r2g1 + " won!"}
            </h3>
          ) : (
            r2g1 && (
              <h3 className="wrong">
                {"[Round 2 Series 1] You guessed " + r2g1 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series10.correct ? (
            <h3 className="right">
              {"[Round 2 Series 2] You were right! " + r2g2 + " won!"}
            </h3>
          ) : (
            r2g2 && (
              <h3 className="wrong">
                {"[Round 2 Series 2] You guessed " + r2g2 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series11.correct ? (
            <h3 className="right">
              {"[Round 2 Series 3] You were right! " + r2g3 + " won!"}
            </h3>
          ) : (
            r2g3 && (
              <h3 className="wrong">
                {"[Round 2 Series 3] You guessed " + r2g3 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series12.correct ? (
            <h3 className="right">
              {"[Round 2 Series 4] You were right! " + r2g4 + " won!"}
            </h3>
          ) : (
            r2g4 && (
              <h3 className="wrong">
                {"[Round 2 Series 4] You guessed " + r2g4 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series13.correct ? (
            <h3 className="right">
              {"[East Finals] You were right! " + r3g1 + " won!"}
            </h3>
          ) : (
            r3g1 && (
              <h3 className="wrong">
                {"[East Finals] You guessed " + r3g1 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series14.correct ? (
            <h3 className="right">
              {"[West Finals] You were right! " + r3g2 + " won!"}
            </h3>
          ) : (
            r3g2 && (
              <h3 className="wrong">
                {"[West Finals] You guessed " + r3g2 + " but that's wrong"}
              </h3>
            )
          )}
          {winners.series15.correct ? (
            <h3 className="right">
              {"[NBA Finals] You were right! " + champ + " won it all!!! 🤩"}
            </h3>
          ) : (
            champ && (
              <h3 className="wrong">
                {"[NBA Finals] You guessed " + champ + " but that's wrong 😔"}
              </h3>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PickPage;
