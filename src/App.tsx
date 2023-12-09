import React from "react";
import Game from "./components/Game/Board";
import Header from "./components/Header/Header";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Game />
    </div>
  );
};

export default App;
