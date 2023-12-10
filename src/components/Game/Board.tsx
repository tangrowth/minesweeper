import React, { useEffect, useState } from "react";
import Cell from "./Cell";

export interface BoardProps {
  cellRows: number;
  cellCols: number;
  bombs: number;
}

const Board: React.FC<BoardProps> = ({ cellRows, cellCols, bombs }) => {
  const [cells, setCells] = useState<
    Array<{
      isOpened: boolean;
      isBomb: boolean;
      isFragged: boolean;
      count: number;
    }>
  >([]);

  useEffect(() => {
    const initialCells = Array.from({ length: cellRows * cellCols }, () => ({
      isOpened: false,
      isBomb: false,
      isFragged: false,
      count: 0,
    }));

    const bombIndices: Set<number> = new Set();
    while (bombIndices.size < bombs) {
      const randomIndex = Math.floor(Math.random() * (cellCols * cellRows));
      bombIndices.add(randomIndex);
    }
    bombIndices.forEach((index) => (initialCells[index].isBomb = true));
    setCells(initialCells);
  }, [cellRows, cellCols, bombs]);

  const toggleCell = (index: number) => {
    setCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[index] = { ...newCells[index], isOpened: true };
      return newCells;
    });
  };

  const renderCells = () => {
    return cells.map((cell, index) => (
      <Cell
        key={index}
        isOpend={cell.isOpened}
        isBomb={cell.isBomb}
        isFragged={cell.isFragged}
        count={cell.count}
        onCellClick={() => toggleCell(index)}
      />
    ));
  };

  return <div className="Board">{renderCells()}</div>;
};

export default Board;
