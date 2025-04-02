import React, { useState, useEffect } from 'react';
import styles from './SliderSpeed.module.css';

const SpeedSlider = ({speeds, set_speed_params}) => {
  const fixedPoints = speeds;
  const [value, setValue] = useState(fixedPoints[0]);
  const [index, setIndex] = useState(0);

  const handleChange = (e) => {
    setIndex(Number(e.target.value));

    console.log(index, speeds[index])

    set_speed_params(prev => ({...prev, selected_speed: speeds[index]}))
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
