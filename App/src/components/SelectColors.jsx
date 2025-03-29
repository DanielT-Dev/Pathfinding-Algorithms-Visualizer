import React, { useEffect, useState } from 'react'
import ColorButton from './ColorButton'

const SelectColors = ({ algorithm }) => {

  const [selected_button, set_selected_button] = useState(null);

  useEffect(() => {
     
  }, [selected_button])

  return (
    <div className="select_colors">
    {
          algorithm.colors.map((color, index) => {
            return <div 
                key={index}
                onClick={() => {
                  console.log("yes")
                  set_selected_button(index)
                }}
                className={selected_button === index ? 'selected_color_button' : ''}
              >
                <ColorButton
                  label={color.label}
                  default_color={color.color}
                />
            </div>
          })
        }
    </div>
  )
}

export default SelectColors