import React, { useEffect, useRef, useState } from 'react'

import ColorButton from './ColorButton'

import { useColors } from "../contexts/ColorsContext";
import ColorSelectPopover from './ColorSelectPopover';
import { unpack_colors } from '../utils';

<<<<<<< HEAD
const SelectColors = ({ algorithm, set_selected_type, isDisabled, isPaused }) => {
=======
const SelectColors = ({ algorithm, set_selected_type }) => {
>>>>>>> 5b92189b6b6dfb5539a286843eb2756e88d5bcdd

  const [selected_button, set_selected_button] = useState(null);

  const { colors, changeColors } = useColors();

  const [relative_colors, set_relative_colors] = useState(colors);

  const [popover_is_open, set_popover_is_open] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
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
=======
     changeColors(relative_colors)
     unpack_colors(relative_colors)
  }, [relative_colors])

  return (
    <div className="select_colors">
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
>>>>>>> 5b92189b6b6dfb5539a286843eb2756e88d5bcdd
    </div>
  )
}

export default SelectColors