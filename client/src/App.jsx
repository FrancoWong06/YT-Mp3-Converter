import React from "react";
import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";

import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";

function App() {
  return (
      <div className="mainContainer">
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
        </Routes>
      </div>
  );
}

export default App;
