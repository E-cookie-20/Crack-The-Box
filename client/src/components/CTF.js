import React, { useState, useEffect } from "react";
import ctf_ex_img from "../assets/ctf_example_img.png";
import profile_ex_img from "../assets/profile_example_img.png";
import CTFNameList from "./CTFNameList";
import CTFDetail from "./CTFDetail";
import ctf_icon from "../assets/ctf_icon.png";
import axios from "axios";

const CTF = () => {
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const fetchData = async () => {
    try {
      //const response = await axios.get('http://127.0.0.1:8000/guild/${user.guild_id}/ctf');
      const response = await axios.get('http://127.0.0.1:8000/guild/1/ctf'); //테스트용
      const fetchedData = response.data.guild_CTF_list.map((item, index) => ({
        id: index.id,
        ctf_name: item.ctf_name,
        progress: item.ctf_onging ? 1 : 0,
        img: ctf_icon,
      }));
      setListData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    //getData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackClick = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      {selectedItem ? (
        //<>{selectedItem}</>
        <CTFDetail {...selectedItem} onBack={handleBackClick} />
      ) : (
        <div className="ctf_container">
          <div className="ctf_in_progress_container">
            <div className="ctf_in_progress_title">현재 진행 중인 CTF</div>
            <div className="ctf_in_progress">
              {listData
                .filter((it) => it.progress === 1)
                .map((it) => (
                  <div onClick={() => handleItemClick(it)} key={it.id}>
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
