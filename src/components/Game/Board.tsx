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
      /** セルが開かれた状態か判定 */
      isOpened: boolean;

      /** 爆弾か判定 */
      isBomb: boolean;

      /** 旗が立てられているか判定 */
      isFragged: boolean;

      /** 周囲の爆弾の数 */
      count: number;
    }>
  >([]);

  useEffect(() => {
    const initialCells = Array.from({ length: cellRows * cellCols }, () => ({
      isOpened: true,
      isBomb: false,
      isFragged: false,
      count: 0,
    }));

    /** ランダムな数字から爆弾を配置 */
    const bombIndices: Set<number> = new Set();
    while (bombIndices.size < bombs) {
      const randomIndex = Math.floor(Math.random() * (cellCols * cellRows));
      bombIndices.add(randomIndex);
    }
    bombIndices.forEach((index) => (initialCells[index].isBomb = true));

    for (let index = 0; index < cellCols * cellRows; index++) {
      let bombCount = 0;
      // 周囲のセルのインデックスを計算
      const neighbors = [
        index - cellCols - 1,
        index - cellCols,
        index - cellCols + 1,
        index - 1,
        index + 1,
        index + cellCols - 1,
        index + cellCols,
        index + cellCols + 1,
      ];

      // 周囲のセルが存在し、かつ爆弾であればカウントを増やす
      neighbors.forEach((neighbor) => {
        if (
          neighbor >= 0 &&
          neighbor < cellCols * cellRows &&
          initialCells[neighbor].isBomb
        ) {
          bombCount++;
        }
        initialCells[index].count = bombCount;
      });
    }

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
