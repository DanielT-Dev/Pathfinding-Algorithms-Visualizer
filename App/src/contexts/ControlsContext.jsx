import React, { createContext, useState, useContext, useEffect } from 'react';

const ControlsContext = createContext();

export const ControlsProvider = ({ children }) => {

    const [is_running, set_is_running] = useState(false);
    const [algorithm_name, set_algorithm_name] = useState(null)

    return (
        <ControlsContext.Provider value={{is_running, set_is_running, algorithm_name, set_algorithm_name}}>
            {children}
        </ControlsContext.Provider>
    )
}

export const useControls = () => {
    return useContext(ControlsContext);
}