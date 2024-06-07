import React from "react";

const CTFProblemList = ({ challenges, onChallengeClick }) => {
  return (
    <>
      {challenges.length === 0 ? (
        <p>아직 문제가 없습니다!</p>
      ) : (
        challenges.map((challenge) => (
          <div
            key={challenge.ctf_chall_id}
            className="ctf_problem_item"
            style={{
              backgroundColor: challenge.solve ? "#3C6EF0" : "#242424",
            }}
            onClick={() => onChallengeClick(challenge)}
          >
            <div className="ctf_problem_title">{challenge.challenge_title}</div>
            <h1 className="ctf_problem_points">{challenge.challenge_pts}</h1>
          </div>
        ))
      )}
    </>
  );
};

export default CTFProblemList;
