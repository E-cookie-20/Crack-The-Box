import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate를 import합니다.
import ctf_ex_img from "../assets/ctf_example_img.png";
import profile_ex_img from "../assets/profile_example_img.png";
import CTFNameList from "./CTFNameList";
import CTFDetail from "./CTFDetail";
import GuildPersonalInfo from "./GuildPersonalInfo";
import CTFManageBack from "./CTFManageBack";
import ctf_icon from "../assets/ctf_icon.png";
import create_ctf from "../assets/create_ctf.png";

const CTFAdminMode = () => {
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

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
    // 나머지 데이터 생략
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

  // 이미지를 클릭했을 때 페이지를 이동시키는 함수
  const handleCreateCTFClick = () => {
    navigate("/adminctfcreate"); // 페이지를 이동시킵니다.
  };

  return (
    <div className="ctf_admin_flex_container">
      <div className="ctf_admin_mode_margin_container">
        {selectedItem ? (
          <CTFDetail {...selectedItem} onBack={handleBackClick} />
        ) : (
          <div className="ctf_admin_mode_container">
            <h2>CTF 관리자 모드</h2>
            <div className="admin_mode_component_container">
              <div className="ctf_admin_mode_in_progress_title">
                관리자 모드
              </div>
              {/* 이미지를 클릭했을 때 페이지 이동을 수행하는 함수를 연결합니다. */}
              <div className="create_ctf_btn" onClick={handleCreateCTFClick}>
                <img
                  className="create_ctf_btn_img"
                  src={create_ctf}
                  alt="create_ctf"
                ></img>
              </div>
            </div>
            <div className="ctf_admin_mode_in_progress_container">
              <div className="ctf_admin_mode_in_progress_title">
                현재 진행 중인 CTF
              </div>
              <div className="ctf_admin_mode_in_progress">
                {listData
                  .filter((it) => it.progress === 1)
                  .map((it) => (
                    <div onClick={() => handleItemClick(it)} key={it.id}>
                      <CTFNameList {...it} />
                    </div>
                  ))}
              </div>
              <div className="ctf_admin_mode_finished_title">완료된 CTF</div>
              <div className="ctf_admin_mode_finished">
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
      <div>
        {/* <GuildPersonalInfo />
        <CTFManageBack /> */}
      </div>
    </div>
  );
};

export default CTFAdminMode;
