<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
=======
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
>>>>>>> ccd515a50a72922bc64ffe601bb5badaf3f15ff1

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
