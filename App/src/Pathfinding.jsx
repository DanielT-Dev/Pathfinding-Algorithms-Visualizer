import React, { useState } from 'react';
import './style.css';

import ColorButton from './components/ColorButton';
import Grid from './components/Grid';

const Pathfinding = () => {
  const [algorithm, setAlgorithm] = useState(null);
  const [startColor, setStartColor] = useState('#ff0000');
  const [visitedColor, setVisitedColor] = useState('#00ff00');
  const [finishedColor, setFinishedColor] = useState('#0000ff');
  const [speed, setSpeed] = useState('x1');
  const [is_running, set_is_running] = useState(false);

  const handleStart = () => {
    set_is_running(true);
  };

  const handleStop = () => {
    set_is_running(false);
  }

  return (
    <div className="main_container">
    <h1 className="title">Pathfinding Algorithms Visualizer</h1>

    <div className="settings">
      <div className="select_algorithm">
        <button onClick={() => setAlgorithm('Dijkstra')}>
          Select Algorithm (Current: {algorithm || 'None'})
        </button>
      </div>

      <div className="select_colors">
        <ColorButton
          label="Start"
          color={startColor}
          onClick={() => handleColorChange(startColor, setStartColor)}
        />
        <ColorButton
          label="Visited"
          color={visitedColor}
          onClick={() => handleColorChange(visitedColor, setVisitedColor)}
        />
        <ColorButton
          label="Finished"
          color={finishedColor}
          onClick={() => handleColorChange(finishedColor, setFinishedColor)}
        />
      </div>

      <div className="select_speed">
        <button onClick={() => setSpeed(speed === 'x1' ? 'x10' : 'x1')}>
          Speed {speed}
        </button>
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
        
        <button>
          <img src="controls2.png" alt="Control 2" />
        </button>
        <button>
          <img src="controls4.png" alt="Control 4" />
        </button>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="visualizer">
        <Grid/>
      </div>

      <div className="live_stats">
        <h6>Live Stats</h6>
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
