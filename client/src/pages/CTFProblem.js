import React, { useState } from "react";
import CTFProblemList from "../components/CTFProblemList";
import CTFProblemPopup from "../components/CTFProblemPopup";

const CTFProblem = ({
  id,
  date,
  img,
  ctf_name,
  ctf_start,
  ctf_fin,
  profile_img,
  profile_name,
  profile_position,
  onBack,
  ctf_description,
  challenges,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /*
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
    {
      ctf_id: 1,
      ctf_chall_id: 6,
      challenge_title: "string",
      challenge_type: "Misc",
      challenge_pts: 100,
      solve: false,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 1,
      challenge_title: "string",
      challenge_type: "Crypto",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 2,
      challenge_title: "string",
      challenge_type: "System",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 3,
      challenge_title: "string",
      challenge_type: "Web",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 4,
      challenge_title: "string",
      challenge_type: "Forensics",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 5,
      challenge_title: "string",
      challenge_type: "Reversing",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 6,
      challenge_title: "string",
      challenge_type: "Misc",
      challenge_pts: 100,
      solve: true,
    },
  ];
  */

  //const filteredData = data.filter((item) => item.ctf_id == id);
  const challenge_list=challenges;
  const categorizedChallenges = {
    System: [],
    Reversing: [],
    Web: [],
    Crypto: [],
    Forensics: [],
    Misc: [],
  };

  challenge_list.forEach(challenge => {
    const type = challenge.challenge_type.charAt(0).toUpperCase() + challenge.challenge_type.slice(1).toLowerCase();
    if (categorizedChallenges[type]) {
      categorizedChallenges[type].push(challenge);
    } else {
      categorizedChallenges.Misc.push(challenge); // 만약 예상치 못한 타입일 경우 Misc에 넣음
    }
  });
  console.log(categorizedChallenges);

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedChallenge(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="ctf_problem_container">
      <div className="ctf_problem_title_container">
        <h2 className="ctf_problem_title">{ctf_name}</h2>
        <div className="ctf_problem_date">
          <p className="ctf_problem_start_time">{ctf_start}</p>
          <p>-</p>
          <p className="ctf_problem_fin_time">{ctf_fin}</p>
        </div>
        <div className="ctf_problem_go_back_container">
          <button onClick={onBack} className="ctf_problem_go_back">
            뒤로가기
          </button>
        </div>
      </div>
      <div className="ctf_problem_area">
        {Object.keys(categorizedChallenges).map(
          (type) =>
            categorizedChallenges[type].length > 0 && (
              <div key={type} className={`${type.toLowerCase()}_container`}>
                <h3>{type}</h3>
                <div className="ctf_problem_area_grid">
                  <CTFProblemList /*문제 타입별로 나열된 ctf 문제 리스트 */
                    same_type_challenges={categorizedChallenges[type]}
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
  );
};

export default CTFProblem;
