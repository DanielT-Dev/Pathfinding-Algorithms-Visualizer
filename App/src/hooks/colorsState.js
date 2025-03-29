// colorsState.js
import { useState } from 'react';

export const useColors = () => {
  const [colors, setColors] = useState([
    "rgb(57, 218, 230)",
    "rgb(30, 30, 30)",
    "rgb(255, 238, 110)",
    "rgb(17, 207, 32)"
  ]);

  return { colors, setColors };
};
