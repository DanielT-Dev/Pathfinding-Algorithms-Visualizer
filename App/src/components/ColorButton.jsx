import React, { useState } from 'react';
import styles from './ColorButton.module.css';

const ColorButton = ({ label, default_color, onColorChange, index, set_relative_colors }) => {
  const [color, setColor] = useState(default_color);

  const handleColorChange = () => {
    const newColor = prompt('Enter new color', color);
    if (newColor) {
      setColor(newColor);

      set_relative_colors(prev => {
        const updatedColors = [...prev];
        updatedColors[index] = {
          "label": updatedColors[index].label,
          "color": newColor,
        }
        return updatedColors;
      });
    }
  };

  let buttonClass;

  return (
    <div className={styles.colorButtonWrapper}>
      <label className={styles.colorButtonLabel}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <button
        className={`${styles.colorButton} ${buttonClass}`}
        style={{ backgroundColor: color }}
        onClick={handleColorChange}
      ></button>
    </div>
  );
};

export default ColorButton;
