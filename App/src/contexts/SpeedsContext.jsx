import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the speeds state
const SpeedsContext = createContext();

// SpeedProvider component to provide the speeds state and update function
export const SpeedsProvider = ({ children }) => {
    
<<<<<<< HEAD
    const [speeds, set_speeds] = useState([0.1, 0.25, 0.5, 0.75, 1, 2, 3, 5, 10]);
=======
    const [speeds, set_speeds] = useState([0.1, 0.25, 0.5, 0.75, 1, 2, 3, 5, 10, 30, 50]);
>>>>>>> 5b92189b6b6dfb5539a286843eb2756e88d5bcdd

    const changeSpeed = (newSpeed) => {
        set_speeds(newSpeed);
    };

    useEffect(() => {
<<<<<<< HEAD
=======
      //speeds.map(speed => {console.log(speed.label + " " + speed.speed)});
>>>>>>> 5b92189b6b6dfb5539a286843eb2756e88d5bcdd
    }, [speeds])

    return (
        <SpeedsContext.Provider value={{ speeds, changeSpeed }}>
            {children}
        </SpeedsContext.Provider>
    );
};

// Custom hook to access speeds and changeSpeed function
export const useSpeeds = () => {
    return useContext(SpeedsContext);
};
