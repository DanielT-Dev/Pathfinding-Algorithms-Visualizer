import React, { useState } from "react";
import styles from "./Grid.module.css"; // Importing CSS module

const Grid = () => {
  const rows = 20;
  const cols = 30;
  const [cells] = useState(
    Array.from({ length: rows * cols })
  );

  const handleCellClick = (index) => {
    alert(`Cell ${index} clicked`);
  };

  return (
    <div className={styles.grid}>
      {cells.map((_, i) => (
        <>
            <div
            key={i}
            className={styles.cell}
            data-index={i + 1}
            onClick={() => handleCellClick(i + 1)}
            ></div>
        </>
      ))}
    </div>
  );
};

export default Grid;
