import React, { useEffect, useRef, useState } from "react";
import styles from "./Grid.module.css"; // Importing CSS module

import { get_events } from "../../../Visualizer-Algorithms/hold";

import { color_element } from "../utils";

import { useColors } from "../contexts/ColorsContext";

export const cellRefs = { current: []}
  
const Grid = ({ selected_type }) => {

  const { colors } = useColors();

  const rows = 15;
  const cols = 15;
  const [cells] = useState(
    Array.from({ length: rows * cols })
  );

  const isMouseDown = useRef(false);

  const [is_holding, set_is_holding] = useState(false);

  const handleCellClick = (index, type) => {
<<<<<<< HEAD
    color_element(index, colors[type].color, "0.5s");
=======
    color_element(index, colors[type].color);
>>>>>>> 5b92189b6b6dfb5539a286843eb2756e88d5bcdd
  };

  const handleMouseDown = (index) => {
    isMouseDown.current = true;
<<<<<<< HEAD
=======
    console.log("de la handleMouseDown...")
>>>>>>> 5b92189b6b6dfb5539a286843eb2756e88d5bcdd
    handleCellClick(index, selected_type);
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseEnter = (index) => {
    if (isMouseDown.current) {
      handleCellClick(index, selected_type);
    }
  };

  useEffect(() => {
    get_events(set_is_holding);
  }, [])

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
            data-index={i}
            onMouseDown={() => handleMouseDown(i)}
            onMouseEnter={() => handleMouseEnter(i)}
          ></div>
        </>
      ))}
    </div>
  );
};

export default Grid;
