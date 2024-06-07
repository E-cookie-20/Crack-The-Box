import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CTFWriterInfo from "../components/CTFWriterInfo";

const CreateCTFForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    points: "",
    category: "",
    difficulty: "",
    description: "",
    hint: "",
    flag: "",
    state: false,
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category: category,
    });
  };

  const handleDifficultyChange = (difficulty) => {
    setFormData({
      ...formData,
      difficulty: difficulty,
    });
  };

  const handleStateChange = (value) => {
    setFormData({
      ...formData,
      state: value === "공개" ? true : false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to the DB
    console.log(formData);
    navigate("/adminctfcreatelist"); // 이전 화면으로 돌아가기
  };

  return (
    <div className="ctf-form-container">
      <h1 className="ctf-form-title">CTF 문제 출제</h1>
      <div className="ctf-page-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form_title_group">
              <h3 className="form_group_title">문제 제목</h3>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="문제 제목을 작성해주세요"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form_score_group">
              <h3 className="form_group_title">점수</h3>
              <input
                type="text"
                name="points"
                value={formData.points}
                onChange={handleChange}
                placeholder="배점을 입력해주세요 (최대 500점)"
              />
            </div>
          </div>
          <div className="form-group">
            <h3 className="form_group_title">난이도 (LV)</h3>
            <div className="difficulty-buttons">
              {["상", "중", "하"].map((level) => (
                <button
                  type="button"
                  key={level}
                  className={`difficulty-button ${
                    formData.difficulty === level ? "selected" : ""
                  }`}
                  onClick={() => handleDifficultyChange(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <h3 className="form_group_title">분류/태그</h3>
            <div className="category-buttons">
              {[
                "시스템해킹",
                "리버싱",
                "웹해킹",
                "암호화",
                "포렌식",
                "기타",
              ].map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`category-button ${
                    formData.category === category ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <h3 className="form_group_title">문제 설명</h3>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={CreateCTFForm.modules}
              formats={CreateCTFForm.formats}
              placeholder="문제 내용을 작성해주세요"
            />
          </div>
          <div className="form-group">
            <div className="form_title_group">
              <h3 className="form_group_title">파일 업로드</h3>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="form_title_group">
              <h3 className="form_group_title">풀이 힌트</h3>
              <input
                type="text"
                name="hint"
                value={formData.hint}
                onChange={handleChange}
                placeholder="풀이에 도움이 되는 힌트를 작성해 주세요"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form_title_group">
              <h3 h3 className="form_group_title">
                플래그
              </h3>
              <input
                type="text"
                name="flag"
                value={formData.flag}
                onChange={handleChange}
                placeholder="문제 플래그를 입력해 주세요"
              />
            </div>
          </div>
        </form>
        <div className="create_ctf_other_info_container">
          <CTFWriterInfo />
          <div>
            <div className="status-form-group">
              <h3 className="form_group_title">문제 세부 설정</h3>
              <div className="status-form-txt">
                기존의 CTF를 수정하거나 종료시킬 수 있어요
              </div>
              <div className="status-form-select">
                <div className="status-form-select-txt">문제 상태</div>
                <div className="status-form-select-option">
                  <select
                    value={formData.state ? "공개" : "비공개"}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    <option value="공개">공개</option>
                    <option value="비공개">비공개</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="create_ctf_caution">
            <h3>CTF 문제 출제 유의사항</h3>
            <div className="create_ctf_caution_txt">
              크랙더박스 유저들이 문제를 푸는 충분한 조건이 제시되었다면 아래
              배포용 버튼을 눌러주세요
            </div>
            <button
              className="create_ctf_submit"
              type="submit"
              onClick={handleSubmit}
            >
              제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quill modules and formats for the toolbar
CreateCTFForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

CreateCTFForm.formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "link",
  "image",
  "align",
  "color",
  "background",
];

export default CreateCTFForm;
