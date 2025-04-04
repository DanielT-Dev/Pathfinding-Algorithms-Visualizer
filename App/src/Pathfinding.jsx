import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import './animations.css';
import "./scrollbar.css";

import Grid from './components/Grid';
import Dropdwon from './components/Dropdown';

import { buildMatrix, clearMatrix, pause_algorithm, reset_algorithm, resume_algorithm } from './utils';
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

const Pathfinding = () => {

  const { colors } = useColors();
  const { speeds } = useSpeeds();
  const { is_running, set_is_running, algorithm_name, set_algorithm_name } = useControls();
  const { dfs_task, set_dfs_task, bfs_task, set_bfs_task } = useTasks();
  // Wall element type selected by default
  const [selected_type, set_selected_type] = useState(1);

  const [speed_params, set_speed_params] = useState({
    selected_speed: 0,
    speed_values: speeds,
  })

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

    if (logs.length === 0) {
      const newLogs = ["Started."];
      const newTimestamps = [{ timestamp: new Date(), value: "0.00" }];
      setLogs(newLogs);
      setTimestamps(newTimestamps);
      updateLogsAndTimestamps(newLogs, newTimestamps);

      console.log("[front-end] Algorithm started")

      const matrix = buildMatrix(cellRefs, colors);

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

  const handleReset = async (new_signal) => {
    set_is_running(false);

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
          <Dropdwon set_algorithm_name={set_algorithm_name} disabled={is_running} />
        </div>

        
        <SelectColors algorithm={algorithm} set_selected_type={set_selected_type}/>

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

      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <br />
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <br />
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <br />
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <br />
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <p>Other things about the algorithm.....</p>
      <br />
      <p>Other things about the algorithm.....</p>
    </div>
  </div>
  );
};

export default Pathfinding;
