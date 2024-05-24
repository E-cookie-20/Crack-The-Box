import React, { useState, useEffect } from "react";
import ctf_ex_img from "../assets/ctf_example_img.png";
import profile_ex_img from "../assets/profile_example_img.png";
import CTFNameList from "./CTFNameList";
import CTFDetail from "./CTFDetail";
import ctf_icon from "../assets/ctf_icon.png";

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

  const getData = async () => {
    const initData = data.slice(0, 20).map((it) => {
      return {
        id: it.id,
        date: it.date,
        ctf_start: it.ctf_start,
        ctf_fin: it.ctf_fin,
        img: it.img,
        ctf_name: it.ctf_name,
        profile_img: it.profile_img,
        profile_name: it.profile_name,
        profile_position: it.profile_position,
        progress: it.progress,
        ctf_description: it.ctf_description,
      };
    });
    setListData(initData);
  };

  useEffect(() => {
    getData();
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
