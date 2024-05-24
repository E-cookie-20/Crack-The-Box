import { useNavigate } from "react-router-dom";
import profile_image from "../assets/profile_sample.jpg";
import guild_sample from "../assets/guild_sample.png";

const MyPage = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: "cuckoo20",
      last_login: "2024-04-19T11:52:49.149375Z",
      is_superuser: true,
      username: "admin",
      first_name: "아영",
      last_name: "",
      email: "gaeun9566@ewhain.net",
      is_staff: true,
      is_active: true,
      date_joined: "2024-04-19T11:52:30.234401Z",
      guild_id: 1, // 또는 다른 guild_id 값
      user_birth: "2024-04-19",
      user_phone: "010-1234-1234",
      user_gender: "F",
    },
  ];

  // Access the first item in the data array
  const user = data[0];

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
            <h2 className="basic_info_name">{user.username}</h2>
            <div className="basic_info_id">
              <h2>{user.id}</h2>
            </div>
          </div>
          <div className="email_info_container">
            <h3>{user.email}</h3>
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
                  {user.guild_id === null ? (
                    "가입한 길드가 없습니다"
                  ) : (
                    <>
                      <div className="mypage_guild_to_go_btn_container">
                        {user.guild_id}
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
              <div className="account_info_content">{user.first_name}</div>
            </div>
            <div className="account_info_component">
              <div>소속 | 직위</div>
              <div className="account_info_content">
                {user.guild_id} | <>{user.is_staff ? <>길드장</> : <>팀원</>}</>
              </div>
            </div>
            <div className="account_info_component">
              <div>계정(ID)</div>
              <div className="account_info_content">{user.id}</div>
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
              <div className="account_info_content">{user.user_gender}</div>
            </div>
            <div className="account_info_component">
              <div>생년월일</div>
              <div className="account_info_content">{user.user_birth} </div>
            </div>
            <div className="account_info_component">
              <div>이메일</div>
              <div className="account_info_content">{user.email}</div>
            </div>
            <div className="account_info_component">
              <div>전화번호</div>
              <div className="account_info_content">{user.user_phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
