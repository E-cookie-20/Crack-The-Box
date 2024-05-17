import React, { useState, useEffect } from "react";
import ctf_ex_img from "../assets/ctf_example_img.png";
import profile_ex_img from "../assets/profile_example_img.png";
import CTFNameList from "./CTFNameList";

const CTF = () => {
  const data = [
    {
      date: "2024년 5월 10일",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: profile_ex_img,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
    },
    {
      date: "2024년 5월 11일",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: profile_ex_img,
      profile_name: "사이버보안 박지은",
      profile_position: "길드장",
      progress: 1,
    },
    {
      date: "2024년 5월 10일",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: profile_ex_img,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
    },
    {
      date: "2024년 5월 10일",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: profile_ex_img,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
    },
    {
      date: "2024년 5월 10일",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: profile_ex_img,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
    },
    {
      date: "2024년 5월 10일",
      img: ctf_ex_img,
      ctf_name: "Ewha Cyber Security CTF",
      profile_img: profile_ex_img,
      profile_name: "사이버보안 서아영",
      profile_position: "길드장",
      progress: 0,
    },
  ];

  const getData = async () => {
    const initData = data.slice(0, 20).map((it) => {
      return {
        date: it.date,
        img: it.img,
        ctf_name: it.ctf_name,
        profile_img: it.profile_img,
        profile_name: it.profile_name,
        profile_position: it.profile_position,
        progress: it.progress,
      };
    });
    setListData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const [listData, setListData] = useState([]);

  return (
    <div>
      <div className="ctf_container">
        <div className="ctf_in_progress_container">
          <div className="ctf_in_progress_title">현재 진행 중인 CTF</div>
          <div className="ctf_in_progress">
            {listData
              .filter((it) => it.progress === 1)
              .map((it) => (
                <CTFNameList {...it} />
              ))}
          </div>
          <div className="ctf_finished_title">완료된 CTF</div>
          <div className="ctf_finished">
            {listData
              .filter((it) => it.progress === 0)
              .map((it) => (
                <CTFNameList {...it} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTF;
