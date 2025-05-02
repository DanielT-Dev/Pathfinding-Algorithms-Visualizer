import React, { useEffect, useRef, useState } from "react";
import styles from "./Grid.module.css"; // Importing CSS module

import { get_events } from "../../../Visualizer-Algorithms/hold";

import { color_element } from "../utils";

import { useColors } from "../contexts/ColorsContext";

export const cellRefs = { current: []}
  
const Grid = ({ selected_type }) => {

  const rows = 15;
  const cols = 15;

  const [cellColors, setCellColors] = useState(Array.from({ length: rows * cols }).fill({label: "", color: "rgb(240, 240, 240"}));  

  const { colors } = useColors();

  const [cells] = useState(
    Array.from({ length: rows * cols })
  );

  const isMouseDown = useRef(false);

  const [is_holding, set_is_holding] = useState(false);

  const handleCellClick = (index, type) => {
    color_element(index, colors[type].color, "0.5s");
  };

  const handleMouseDown = (index) => {
    isMouseDown.current = true;
    console.log("de la handleMouseDown...")
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

  useEffect(() => {
    if (typeof colors === 'undefined') return;

    if (colors) {
      syncColors();
    }

  }, [colors]);

  const syncColors = () => {
    setCellColors(prevColors => {
      return prevColors.map(cell => {
        console.log(cell.label)
        if (!cell.label) return cell; // Skip empty cells
  
        // Find the corresponding new color from the updated colors array
        const newColorEntry = colors.find(c => c.label === cell.label);
        if (!newColorEntry) return cell; // If label not found in updated colors, skip
  
        // If the color is different, update it
        if (cell.color !== newColorEntry.color) {
          return { ...cell, color: newColorEntry.color };
        }
  
        return cell; // No change needed
      });
    });
  };
  

  return (
    <div 
      className={styles.grid} 
    >
      {cellColors.map((color, i) => (
        <>
          <div
            key={i}
            ref={(el) => (cellRefs.current[i] = el)}
            className={styles.cell}
            data-index={i}
            onMouseDown={() => handleMouseDown(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            style={{ backgroundColor: color.color}}
          ></div>
        </>
      ))}
    </div>
  );
};

export default Grid;
