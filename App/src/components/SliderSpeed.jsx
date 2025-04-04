import React, { useState, useEffect } from 'react';
import styles from './SliderSpeed.module.css';
import { unpack_speed } from '../utils';

const SpeedSlider = ({speeds, set_speed_params}) => {
  const fixedPoints = speeds;
  const [value, setValue] = useState(fixedPoints[0]);
<<<<<<< HEAD
  const [index, setIndex] = useState(4);
=======
  const [index, setIndex] = useState(0);
>>>>>>> 5b92189b6b6dfb5539a286843eb2756e88d5bcdd

  const handleChange = (e) => {
    const newIndex = Number(e.target.value);

    setIndex(newIndex);

    unpack_speed(speeds[newIndex])
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
