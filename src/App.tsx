// App.tsx
import React from "react";
import Header from "./components/Header/Header";
import Board from "./components/Game/Board";

const App: React.FC = () => {
  const boardProps = {
    cellRows: 12,
    cellCols: 18,
    bombs: 40,
  };

  return (
    <div className="App">
      <Header />
      <Board {...boardProps} />
    </div>
  );
};

export default App;
