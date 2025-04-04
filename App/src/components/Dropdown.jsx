import { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

function Dropdown({ set_algorithm_name, disabled }) {
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
    set_algorithm_name(name);
    setIsOpen(false);
  };

  return (
    <div className={styles.select_algorithm} ref={dropdownRef}>
      <button 
        onClick={() => !disabled && setIsOpen(!isOpen)} 
        disabled={disabled}
      >
        Select Algorithm (Current: <span>{algorithm?.name || 'None'}</span>)
      </button>
      {isOpen && !disabled && (
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
