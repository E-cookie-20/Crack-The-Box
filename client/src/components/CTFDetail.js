import React, { useState, useEffect } from "react";
import CTFProblem from "../pages/CTFProblem";
import Leaderboard from "./LeaderBoard";
import axios from "axios";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

/*  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/ctf/${id}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
*/
  const handleParticipateClick = async () => {
    try {
      await axios.post(`/ctf/${id}/participate`);
      setShowProblem(true);
    } catch (error) {
      console.error("Error participating in CTF:", error);
      // 필요에 따라 오류 처리 추가
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const { challenges, participate_users } = data;

  const leaderboardData = participate_users.map(user => ({
    username: user.ctf_user_name, // 사용자 이름 가져오기
    rank: user.id, // 실제 순위 로직으로 교체 필요
    user_pts: user.user_pts,
  }));

  return (
    <div className="ctf_detail_container">
      {showProblem ? (
        <CTFProblem
          id={id}
          date={date}
          img={img}
          ctf_name={ctf_name}
          ctf_start={ctf_start}
          ctf_fin={ctf_fin}
          profile_img={profile_img}
          profile_name={profile_name}
          profile_position={profile_position}
          onBack={() => setShowProblem(false)}
          ctf_description={ctf_description}
          challenges={challenges} // 문제 데이터를 CTFProblem 컴포넌트로 전달
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
            <div className="ctf_detail_ranking">
              <Leaderboard data={leaderboardData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CTFDetail;
