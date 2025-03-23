import { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [algorithm, setAlgorithm] = useState(null);
  const dropdownRef = useRef(null);  // Ref for the dropdown container

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAlgorithmChange = (name) => {
    setAlgorithm({ name });
    setIsOpen(false);
  };

  return (
    <div className={styles.select_algorithm} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Select Algorithm (Current: <span>{algorithm?.name || 'None'}</span>)
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button onClick={() => handleAlgorithmChange('DFS')}>DFS</button>
          <button onClick={() => handleAlgorithmChange('BFS')}>BFS</button>
          <button onClick={() => handleAlgorithmChange('Dijkstra')}>Dijkstra</button>
          <button onClick={() => handleAlgorithmChange('A*')}>A*</button>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
