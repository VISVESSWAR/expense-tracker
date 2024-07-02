//import logo from './logo.svg';
import "./App.css";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ViewAll from "./components/viewAll";
import { useState } from "react";
//import "./tailwind.css";
import "./index.css";

function App() {
  const [mode,setMode]=useState("add");
  return (
    <Router>
      <div className="App">
        <Header setMode={setMode}/>
        <ToastContainer />
        <Routes>
          <Route path="/add" element={<Home mode={mode} setMode={setMode}/>} />
          {/* <Route path="/viewAll" element={<ViewAll setMode={setMode}/>} /> */}
          <Route path="/" element={<ViewAll setMode={setMode}/>} />
          <Route path="/edit/:id" element={<Home mode={mode} setMode={setMode}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
