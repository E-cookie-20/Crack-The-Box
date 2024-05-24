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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from 'axios';

// import CTF from "./pages/CTF";
import Guild from "./pages/Guild";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wargame from "./pages/Wargame";
import Home from "./pages/Home";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import WargameDetail from "./pages/WargameDetail";
import FindPassword from "./pages/FindPassword";

function App() {
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader />
        <div id="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/ctf" element={<CTF />} /> */}
            <Route path="/guild" element={<Guild />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/wargame" element={<Wargame />} />
            <Route path="/wargame/:id" element={<WargameDetail />} />
            <Route path="/findpassword" element={<FindPassword />} />
          </Routes>
        </div>
        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
