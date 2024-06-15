import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WargameDetailList from "../components/WargameDetailList";
import axios from "axios";

const WargameDetail = () => {
  let { id } = useParams();
  const [wargameData, setWargameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solverUsernames, setSolverUsernames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/guild/guild-wargame/${id}/`);
        setWargameData(response.data);
        
        if (response.data.quiz_solvers && response.data.quiz_solvers.length > 0) {
          const userRequests = response.data.quiz_solvers.map(userId => 
            axios.get(`http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/users/${userId}`).then(res => res.data.username)
          );
          const usernames = await Promise.all(userRequests);
          setSolverUsernames(usernames);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="wargame_info_container">
      <h1 className="wargame_detail_title">문제 정보</h1>
      {wargameData && <WargameDetailList {...wargameData} />}

      <h1 className="wargame_detail_title">문제 풀이자</h1>
      {solverUsernames.length > 0 ? (
        <ul className="wargame_detail_title">
          {solverUsernames.map((username, index) => (
            <li key={index}>{username}</li>
          ))}
        </ul>
      ) : (
        <span className="wargame_detail_title">풀이자가 없습니다.</span>
      )}
    </div>
  );
};

export default WargameDetail;
