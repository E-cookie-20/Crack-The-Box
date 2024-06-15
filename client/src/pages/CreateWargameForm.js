import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CTFWriterInfo from "../components/CTFWriterInfo";

const CreateWargameForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      title: formData.title,
      points: formData.points,
      category: formData.category,
      difficulty: formData.difficulty,
      description: formData.description,
      hint: formData.hint,
      flag: formData.flag,
      state: formData.state,
    };

    try {
      // Adjust the fetch URL according to your backend endpoint
      const response = await fetch("http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/wargame/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error("문제 생성에 실패했습니다.");
      }

      const responseData = await response.json();
      console.log(responseData);
      navigate("/wargame");
    } catch (error) {
      console.error("문제 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className="wargame-form-container">
      <h1 className="wargame-form-title">Wargame 문제 출제</h1>
      <div className="wargame_make_big_container">
        <div className="wargame-page-container">
          <form onSubmit={handleSubmit} className="wargame-form">
            <div className="form-group">
              <div className="form_title_group">
                <h3 className="form_group_title">문제 제목</h3>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
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
                  className="form-control"
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
                modules={CreateWargameForm.modules}
                formats={CreateWargameForm.formats}
                className="quill-editor"
                placeholder="문제 내용을 작성해주세요"
              />
            </div>
            <div className="form-group">
              <div className="form_title_group">
                <h3 className="form_group_title">파일 업로드</h3>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control-file"
                />
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
                  className="form-control"
                  placeholder="풀이에 도움이 되는 힌트를 작성해 주세요"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form_title_group">
                <h3 className="form_group_title">플래그</h3>
                <input
                  type="text"
                  name="flag"
                  value={formData.flag}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="문제 플래그를 입력해 주세요"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="wargame_right_container">
          <CTFWriterInfo />
          <div className="create_wargame_caution">
            <h3>워게임 문제 출제 유의사항</h3>
            <div className="create_wargame_caution_txt">
              크랙더박스 유저들이 문제를 푸는 충분한 조건이 제시되었다면 아래
              배포용 버튼을 눌러주세요
            </div>
            <button
              className="create_wargame_submit_1"
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
CreateWargameForm.modules = {
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

CreateWargameForm.formats = [
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

export default CreateWargameForm;
