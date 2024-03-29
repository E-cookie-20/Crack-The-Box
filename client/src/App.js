import "./App.css";
import "../src/styles/Home.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CTF from "./pages/CTF";
import Guild from "./pages/Guild";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wargame from "./pages/Wargame";
import Home from "./pages/Home";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader />
        <div id="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ctf" element={<CTF />} />
            <Route path="/guild" element={<Guild />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/wargame" element={<Wargame />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
