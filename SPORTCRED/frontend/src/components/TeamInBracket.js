import React from "react";

const TeamInBracket = ({ teamName, setGame, team1, team2 }) => {
  if (teamName) {
    return <h1 className={teamName}>{teamName}</h1>;
  } else {
    return (
      <div className="radio-bracket">
        <label className="radio-bracket" htmlFor="pick">
          {team1}
        </label>
        <input
          type="radio"
          name="pick"
          value={team1}
          onChange={(e) => {
            setGame(e.target.value);
          }}
        />
        <label className="radio-bracket" htmlFor="pick">
          {team2}
        </label>
        <input
          type="radio"
          name="pick"
          value={team2}
          onChange={(e) => {
            setGame(e.target.value);
          }}
        />
      </div>
    );
  }
};

export default TeamInBracket;
