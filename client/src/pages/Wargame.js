import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const data = [
  { id: 1, quiz_title: "문제 1", quiz_level: "상", quiz_type: "시스템해킹" },
  { id: 2, quiz_title: "문제 2", quiz_level: "중", quiz_type: "웹해킹" },
  { id: 3, quiz_title: "문제 3", quiz_level: "하", quiz_type: "리버싱" },
  { id: 4, quiz_title: "문제 4", quiz_level: "상", quiz_type: "암호화" },
  { id: 5, quiz_title: "문제 5", quiz_level: "중", quiz_type: "포렌식" },
  { id: 6, quiz_title: "문제 6", quiz_level: "하", quiz_type: "기타" },
  { id: 7, quiz_title: "문제 7", quiz_level: "상", quiz_type: "시스템해킹" },
  { id: 8, quiz_title: "문제 8", quiz_level: "중", quiz_type: "웹해킹" },
  { id: 9, quiz_title: "문제 9", quiz_level: "하", quiz_type: "리버싱" },
  { id: 10, quiz_title: "문제 10", quiz_level: "상", quiz_type: "암호화" },
];

const Wargame = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/wargame/${id}`);
  };

  const postsPerPage = 5;

  const filteredData = data.filter((item) => {
    return (
      item.quiz_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (levelFilter === "all" || item.quiz_level === levelFilter) &&
      (typeFilter === "all" || item.quiz_type === typeFilter)
    );
  });

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="wargame_page_wrapper">
      <span className="wargame_title">워게임</span>
      <div className="wargame_page_container">
        <div className="wargame-container">
          <div className="search-container">
            <input
              className="wargame_search_input"
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="probelm-area-container">
            <div className="filter-container-level">
              <p className="level-text">난이도(Lv)</p>
              <button
                className={levelFilter === "all" ? "active" : ""}
                onClick={() => setLevelFilter("all")}
              >
                all
              </button>
              <button
                className={levelFilter === "상" ? "active" : ""}
                onClick={() => setLevelFilter("상")}
              >
                상
              </button>
              <button
                className={levelFilter === "중" ? "active" : ""}
                onClick={() => setLevelFilter("중")}
              >
                중
              </button>
              <button
                className={levelFilter === "하" ? "active" : ""}
                onClick={() => setLevelFilter("하")}
              >
                하
              </button>
            </div>

            <div className="filter-container-category">
              <p className="category-text">분류</p>
              <button
                className={typeFilter === "all" ? "active" : ""}
                onClick={() => setTypeFilter("all")}
              >
                all
              </button>
              <button
                className={typeFilter === "시스템해킹" ? "active" : ""}
                onClick={() => setTypeFilter("시스템해킹")}
              >
                시스템해킹
              </button>
              <button
                className={typeFilter === "리버싱" ? "active" : ""}
                onClick={() => setTypeFilter("리버싱")}
              >
                리버싱
              </button>
              <button
                className={typeFilter === "웹해킹" ? "active" : ""}
                onClick={() => setTypeFilter("웹해킹")}
              >
                웹해킹
              </button>
              <button
                className={typeFilter === "암호화" ? "active" : ""}
                onClick={() => setTypeFilter("암호화")}
              >
                암호화
              </button>
              <button
                className={typeFilter === "포렌식" ? "active" : ""}
                onClick={() => setTypeFilter("포렌식")}
              >
                포렌식
              </button>
              <button
                className={typeFilter === "기타" ? "active" : ""}
                onClick={() => setTypeFilter("기타")}
              >
                기타
              </button>
            </div>

            <div className="separator"></div>

            <div className="category-container">
              <p>문제 정보</p>
              <p>난이도</p>
              <p>분야</p>
            </div>

            <div className="board-container">
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  className="post"
                  onClick={() => handleClick(post.id)}
                >
                  <p>{post.quiz_title}</p>
                  <p>난이도: {post.quiz_level}</p>
                  <p>유형: {post.quiz_type}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pagination-container">
            {Array.from({
              length: Math.ceil(filteredData.length / postsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handleChangePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="wargame-make-container">
          <div className="wargame-make-title">워게임 문제 출제하기</div>
          <div className="wargame-make-txt">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus{" "}
          </div>
          <button className="wargame-make-button">이동하기</button>
        </div>
      </div>
    </div>
  );
};

export default Wargame;
