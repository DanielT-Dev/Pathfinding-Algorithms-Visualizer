import React, { use, useEffect, useRef, useState } from 'react';
import styles from './ColorButton.module.css';

function rgbToHex(rgb) {
  // Extract the r, g, b values from the "rgb(r, g, b)" string
  const [r, g, b] = rgb
    .match(/\d+/g)  // Match all numbers (digits)
    .map(Number);  // Convert them to numbers

  // Ensure each component is between 0 and 255
  const clamp = (value) => Math.min(255, Math.max(0, value));

  // Convert each component to hex and pad with leading zeros if necessary
  const hex = (value) => clamp(value).toString(16).padStart(2, '0');

  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

const hexToRgb = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const ColorButton = ({ label, default_color, onColorChange, index, set_relative_colors, set_popover_is_open}) => {
  const [color, setColor] = useState(rgbToHex(default_color));

  const handleBlur = (e) => {
    setColor(e.target.value);

    const newColor = hexToRgb(e.target.value)

    set_relative_colors(prev => {
      const updatedColors = [...prev];
      updatedColors[index] = {
        "label": updatedColors[index].label,
        "color": newColor,
      };
      return updatedColors;
    });
  }

  useEffect(() => {
  }, [color])

  let buttonClass;

  return (
    <div className={styles.colorButtonWrapper}>
      
      <label className={styles.colorButtonLabel}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input 
        className={`${styles.colorButton} ${buttonClass}`}
        style={{ backgroundColor: color }}
        onBlur={handleBlur}
        type="color" 
        id={`color-picker-${index}`}
        name="color" 
        defaultValue={color}
      />
    </div>
  );
};

export default ColorButton;
