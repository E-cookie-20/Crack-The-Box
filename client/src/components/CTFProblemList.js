import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // React Router의 useParams를 import


const CTFProblemList = ({ same_type_challenges, onChallengeClick }) => {
  const [challenges, setChallenges] = useState([]);
  const { ctf_id } = useParams(); // useParams를 사용하여 URL에서 ctf_id를 추출

  /*useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`/ctf/${ctf_id}`);
        setChallenges(response.data.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, [ctf_id]);
  */
  return (
    <>
      {same_type_challenges.length === 0 ? (
        <p>아직 문제가 없습니다!</p>
      ) : (
        same_type_challenges.map((challenge) => (
          <div
            key={challenge.id}
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
