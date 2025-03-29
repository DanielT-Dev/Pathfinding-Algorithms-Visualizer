import React, { useEffect, useState } from 'react'

import ColorButton from './ColorButton'

import { useColors } from "../contexts/ColorsContext";

const SelectColors = ({ algorithm }) => {

  const [selected_button, set_selected_button] = useState(null);

  const { colors, changeColors } = useColors();

  const [relative_colors, set_relative_colors] = useState(colors);

  useEffect(() => {
     
  }, [selected_button])

  useEffect(() => {
     changeColors(relative_colors)
  }, [relative_colors])

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
                />
            </div>
          })
        }
    </div>
  )
}

export default SelectColors