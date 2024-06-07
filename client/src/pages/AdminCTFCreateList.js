import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import create_problem from "../assets/create_problem.png";

import CTFProblemList from "../components/CTFProblemList";
import CTFProblemPopup from "../components/CTFProblemPopup";

const AdminCTFCreateList = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 화면으로 돌아가기
  };

  const handleNext = () => {
    navigate("/ctfadminmode"); // "/adminctfcreate" 경로로 이동
  };

  const handleAdd = () => {
    navigate("/createCTF"); // "/adminctfcreate" 경로로 이동
  };

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const data = [
    {
      ctf_id: 1,
      ctf_chall_id: 1,
      challenge_title: "string",
      challenge_type: "Crypto",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 2,
      challenge_title: "string",
      challenge_type: "System",
      challenge_pts: 100,
      solve: false,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 3,
      challenge_title: "string",
      challenge_type: "Web",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 7,
      challenge_title: "string",
      challenge_type: "Web",
      challenge_pts: 200,
      solve: false,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 4,
      challenge_title: "string",
      challenge_type: "Forensics",
      challenge_pts: 100,
      solve: false,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 5,
      challenge_title: "string",
      challenge_type: "Reversing",
      challenge_pts: 100,
      solve: false,
    },
  ];

  const filteredData = data;
  // CTF 종류에 따라 필터링 해야하는 경우
  // const filteredData = data.filter((item) => item.ctf_id == id);

  const categorizedChallenges = {
    System: [],
    Reversing: [],
    Web: [],
    Crypto: [],
    Forensics: [],
    Misc: [],
  };

  filteredData.forEach((challenge) => {
    if (categorizedChallenges[challenge.challenge_type]) {
      categorizedChallenges[challenge.challenge_type].push(challenge);
    }
  });

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedChallenge(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="admin_ctf_create_list_container">
      <div>
        <h2 className="admin_ctf_create_list_title">관리자 모드</h2>
        <h2 className="admin_ctf_create_list_title_2">신규 CTF 생성</h2>
        <h2 className="admin_ctf_create_list_title_3">CTF 문제 출제</h2>
        <div className="create_problem_btn_contaienr">
          <img
            className="create_problem_btn"
            src={create_problem}
            onClick={handleAdd}
          ></img>
        </div>
        <div className="admin_ctf_create_list_made_container">
          {Object.keys(categorizedChallenges).map(
            (type) =>
              categorizedChallenges[type].length > 0 && (
                <div key={type} className={`${type.toLowerCase()}_container`}>
                  <h3>{type}</h3>
                  <div className="ctf_problem_area_grid">
                    <CTFProblemList
                      challenges={categorizedChallenges[type]}
                      onChallengeClick={handleChallengeClick}
                    />
                  </div>
                </div>
              )
          )}
        </div>
        {isPopupOpen && selectedChallenge && (
          <CTFProblemPopup
            challenge={selectedChallenge}
            onClose={handleClosePopup}
          />
        )}
      </div>
      <div className="admin_ctf_create_list_btn_container">
        <button
          className="admin_ctf_create_list_btn_go_back"
          onClick={handleGoBack}
        >
          취소
        </button>
        <button className="admin_ctf_create_list_btn_next" onClick={handleNext}>
          완료하기
        </button>
      </div>
    </div>
  );
};

export default AdminCTFCreateList;
