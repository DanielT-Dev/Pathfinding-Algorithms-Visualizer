import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the colors state
const ColorsContext = createContext();

// ColorsProvider component to provide the colors state and update function
export const ColorsProvider = ({ children }) => {
    const [colors, setColors] = useState([
        { label: "Start", color: "rgb(57, 218, 230)" },
        { label: "Wall", color: "rgb(30, 30, 30)" },
        { label: "Seen", color: "rgb(255, 238, 110)" },
        { label: "Finish", color: "rgb(17, 207, 32)" },
    ]);

    const changeColors = (newColors) => {
        setColors(newColors);
    };

    useEffect(() => {
      console.log("Change in context detected: ")
      colors.map(color => {console.log(color.label + " " + color.color)});
    }, [colors])

    return (
        <ColorsContext.Provider value={{ colors, changeColors }}>
            {children}
        </ColorsContext.Provider>
    );
};

// Custom hook to access colors and changeColors function
export const useColors = () => {
    return useContext(ColorsContext);
};
