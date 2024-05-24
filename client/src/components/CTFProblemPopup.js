// components/CTFProblemPopup.js
import React from "react";

const CTFProblemPopup = ({ challenge, onClose }) => {
  return (
    <div className="ctf_problem_popup">
      <div className="ctf_problem_popup_content">
        <button className="ctf_problem_popup_close" onClick={onClose}>
          Close
        </button>
        <h4>{challenge.challenge_title}</h4>
        <p>Type: {challenge.challenge_type}</p>
        <p>Points: {challenge.challenge_pts}</p>
        <p>Status: {challenge.solve ? "Solved" : "Unsolved"}</p>
        <p>
          Description: {challenge.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default CTFProblemPopup;
