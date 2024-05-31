import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure you have axios installed, or use fetch if preferred
import { saveAs } from "file-saver"; // Assuming you have file-saver installed

const WargameDetailList = ({
  id,
  quiz_description,
  quiz_flag,
  quiz_title,
  quiz_level,
  quiz_type,
  quiz_file,
  author,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [authorUsername, setAuthorUsername] = useState("");

  useEffect(() => {
    const fetchAuthorUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${author}`);
        setAuthorUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching author username:", error);
        setAuthorUsername("Unknown"); // Fallback if there's an error
      }
    };

    fetchAuthorUsername();
  }, [author]);

  const handleDownload = () => {
    const blob = new Blob([quiz_file], { type: "application/octet-stream" });
    saveAs(blob, quiz_title);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckAnswer = () => {
    if (inputValue === quiz_flag) {
      setResultMessage("정답입니다!🌈");
    } else {
      setResultMessage("틀렸습니다. 다시 시도하세요.");
    }
  };

  return (
    <div className="quiz_info_container">
      <div>
        <div className="quiz_basic_info_container">
          <div className="quiz_title_container">
            <div className="wargame_detail_list_text">제목</div>
            <div className="quiz_title">{quiz_title}</div>
          </div>
          <div className="quiz_level_container">
            <div className="wargame_detail_list_text">난이도</div>
            <div className="quiz_level">
              {quiz_level === "beginner" && "하"}
              {quiz_level === "intermediate" && "중"}
              {quiz_level === "high" && "상"}
            </div>
          </div>
          <div className="quiz_type_container">
            <div className="wargame_detail_list_text">태그</div>
            <div className="quiz_type">#{quiz_type}</div>
          </div>
        </div>
        <div className="quiz_description_container">
          <div className="wargame_detail_list_text">문제 설명</div>
          <div className="horizontal_line"></div>
          <div className="quiz_description">
            <div style={{ lineHeight: "2.5" }}>
              {quiz_description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
            <div className="quiz_download_button_container">
              <button className="download_button" onClick={handleDownload}>
                문제 파일 다운로드
              </button>
            </div>
          </div>
        </div>
        <div className="flag_submit_container">
          <h1>답안 제출</h1>
          <div className="flag_input_container">
            <input
              className="flag_input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="플래그 형식을 기반으로 정답을 입력해주세요"
            ></input>
            <button className="flag_submit_button" onClick={handleCheckAnswer}>
              제출하기
            </button>
          </div>
          <div className="result_message_container">{resultMessage}</div>
        </div>
      </div>
      <div className="author_container">
        <h3 className="author_title">출제자 정보</h3>
        <div className="author_sub_container">
          <div className="quiz_author">{authorUsername}</div>
        </div>
      </div>
    </div>
  );
};

export default WargameDetailList;
