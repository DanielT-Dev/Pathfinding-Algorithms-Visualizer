import React, { forwardRef } from 'react'

import styles from "./ColorSelectPopover.module.css"

const ColorSelectPopover = forwardRef((props, ref) => {
  return (
    <div 
        ref={ref}
        className={styles.container}
    >
        <label for="color-picker">Choose a color:</label>
        
    </div>
  )
})

export default ColorSelectPopover