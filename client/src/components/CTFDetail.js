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
  const [ctfDetail, setCTFdetail] = useState(null);


  /*const handleItemClick = async (it) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/ctf/${it.id}`);
      console.log("success")
 
      const fetchedData = response.data; // 배열이 아닌 객체로 가정
      console.log('fetchedData :>> ', fetchedData);
      setSelectedItem(fetchedData);
      //console.log('selectedItem :>> ', selectedItem);
        
        id: fetchedData.id,
        ctf_name: fetchedData.ctf_name,
        ctf_description: fetchedData.ctf_description,
        ctf_start: fetchedData.ctf_start,
        ctf_fin: fetchedData.ctf_fin,
        progress: fetchedData.ctf_onging ? 1 : 0,
        img: ctf_icon,}
        

    } catch (error) {
      console.error("Error fetching CTF detail:", error);
    }
  };
  */

  useEffect (() => {
    console.log('id :>> ', id);
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/ctf/${id}`);
          console.log('response.data :>> ', response.data);
          console.log('response.data.ctf_detail :>> ', response.data.ctf_detail);
          setData(response.data);
          setCTFdetail(response.data.ctf_detail);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [id]);


  const handleParticipateClick = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/ctf/${id}/participate`);
      setShowProblem(true);
    } catch (error) {
      console.error("Error participating in CTF:", error);
      // 필요에 따라 오류 처리 추가
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const participate_users = data.participate_users;
  const sortedUsers = participate_users.sort((a, b) => b.user_pts - a.user_pts);

  const leaderboardData = sortedUsers.map((user, index) => ({
    username: user.ctf_user_name,
    rank: index + 1, // 1부터 시작하는 순위
    user_pts: user.user_pts,
  }));
  

  return (
    <div className="ctf_detail_container">
      {showProblem ? (
        <CTFProblem
          id={id}
          date={date}
          img={img}
          ctf_name={ctfDetail.ctf_name}
          ctf_start={ctfDetail.ctf_start}
          ctf_fin={ctfDetail.ctf_fin}
          profile_img={profile_img}
          profile_name={profile_name}
          profile_position={profile_position}
          onBack={() => setShowProblem(false)}
          ctf_description={ctfDetail.ctf_description}
          challenges={data.challenges} // 문제 데이터를 CTFProblem 컴포넌트로 전달
        />
      ) : (
        <>
          <div className="ctf_detail_title_container">
            <h1 className="ctf_detail_title">{ctfDetail.ctf_name}</h1>
            <button className="ctf_go_back" onClick={onBack}>
              뒤로 가기
            </button>
          </div>
          <div className="ctf_detail_date">
            <p className="ctf_detail_start_time">{ctfDetail.ctf_start}</p>
            <p>-</p>
            <p className="ctf_detail_fin_time">{ctfDetail.ctf_fin}</p>
            <button
              className="ctf_participate_btn"
              onClick={handleParticipateClick}
            >
              참가하기
            </button>
          </div>
          <div className="ctf_detail_img_container">
            <img className="ctf_detail_img" src={img} alt={ctfDetail.ctf_name} />
            <div>{ctfDetail.ctf_description}</div>
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
