import React from "react";
import "../../styles/App.css";

interface CellProps {
  isOpend: boolean;
  isBomb: boolean;
  isFragged: boolean;
  count: number;
  onCellClick: () => void;
}

const Cell: React.FC<CellProps> = ({
  isOpend,
  isBomb,
  isFragged,
  count,
  onCellClick,
}) => {
  return (
    <div className="Cell" onClick={onCellClick}>
      <span>
        {isOpend && !isBomb && count > 0 && <span>{count}</span>}
        {isOpend && isBomb && <span>💣</span>}
        {!isOpend && isFragged && <span>🚩</span>}
      </span>
    </div>
  );
};

export default Cell;
