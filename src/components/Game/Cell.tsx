import React from "react";

interface CellProps {
  isOpend: boolean;
  isBomb: boolean;
  isFragged: boolean;
  count: number;
}

const Cell: React.FC<CellProps> = ({ isOpend, isBomb, isFragged, count }) => {
  return (
    <div className="Cell">
      <span>
        {isOpend && !isBomb && count > 0 && <span>{count}</span>}
        {isOpend && isBomb && <span>💣</span>}
        {!isOpend && isFragged && <span>🚩</span>}
      </span>
    </div>
  );
};

export default Cell;
