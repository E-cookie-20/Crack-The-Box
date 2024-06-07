import React from "react";
import { useNavigate } from "react-router-dom";
import PhotoUpload from "./PhotoUpload";

const AdminCTFCreate = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 화면으로 돌아가기
  };

  const handleNext = () => {
    navigate("/adminctfcreatelist"); // "/adminctfcreate" 경로로 이동
  };

  return (
    <div>
      <div className="admin_ctf_create_container">
        <h2 className="admin_ctf_create_title">관리자 모드</h2>

        <div className="admin_ctf_create_container_2">
          <h2 className="admin_ctf_create_title_2">신규 CTF 생성</h2>
          <div className="admin_ctf_create_img_input_container">
            <div className="admin_ctf_create_cover_img">
              <h4>CTF 커버 이미지</h4>
              <PhotoUpload />
            </div>
            <div className="admin_ctf_sub_container">
              <div className="admin_ctf_create_info_container">
                <h4>CTF 정보</h4>
                <div className="admin_ctf_create_input_box">
                  <div className="admin_ctf_create_input_container">
                    <div className="admin_ctf_create_input_txt">제목</div>
                    <input
                      className="admin_ctf_create_input"
                      placeholder="입력해주세요"
                    ></input>
                  </div>
                  <div className="admin_ctf_create_input_container">
                    <div className="admin_ctf_create_input_txt">제목</div>
                    <input
                      className="admin_ctf_create_input"
                      placeholder="입력해주세요"
                    ></input>
                  </div>
                  <div className="admin_ctf_create_input_container">
                    <div className="admin_ctf_create_input_txt">제목</div>
                    <input
                      className="admin_ctf_create_input"
                      placeholder="입력해주세요"
                    ></input>
                  </div>
                  <div className="admin_ctf_create_input_container">
                    <div className="admin_ctf_create_input_txt">제목</div>
                    <input
                      className="admin_ctf_create_input"
                      placeholder="입력해주세요"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="admin_ctf_create_des_container">
                <h4>대회 관련 안내사항</h4>
                <input
                  className="admin_ctf_create_des_input"
                  placeholder="해당 CTF에 대한 소개를 작성해주세요"
                ></input>
              </div>
              <div className="admin_ctf_create_btn_container">
                <button
                  className="admin_ctf_create_btn_go_back"
                  onClick={handleGoBack}
                >
                  취소
                </button>
                <button
                  className="admin_ctf_create_btn_next"
                  onClick={handleNext}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCTFCreate;
