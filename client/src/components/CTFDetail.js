import React, { useState } from "react";
import CTFProblem from "../pages/CTFProblem";

const CTFDetail = ({
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
}) => {
  const [showProblem, setShowProblem] = useState(false);

  const handleParticipateClick = () => {
    setShowProblem(true);
  };

  return (
    <div className="ctf_detail_container">
      {showProblem ? (
        <CTFProblem
          date={date}
          img={img}
          ctf_name={ctf_name}
          ctf_start={ctf_start}
          ctf_fin={ctf_fin}
          profile_img={profile_img}
          profile_name={profile_name}
          profile_position={profile_position}
          ctf_description={ctf_description}
          onBack={() => setShowProblem(false)}
        />
      ) : (
        <>
          <div className="ctf_detail_title_container">
            <h1 className="ctf_detail_title">{ctf_name}</h1>
            <button className="ctf_go_back" onClick={onBack}>
              뒤로 가기
            </button>
          </div>
          <div className="ctf_detail_date">
            <p className="ctf_detail_start_time">{ctf_start}</p>
            <p>-</p>
            <p className="ctf_detail_fin_time">{ctf_fin}</p>
            <button
              className="ctf_participate_btn"
              onClick={handleParticipateClick}
            >
              참가하기
            </button>
          </div>
          <div className="ctf_detail_img_container">
            <img className="ctf_detail_img" src={img} alt={ctf_name} />
            <div>{ctf_description}</div>
          </div>
          <div className="ctf_detail_ranking_container">
            <h2 className="ctf_detail_ranking_title">실시간 순위</h2>
            <div className="ctf_detail_ranking"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CTFDetail;
