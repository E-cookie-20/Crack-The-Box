import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profile_image from "../assets/profile_sample.jpg";
import guild_sample from "../assets/guild_sample.png";

const MyPage = () => {
  const navigate = useNavigate();
  const { userId, token } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserInfo(response.data);
      } catch (error) {
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

  const handleGuildButtonClick = () => {
    navigate("/guild");
  };

  return (
    <div className="mypage_container">
      <h1 className="mypage_title">마이페이지</h1>
      <div className="my_account_container">
        <h2 className="my_account_title">내 계정</h2>
        <div className="my_account_edit">편집</div>
      </div>
      <div className="mypage_divide_container">
        <div className="basic_info">
          <div className="basic_info_img_container">
            <img
              className="mypage_profile_img"
              alt="profile_image"
              src={profile_image}
            />
          </div>
          <div className="basic_info_name_container">
            <h2 className="basic_info_name">{userInfo.first_name} {userInfo.last_name}</h2>
            <div className="basic_info_id">
              <h2>{userInfo.user_id}</h2>
            </div>
          </div>
          <div className="email_info_container">
            <h3>{userInfo.user_email}</h3>
          </div>
          <div>
            <div className="guild_info_container">
              <div className="mypage_guild_img_container">
                <img
                  className="mypage_guild_sample_img"
                  alt="guild_sample"
                  src={guild_sample}
                />
              </div>
              <div className="mypage_guild_component">
                <div>
                  {userInfo.guild_id === null ? (
                    "가입한 길드가 없습니다"
                  ) : (
                    <>
                      <div className="mypage_guild_to_go_btn_container">
                        {userInfo.guild_id}
                        <button
                          className="guild_to_bo_btn"
                          onClick={handleGuildButtonClick}
                        >
                          바로가기
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="additional_info">
          <h3>계정 정보</h3>
          <div className="account_info">
            <div className="account_info_component">
              <div>이름</div>
              <div className="account_info_content">{userInfo.first_name}</div>
            </div>
            <div className="account_info_component">
              <div>소속 | 직위</div>
              <div className="account_info_content">
                {userInfo.guild_id} | <>{userInfo.is_staff ? <>길드장</> : <>팀원</>}</>
              </div>
            </div>
            <div className="account_info_component">
              <div>계정(ID)</div>
              <div className="account_info_content">{userInfo.username}</div>
            </div>
            <div className="account_info_component">
              <div>비밀번호</div>
              <div className="account_info_content"></div>
            </div>
          </div>
          <h3>기타 정보</h3>
          <div className="etc_info">
            <div className="account_info_component">
              <div>성별</div>
              <div className="account_info_content">{userInfo.user_gender}</div>
            </div>
            <div className="account_info_component">
              <div>생년월일</div>
              <div className="account_info_content">{userInfo.user_birth} </div>
            </div>
            <div className="account_info_component">
              <div>이메일</div>
              <div className="account_info_content">{userInfo.email}</div>
            </div>
            <div className="account_info_component">
              <div>전화번호</div>
              <div className="account_info_content">{userInfo.user_phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
