// components/CTFProblemPopup.js
import React from "react";

const CTFProblemPopup = ({ challenge, onClose }) => {
  return (
    <div className="ctf_problem_popup">
      <div className="ctf_problem_popup_content">
        <button className="ctf_problem_popup_close" onClick={onClose}>
          X
        </button>
        <div className="ctf_problem_container">
          <div className="ctf_problem_title_area">
            <h2 className="popup_ctf_problem_title">
              {challenge.challenge_title}
            </h2>
            <h1 className="popup_ctf_problem_score">
              {challenge.challenge_pts}
            </h1>
          </div>
          <div className="popup_ctf_description">
            <p>
              Description:{" "}
              {challenge.description || "No description available."}
            </p>
          </div>
          <div className="popup_ctf_hint">이것은 힌트입니다.</div>
          <div className="ctf_popup_input_container">
            <input
              className="ctf_popup_input"
              placeholder={
                challenge.solve
                  ? "이미 푼 문제입니다"
                  : "플래그 형식을 기반으로 정답을 입력해주세요"
              }
              disabled={challenge.solve}
            ></input>
            {!challenge.solve && (
              <button className="ctf_popup_button">제출하기</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFProblemPopup;
