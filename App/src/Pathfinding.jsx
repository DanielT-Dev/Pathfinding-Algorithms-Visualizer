import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import './animations.css';
import "./scrollbar.css";

import Grid, { cols, rows } from './components/Grid';
import Dropdwon from './components/Dropdown';

import { buildMatrix, clearMatrix, get_telemetry, is_coloring, pause_algorithm, reset_algorithm, resume_algorithm, unpack_algorithm } from './utils';
import { cellRefs } from './components/Grid';

import { handleRandomButton } from './randomMaze';

import SliderSpeed from './components/SliderSpeed';

import { get_time_since } from './utils';
import { colorRandomMatrix } from './utils';

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
  const [telemetry, set_telemetry] = useState({});
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

  const [algorithm, setAlgorithm] = useState(bfs_task);

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

      // Default algorithm == DFS
      if (!algorithm_name)
      {
        assign_algorithm('BFS');
      }

      console.log("[front-end] Algorithm started")

      function cron_update(){
        set_telemetry(get_telemetry());
      }
      function cron_update_stopper(){
        if (is_coloring == false) {
          clearInterval(intervalId);
          //console.log("Interval cleared");
        }
      }

      // Start cronometrical updates
      const intervalId = setInterval(cron_update, 700);
      setInterval(cron_update_stopper, 300);

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

      resume_algorithm(set_telemetry);
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

    pause_algorithm(set_telemetry);
  }

  useEffect(() => {
    // Acest cod va fi apelat **după ce** starea is_paused a fost actualizată
  }, [is_paused]); // se execută de fiecare dată când is_paused se schimbă

  
  const handleReset = async (new_signal) => {
    set_is_running(false);
    set_is_paused(false);

    reset_algorithm(new_signal, set_telemetry)

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
    const updatedDfsTask = DFS_DTO(colors, speed_params, set_telemetry);
    const updatedBfsTask = BFS_DTO(colors, speed_params, set_telemetry);

    set_dfs_task(updatedDfsTask);
    set_bfs_task(updatedBfsTask);

  }, [colors, speed_params]);
  useEffect(() => {
    if (dfs_task && bfs_task) {
      assign_algorithm(algorithm_name)
    }
  }, [dfs_task, bfs_task]);
  useEffect(() => {
  }, [telemetry])

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
          
          <div class="tooltip-container">
            <button onClick={() => colorRandomMatrix(handleRandomButton(rows, cols), rows, cols)} disabled={is_running || is_paused}>
              <img style={{scale: 1.8}} src="controls0.png" alt="Control 1" />
            </button>
            <div class="tooltip-text">Generate random grid</div>
          </div>

          {
            is_running == false &&
            <div class="tooltip-container">
              <button onClick={handleStart}>
                <img src="controls1.png" alt="Control 1" />
              </button>
              <div class="tooltip-text">Start algorithm</div>
            </div>
          }
          {
            is_running == true &&
            <div class="tooltip-container">
              <button onClick={handlePause}>
                <img src="controls2.png" alt="Control 2" />
              </button>
              <div class="tooltip-text">Pause algorithm</div>
            </div>
          }
          <div class="tooltip-container">
            <button onClick={() => handleReset(true)}>
              <img src="controls4.png" alt="Control 4" />
            </button>
            <div class="tooltip-text">Reset algorithm</div>
          </div>
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
              logs.length == 0 && 
              <div style={{
                display: "flex", 
                flexDirection: "row",
              }}>
                <img src="/info2.png" alt="info"/>
                <p style={{width: "70%",}}>Select and run an algorithm to view logs and stats.</p>
              </div>
              
            }
            {
              logs.length != 0 && 
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
            <div className="logs scrollbar">
              <p>
                Visited: {telemetry.visited ? telemetry.visited : 0}
              </p>
              <p>
                In-Processing: {telemetry.in_processing ? telemetry.in_processing : 0}
              </p>
              <p>
                Unvisited: {telemetry.visited ? rows * cols -  telemetry.visited - telemetry.blocked: 0}
              </p>
              <p>
                Blocked: {telemetry.blocked ? telemetry.blocked: 0}
              </p>
              <p>
                Exploration Density: {telemetry.visited ? ((telemetry.visited / (rows * cols)) * 100).toFixed(2) + '%'
 : 0 + '%'}
              </p>
              <p>
                 Minimum Path: {(telemetry.min_path_length > 2) ? telemetry.min_path_length : 0}
              </p>
            </div>
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
