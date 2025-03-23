import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import "./scrollbar.css";

import ColorButton from './components/ColorButton';
import Grid from './components/Grid';
import Dropdwon from './components/Dropdown';

import { Lee } from './data/Lee';
import SliderSpeed from './components/SliderSpeed';

import { get_time_since } from './utils';

const Pathfinding = () => {

  const [algorithm, setAlgorithm] = useState(Lee);
  const [is_running, set_is_running] = useState(false);

  const [logs, setLogs] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  // Create useRef to keep track of the logs and timestamps
  const logsRef = useRef(logs);
  const timestampsRef = useRef(timestamps);

  // Update logsRef and timestampsRef directly
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
    }
  };

  const handleStop = () => {
    set_is_running(false);

    const newLogs = [...logs, "Stopped."];
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
  }

  const handlePause = () => {
    set_is_running(false);

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
  }

  const handleReset = () => {
    set_is_running(false);

    const newLogs = [];
    const newTimestamps = [];

    setLogs(newLogs);
    setTimestamps(newTimestamps);
    updateLogsAndTimestamps(newLogs, newTimestamps);
  }

  const assign_color = (log) => {
    if (log == 'Started.' || log == 'Resumed.')
      return "rgb(50, 200, 50)";
    if (log == 'Stopped.')
      return "rgb(200, 50, 50)";
    if (log == 'Paused.')
      return "rgb(255, 170, 50)";
  }

  useEffect(() => {
    console.log('Logs changed:', logs);
  }, [logs]);
   
  useEffect(() => {
    console.log('Timestamps changed:', timestamps);
  }, [timestamps]);
  

  return (
    <div className="main_container">
    <h1 className="title">Pathfinding Algorithms Visualizer</h1>

    <div className="settings">
      <div className="select_algorithm">
        <Dropdwon/>
      </div>

      <div className="select_colors">
        {
          algorithm.colors.map((color, index) => {
            return <ColorButton
              key={index}
              label={color.label}
              default_color={color.color}
              onClick={() => handleColorChange(startColor, setStartColor)}
            />
          })
        }
      </div>

      <div className="select_speed">
        <SliderSpeed speeds={algorithm.speeds}/>
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
          <button onClick={handleStop}>
            <img src="controls3.png" alt="Control 3" />
          </button>
        }
        
        <button onClick={handlePause}>
          <img src="controls2.png" alt="Control 2" />
        </button>
        <button onClick={handleReset}>
          <img src="controls4.png" alt="Control 4" />
        </button>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="visualizer">
        <Grid/>
      </div>

      <div className="live_stats">
        <div>
          <h6>Command Logs</h6>
          <div className="logs scrollbar">
          {
            logs.map((log, index) => {
              const color = assign_color(log);
              console.log(color)
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
