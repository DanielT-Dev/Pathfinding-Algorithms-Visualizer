import React, { useEffect, useRef, useState } from 'react'

import ColorButton from './ColorButton'

import { useColors } from "../contexts/ColorsContext";
import ColorSelectPopover from './ColorSelectPopover';

const SelectColors = ({ algorithm }) => {

  const [selected_button, set_selected_button] = useState(null);

  const { colors, changeColors } = useColors();

  const [relative_colors, set_relative_colors] = useState(colors);

  const [popover_is_open, set_popover_is_open] = useState(false);

  const popoverRef = useRef(null)

  useEffect(() => {
     changeColors(relative_colors)
  }, [relative_colors])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        set_popover_is_open(false)
      }
    };

    if (popover_is_open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popover_is_open])

  return (
    <div className="select_colors">
      {
          algorithm.colors.map((color, index) => {
            return <div 
                key={index}
                onClick={() => {
                  set_selected_button(index)
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