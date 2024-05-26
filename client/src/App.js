import "./App.css";
import "../src/styles/Home.css";
import "../src/styles/Wargame.css";
import "../src/styles/WargameDetail.css";
import "../src/styles/Login.css";
import "../src/styles/Signup.css";
import "../src/styles/WargameDetailList.css";
import "../src/styles/Guild.css";
import "../src/styles/CTF.css";
import "../src/styles/CTFNameList.css";
import "../src/styles/CTFDetail.css";
import "../src/styles/CTFProblem.css";
import "../src/styles/CTFProblemList.css";
import "../src/styles/CTFProblemPopup.css";
import "../src/styles/MyPage.css";
import "../src/styles/GuildManage.css";
import "../src/styles/GuildMember.css";
import "../src/styles/LeaderBoard.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from 'axios';

import Guild from "./pages/Guild";
import GuildDetail from "./pages/GuildDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wargame from "./pages/Wargame";
import Home from "./pages/Home";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import WargameDetail from "./pages/WargameDetail";
import FindPassword from "./pages/FindPassword";
import MyPage from "./pages/MyPage";

import { AuthProvider } from './contexts/AuthContext'; // AuthProvider import

function App() {
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider> {/* AuthProvider로 전체 앱을 감싸줍니다. */}
        <div className="App">
          <MyHeader />
          <div id="wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/guild" element={<Guild />} />
              <Route path="/guild/:id" element={<GuildDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/wargame" element={<Wargame />} />
              <Route path="/wargame/:id" element={<WargameDetail />} />
              <Route path="/findpassword" element={<FindPassword />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </div>
          <MyFooter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
