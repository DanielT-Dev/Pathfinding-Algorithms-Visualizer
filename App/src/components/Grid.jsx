import React, { useEffect, useRef, useState } from "react";
import styles from "./Grid.module.css"; // Importing CSS module

import { get_events } from "../../../Visualizer-Algorithms/hold";

import { color_element } from "../utils";

const Grid = () => {
  const rows = 40;
  const cols = 60;
  const [cells] = useState(
    Array.from({ length: rows * cols })
  );

  const cellRefs = useRef([]);
  const isMouseDown = useRef(false);

  const [is_holding, set_is_holding] = useState(false);

  const handleCellClick = (index) => {
    console.log(index);
    color_element(index, "rgb(30, 30, 30)");
  };

  const handleMouseDown = (index) => {
    isMouseDown.current = true;
    console.log("de la handleMouseDown...")
    handleCellClick(index + 1);
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseEnter = (index) => {
    if (isMouseDown.current) {
      handleCellClick(index);
    }
  };

  useEffect(() => {
    get_events(set_is_holding);
  }, [])

  /*
  useEffect(() => {
    handleCellClick()
  }, [is_holding])
  */

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className={styles.grid}>
      {cells.map((_, i) => (
        <>
            <div
            key={i}
            ref={(el) => (cellRefs.current[i] = el)}
            className={styles.cell}
            data-index={i + 1}
            onMouseDown={() => handleMouseDown(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            ></div>
        </>
      ))}
    </div>
  );
};

export default Grid;
