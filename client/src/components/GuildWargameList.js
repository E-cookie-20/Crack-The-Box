import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const d = [
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
      guild_admin: true,
    },
  ];

const Wargame = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const user = d[0];

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/guild/${user.guild_id}/wargame-list`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/wargame/${id}`);
  };

  const postsPerPage = 5;

  const filteredData = data.guild_wargame_list ? data.guild_wargame_list.filter((item) => {
    return (
      item.quiz_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (levelFilter === "all" || item.quiz_level === levelFilter) &&
      (typeFilter === "all" || item.quiz_type === typeFilter)
    );
  }) : [];
  

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
                onClick={() => setLevelFilter("high")}
              >
                상
              </button>
              <button
                className={levelFilter === "중" ? "active" : ""}
                onClick={() => setLevelFilter("intermediate")}
              >
                중
              </button>
              <button
                className={levelFilter === "하" ? "active" : ""}
                onClick={() => setLevelFilter("beginner")}
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
                onClick={() => setTypeFilter("system")}
              >
                시스템해킹
              </button>
              <button
                className={typeFilter === "리버싱" ? "active" : ""}
                onClick={() => setTypeFilter("reversing")}
              >
                리버싱
              </button>
              <button
                className={typeFilter === "웹해킹" ? "active" : ""}
                onClick={() => setTypeFilter("web")}
              >
                웹해킹
              </button>
              <button
                className={typeFilter === "암호화" ? "active" : ""}
                onClick={() => setTypeFilter("crypto")}
              >
                암호화
              </button>
              <button
                className={typeFilter === "포렌식" ? "active" : ""}
                onClick={() => setTypeFilter("forensic")}
              >
                포렌식
              </button>
              <button
                className={typeFilter === "기타" ? "active" : ""}
                onClick={() => setTypeFilter("misc")}
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
