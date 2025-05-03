import React, { createContext, useState, useContext, useEffect } from 'react';

import { BFS_DTO } from '../data/algorithms';
import { DFS_DTO } from '../data/algorithms';
import { useColors } from './ColorsContext';
import { useSpeeds } from './SpeedsContext';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {

    const { colors } = useColors();
    const { speeds } = useSpeeds();

    const [speed_params, set_speed_params] = useState({
        selected_speed: 0,
        speed_values: speeds,
      })

    const [dfs_task, set_dfs_task] = useState(DFS_DTO(colors, speed_params));
    const [bfs_task, set_bfs_task] = useState(BFS_DTO(colors, speed_params));

    return (
        <TasksContext.Provider value={{dfs_task, set_dfs_task, bfs_task, set_bfs_task}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    return useContext(TasksContext);
}