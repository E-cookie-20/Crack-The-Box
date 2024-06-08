import React, { useState, useEffect } from "react";
import ctf_ex_img from "../assets/ctf_example_img.png";
import profile_ex_img from "../assets/profile_example_img.png";
import CTFNameList from "./CTFNameList";
import CTFDetail from "./CTFDetail";
import ctf_icon from "../assets/ctf_icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import


const CTF = () => {
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const { userId, token } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [ctfId, setCtfId] = useState(null);


  const data = [
    {
      id: "0",
      ctf_start: "2024-05-17T10:00:00Z",
      ctf_fin: "2024-05-18T10:00:00Z",
      img: ctf_icon,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: ctf_icon,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
      ctf_description: "이것은 test CTF입니다!",
    },
    {
      id: "1",
      ctf_start: "2024-05-17T10:00:00Z",
      ctf_fin: "2024-05-18T10:00:00Z",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: ctf_icon,
      profile_name: "사이버보안 박지은",
      profile_position: "길드장",
      progress: 1,
      ctf_description: "이것은 test CTF입니다!",
    },
    {
      id: "2",
      ctf_start: "2024-05-17T10:00:00Z",
      ctf_fin: "2024-05-18T10:00:00Z",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: ctf_icon,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
      ctf_description: "이것은 test CTF입니다!",
    },
    {
      id: "3",
      ctf_start: "2024-05-17T10:00:00Z",
      ctf_fin: "2024-05-18T10:00:00Z",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: ctf_icon,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 1,
      ctf_description: "이것은 test CTF입니다!",
    },
    {
      id: "4",
      ctf_start: "2024-05-17T10:00:00Z",
      ctf_fin: "2024-05-18T10:00:00Z",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: ctf_icon,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 1,
      ctf_description: "이것은 test CTF입니다!",
    },
    {
      id: "5",
      ctf_start: "2024-05-17T10:00:00Z",
      ctf_fin: "2024-05-18T10:00:00Z",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: profile_ex_img,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
      ctf_description: "이것은 test CTF입니다!",
    },
  ];
  
  /*
  const fetchData = async () => {
    try {
      //const guild=userInfo.user_guild;
      //console.log({guild})
      const response = await axios.get(`http://127.0.0.1:8000/guild/${userInfo.user_guild}/ctf`);
      //const response = await axios.get('http://127.0.0.1:8000/guild/1/ctf'); //테스트용

      const fetchedData = response.data.guild_CTF_list.map((item, index) => ({
        id: item.id,
        ctf_name: item.ctf_name,
        progress: item.ctf_onging ? 1 : 0,
        img: ctf_icon,
      }));
      setListData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };*/

  useEffect(() => {
    
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data.user_guild)
        const user_guild=response.data.user_guild
        setUserInfo(response.data);
        //fetchData();
        
        if (response.data) {
          // userInfo가 null이 아닌지 체크
          console.log("~");
          try {
       
            const response = await axios.get(`http://127.0.0.1:8000/guild/${user_guild}/ctf`);
            //const response = await axios.get('http://127.0.0.1:8000/guild/1/ctf'); //테스트용
        
              const fetchedData = response.data.guild_CTF_list.map((item, index) => ({
                id: item.id,
                ctf_name: item.ctf_name,
                progress: item.ctf_onging ? 1 : 0,
                img: ctf_icon,
              }));

              // ctf_id 상태를 업데이트합니다.
         
              setListData(fetchedData);
            } catch (error) {
              console.error("Error fetching data:", error);
          };
        };
      } 
        catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId, token]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }


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

  const handleItemClick = (item) => {
    setCtfId(item.id);
    setSelectedItem(item);
  };

  const handleBackClick = () => {
    setSelectedItem(null);
  };


  return (
    <div>
      {selectedItem ? (
        <CTFDetail id={ctfId} onBack={handleBackClick} />
        /*<CTFDetail {...selectedItem} onBack={handleBackClick} />*/
      ) : (
        <div className="ctf_container">
          <div className="ctf_in_progress_container">
            <div className="ctf_in_progress_title">현재 진행 중인 CTF</div>
            <div className="ctf_in_progress">
              {listData
                .filter((it) => it.progress === 1)
                .map((it) => (
                  <div onClick={() => {handleItemClick(it);}} key={it.id}>
                    <CTFNameList {...it} />
                  </div>
                ))}
            </div>
            <div className="ctf_finished_title">완료된 CTF</div>
            <div className="ctf_finished">
              {listData
                .filter((it) => it.progress === 0)
                .map((it) => (
                  <div onClick={() => handleItemClick(it)} key={it.id}>
                    <CTFNameList {...it} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CTF;
