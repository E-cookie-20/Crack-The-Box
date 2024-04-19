import React, { useState, useEffect } from "react";
import present_logo from "../assets/present_icon.png";
import ctf_ex_img from "../assets/ctf_example_img.png";
import profile_ex_img from "../assets/profile_example_img.png";
import CTFList from "./CTFList";

const Home = () => {
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
    <div className="home_wrapper">
      <span className="home_text">현재 뜨고 있는 워게임 풀기 {">"} </span>
      <div className="wargame_wrapper">
        <div className="box1">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">초보자용 입문 시리즈</span>
            <span className="category_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
            </span>
            <button className="go_button">
              <span>&gt;</span>
            </button>
          </div>
        </div>
        <div className="box2">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">출제빈도 높은 문제 시리즈</span>
            <span className="category_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
            </span>
            <button className="go_button">
              <span>&gt;</span>
            </button>
          </div>
        </div>
        <div className="box3">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">아무도 풀지 못한 챌린지</span>
            <span className="category_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
            </span>
            <button className="go_button_2">
              <span>&gt;</span>
            </button>
          </div>
        </div>
        <div className="box4">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">Rewards & Bonus</span>
            <span className="category_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
            </span>
            <button className="go_button_2">
              <span>&gt;</span>
            </button>
          </div>
        </div>
      </div>
      <div className="home_guild_text_container"></div>
      <span className="home_guild_text">
        길드 내 진행 중인 CTF 참여하기 {">"}{" "}
      </span>
      <div className="ctf_list">
        {listData
          .filter((it) => it.progress === 1)
          .map((it) => (
            <CTFList {...it} />
          ))}
      </div>
    </div>
  );
};

export default Home;
