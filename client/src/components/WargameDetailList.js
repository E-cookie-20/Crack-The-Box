import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure you have axios installed, or use fetch if preferred
import { saveAs } from "file-saver"; // Assuming you have file-saver installed
import { useParams } from 'react-router-dom';

const WargameDetailList = () => {
  const [inputValue, setInputValue] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [authorUsername, setAuthorUsername] = useState("");
  const [authorGuild, setAuthorGuild] = useState("");
  const [guildName, setGuildName] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // URL에서 id 값을 추출

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/wargame/${id}`); //id로 받아와야하는 것 같은데.. 맞나?
        setQuizData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8000/users/${quizData.author}`);
        setAuthorUsername(userResponse.data.username);
        const guildId = userResponse.data.user_guild;
        setAuthorGuild(guildId);

        if (guildId) {
          const guildResponse = await axios.get(`http://localhost:8000/guild/guild/${guildId}`);
          setGuildName(guildResponse.data.guild_name);
        } else {
          setGuildName("Unknown");
        }
      } catch (error) {
        console.error("Error fetching author or guild details:", error);
        setAuthorUsername("Unknown");
        setAuthorGuild("Unknown");
        setGuildName("Unknown");
      }
    };

    fetchAuthorDetails();
  }, []);

  const handleDownload = () => {
    const blob = new Blob([quizData.quiz_file], { type: "application/octet-stream" });
    saveAs(blob, quizData.quiz_title);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckAnswer = () => {
    if (inputValue === quizData.quiz_flag) {
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
            <div className="quiz_title">{quizData.quiz_title}</div>
          </div>
          <div className="quiz_level_container">
            <div className="wargame_detail_list_text">난이도</div>
            <div className="quiz_level">
              {quizData.quiz_level === "beginner" && "하"}
              {quizData.quiz_level === "intermediate" && "중"}
              {quizData.quiz_level === "high" && "상"}
            </div>
          </div>
          <div className="quiz_type_container">
            <div className="wargame_detail_list_text">태그</div>
            <div className="quiz_type">#{quizData.quiz_type}</div>
          </div>
        </div>
        <div className="quiz_description_container">
          <div className="wargame_detail_list_text">문제 설명</div>
          <div className="horizontal_line"></div>
          <div className="quiz_description">
            <div style={{ lineHeight: "2.5" }}>
              {quizData.quiz_description.split("\n").map((line, index) => (
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
          <span className="quiz_author">길드: </span>
          <span className="quiz_author">{guildName}</span>
        </div>
      </div>
    </div>
  );
};

export default WargameDetailList;
