import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import './animations.css';
import "./scrollbar.css";

import Grid from './components/Grid';
import Dropdwon from './components/Dropdown';

import { buildMatrix, clearMatrix, pause_algorithm, reset_algorithm, resume_algorithm, unpack_algorithm } from './utils';
import { cellRefs } from './components/Grid';

import SliderSpeed from './components/SliderSpeed';

import { get_time_since } from './utils';

import SelectColors from './components/SelectColors';
import { useColors } from './contexts/ColorsContext';
import { useSpeeds } from './contexts/SpeedsContext';
import { useControls } from './contexts/ControlsContext';
import { useTasks } from './contexts/TasksContext';

import { BFS_DTO } from './data/algorithms';
import { DFS_DTO } from './data/algorithms';

import { assign_color } from './Logs';
import { test_build_matrix, test_color_element } from './Tests/test_utils';

const Pathfinding = () => {

  const { colors } = useColors();
  const { speeds } = useSpeeds();
  const { is_running, set_is_running, algorithm_name, set_algorithm_name } = useControls();
  const { dfs_task, set_dfs_task, bfs_task, set_bfs_task } = useTasks();
  // Wall element type selected by default
  const [selected_type, set_selected_type] = useState(1);
  
  // TODO: Delete
  const [speed_params, set_speed_params] = useState({
    selected_speed: 4,
    speed_values: speeds,
  })

  useEffect(() => {
    const run_all_tests = async () => {

      const functions = [test_build_matrix]
      const functions_names = ["test_build_matrix"]
      const async_functions = [test_color_element]
      const async_functions_names = ["test_color_element"]

      for(let i = 0;i < functions.length;i++)
      {
        let current_func = functions[i]

        let errors = current_func()

        console.log("Errors: " + errors.length + ` in ${functions_names[i]}()`)
        for(let i = 0;i < errors.length;i++)
            console.log("Failed because: " + resulted_output)
      }

      for(let i = 0;i < async_functions.length;i++)
        {
          let current_func = async_functions[i]
  
          let errors = await current_func()
  
          console.log("Errors: " + errors.length + ` in ${async_functions_names[i]}()`)
          for(let i = 0;i < errors.length;i++)
              console.log("Failed because: " + resulted_output)
        }

      
    }

    //run_all_tests();
  }, [])

  const [is_paused, set_is_paused] = useState(false);

  const [algorithm, setAlgorithm] = useState(dfs_task);

  const [logs, setLogs] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  const logsRef = useRef(logs);
  const timestampsRef = useRef(timestamps);

  const updateLogsAndTimestamps = (newLogs, newTimestamps) => {
    logsRef.current = newLogs;
    timestampsRef.current = newTimestamps;
  };

  const handleStart = () => {

    set_is_running(true);
    set_is_paused(false);

    if (logs.length === 0) {
      const newLogs = ["Started."];
      const newTimestamps = [{ timestamp: new Date(), value: "0.00" }];
      setLogs(newLogs);
      setTimestamps(newTimestamps);
      updateLogsAndTimestamps(newLogs, newTimestamps);

      console.log("[front-end] Algorithm started")

      const matrix = buildMatrix(cellRefs);

      if (matrix == "ERROR")
      {
          handleReset(false);
          return;
      }

      algorithm.controls.start(matrix)
      console.log("[front-end] Algorithm finished successfully")
    } else {
      const start_time = timestamps[0].timestamp;
      const current_time = new Date();
      const time_diff = get_time_since(start_time, current_time);

      const newLogs = [...logs, "Resumed."];
      const newTimestamps = [
        ...timestamps,
        { timestamp: current_time, value: time_diff },
      ];

      setLogs(newLogs);
      setTimestamps(newTimestamps);
      updateLogsAndTimestamps(newLogs, newTimestamps);

      resume_algorithm();
    }
  };

  const handlePause = () => {
    set_is_running(false);
    set_is_paused(true);

    if (logs.at(-1) == "Paused.")
      return 

    const newLogs = [...logs, "Paused."];
    const start_time = timestamps[0].timestamp;
    const current_time = new Date();
    const time_diff = get_time_since(start_time, current_time);

    const newTimestamps = [
      ...timestamps,
      { timestamp: current_time, value: time_diff },
    ];

    setLogs(newLogs);
    setTimestamps(newTimestamps);
    updateLogsAndTimestamps(newLogs, newTimestamps);

    pause_algorithm();
  }

  useEffect(() => {
    // Acest cod va fi apelat **după ce** starea is_paused a fost actualizată
  }, [is_paused]); // se execută de fiecare dată când is_paused se schimbă

  
  const handleReset = async (new_signal) => {
    set_is_running(false);
    set_is_paused(false);

    reset_algorithm(new_signal)

    if (new_signal == true) {
      await new Promise(resolve => setTimeout(resolve, 100));
      clearMatrix(cellRefs)
    }

    const newLogs = [];
    const newTimestamps = [];

    setLogs(newLogs);
    setTimestamps(newTimestamps);
    updateLogsAndTimestamps(newLogs, newTimestamps);
  }

  const assign_algorithm = (algorithm_name) => {
    if (algorithm_name == 'DFS')
      setAlgorithm(dfs_task)
    if (algorithm_name == 'BFS')
      setAlgorithm(bfs_task)

    if (algorithm_name != null)
      unpack_algorithm(algorithm_name)
  }

  useEffect(() => {
    handleReset(false)
    set_is_running(false)

    assign_algorithm(algorithm_name)
    
  }, [algorithm_name])
  useEffect(() => {
    const updatedDfsTask = DFS_DTO(colors, speed_params);
    const updatedBfsTask = BFS_DTO(colors, speed_params);

    set_dfs_task(updatedDfsTask);
    set_bfs_task(updatedBfsTask);

  }, [colors, speed_params]);
  useEffect(() => {
    if (dfs_task && bfs_task) {
      assign_algorithm(algorithm_name)
    }
  }, [dfs_task, bfs_task]);

  return (
    <div className="main_container">
      <h1 className="title">Pathfinding Algorithms Visualizer</h1>

      <div className="settings">
        <div className="select_algorithm">
          <Dropdwon set_algorithm_name={set_algorithm_name} disabled={is_running || is_paused} />
        </div>

        <SelectColors algorithm={algorithm} set_selected_type={set_selected_type} isDisabled = {is_running} isPaused={is_paused}/>

        <div className="select_speed">
          <SliderSpeed speeds={algorithm.speeds} set_speed_params={set_speed_params}/>
        </div>

        <div className="controls">
          {
            is_running == false &&
            <button onClick={handleStart}>
              <img src="controls1.png" alt="Control 1" />
            </button>
          }
          {
            is_running == true &&
            <button onClick={handlePause}>
            <img src="controls2.png" alt="Control 2" />
          </button>
          }
          <button onClick={() => handleReset(true)}>
            <img src="controls4.png" alt="Control 4" />
          </button>
        </div>
      </div>

      <div className="main">
        <div className="visualizer">
          <Grid selected_type={selected_type}/>
        </div>

        <div className="live_stats">
          <div>
            <h6>Command Logs</h6>
            <div className="logs scrollbar">
            {
              logs.map((log, index) => {
                return (
                  <p 
                  key={index}
                  style={{
                    color: assign_color(log),
                    fontWeight: 600,
                  }}
                >
                [{timestamps[index].value}] - {log}
                </p>
                )}
              )
            }
            </div>
          </div>
          <div>
            <h6>Live Stats</h6>
          </div>
        </div>
      </div>

    <div className="other">
      <br/>
    </div>
  </div>
  );
};

export default Pathfinding;
