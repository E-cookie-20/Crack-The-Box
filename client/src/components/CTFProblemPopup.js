// components/CTFProblemPopup.js
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";


const CTFProblemPopup = ({ challenge, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckAnswer = () => {


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/ctf/submit-flag', {
        user_id: 1, // userid로 대체 필요. 
        challenge_flag: inputValue,
        ctf_chall_id: challenge.id
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      /*
      if (response.data.message === '정답입니다!') {
        setSuccess(response.data.message);
        setPoints(response.data.points);
        setError(null);
      } else {
        setError(response.data.message);
        setSuccess(null);
        setPoints(null);
      }
      이 부분은 아직 프론트가 안한듯*/

    } catch (error) {
      console.log("flag 제출 오류");
    }
  };

  }
      


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
              {challenge.challenge_description || "No description available."}
            </p>
          </div>
          <div className="popup_ctf_hint">이것은 힌트입니다.</div>
          <div className="ctf_popup_input_container">
            <input
              className="ctf_popup_input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
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
