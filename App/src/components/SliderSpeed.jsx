import React, { useState } from 'react';
import styles from './SliderSpeed.module.css';

const SpeedSlider = ({speeds}) => {
  const fixedPoints = speeds;
  const [value, setValue] = useState(fixedPoints[0]);
  const [index, setIndex] = useState(0);

  const handleChange = (e) => {
    setIndex(Number(e.target.value));
  };

  return (
    <div className={styles.slider_container}>
       <input
        type="range"
        min="0"
        max={fixedPoints.length - 1}
        step="1"
        value={index}
        onChange={handleChange}
        className={styles.slider}
      />
      <p className={styles.selected_speed}>Selected Speed: &nbsp; <span>X{speeds[index]}</span></p>
    </div>
  );
};

export default SpeedSlider;
