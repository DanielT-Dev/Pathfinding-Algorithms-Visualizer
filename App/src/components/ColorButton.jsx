import React, { useState } from 'react';
import styles from './ColorButton.module.css';

const ColorButton = ({ label, default_color, onColorChange }) => {
  const [color, setColor] = useState(default_color);

  const handleColorChange = () => {
    const newColor = prompt('Enter new color', color);
    if (newColor) {
      setColor(newColor);
      onColorChange(newColor);
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
