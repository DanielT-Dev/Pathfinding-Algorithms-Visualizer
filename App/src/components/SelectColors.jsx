import React, { useEffect, useRef, useState } from 'react'

import ColorButton from './ColorButton'

import { useColors } from "../contexts/ColorsContext";
import ColorSelectPopover from './ColorSelectPopover';
import { unpack_colors } from '../utils';

const SelectColors = ({ algorithm, set_selected_type, isDisabled, isPaused }) => {

  const [selected_button, set_selected_button] = useState(null);

  const { colors, changeColors } = useColors();

  const [relative_colors, set_relative_colors] = useState(colors);

  const [popover_is_open, set_popover_is_open] = useState(false);

  useEffect(() => {
    changeColors(relative_colors)
    unpack_colors(relative_colors)
  }, [relative_colors])

  return (
    <div className="select_colors"
    style={{
      opacity: (isDisabled || isPaused) ? 0.5 : 1,
      pointerEvents: (isDisabled || isPaused) ? "none" : "auto"
    }}>
      {
        algorithm.colors.map((color, index) => {
          return <div
            key={index}
            onClick={() => {
              set_selected_button(index);
              set_selected_type(index);
            }}
            className={selected_button === index ? 'selected_color_button' : ''}
          >
            <ColorButton
              label={color.label}
              default_color={color.color}
              index={index}
              set_relative_colors={set_relative_colors}
              set_popover_is_open={set_popover_is_open}
            />
          </div>
        })
      }
    </div>
  )
}

export default SelectColors