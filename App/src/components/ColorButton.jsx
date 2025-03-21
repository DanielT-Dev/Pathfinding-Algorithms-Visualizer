import React, { useState } from 'react';
import styles from './ColorButton.module.css';

const ColorButton = ({ colorType = 'start', defaultColor, onColorChange }) => {
  const [color, setColor] = useState(defaultColor);

  const handleColorChange = () => {
    const newColor = prompt('Enter new color', color);
    if (newColor) {
      setColor(newColor);
      onColorChange(newColor);
    }
  };

  let buttonClass;
  switch (colorType.toLowerCase()) {
    case 'start':
      buttonClass = styles.colorButtonDefault;
      break;
    case 'visited':
      buttonClass = styles.colorButtonVisited;
      break;
    case 'finished':
      buttonClass = styles.colorButtonFinished;
      break;
    default:
      buttonClass = styles.colorButtonDefault;
  }

  return (
    <div className={styles.colorButtonWrapper}>
      <label className={styles.colorButtonLabel}>
        {colorType.charAt(0).toUpperCase() + colorType.slice(1)}
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
