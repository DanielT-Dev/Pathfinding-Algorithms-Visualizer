// Returns next option (with circular rotation)
export const next_option = (list, index) => {
  if (index + 1 < list.length)
    return (list[index + 1], index + 1)
  else
    return (list[0], 0)
}

export const get_time_since = (start_date, current_date) => {
  // Calculate the time difference in milliseconds
  const time_diff_ms = current_date - start_date;

  // Calculate time in seconds with 2 decimal places
  const time_in_seconds = (time_diff_ms / 1000).toFixed(2);

  return time_in_seconds;
};

export const color_element = (index, color) => {
  const cellRef = document.querySelector(`[data-index='${index}']`);
  if (cellRef) {
    cellRef.style.background = color;
  }
};

export const buildMatrix = (cellRefs) => {
  const rows = 40
  const cols = 60
  let matrix = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (cellRefs.current[(i * cols) + j].style.background == "rgb(30, 30, 30)") {
        matrix[i][j] = -1;
      }
    }
  }

  matrix[0][0] = 1;
  matrix[rows - 1][cols - 1] = -2;

  return matrix;
};

let isPaused = false;

// Pause the algorithm
export const pause_algorithm = () => {
  isPaused = true;
};

// Resume the algorithm
export const resume_algorithm = () => {
  isPaused = false;
};

export async function colorMatrix(changes) {

  // While queue of changes is NOT empty
  while(changes.isEmpty() == false) {

    // Get first element + Remove first element
    let [i, j, state] = changes.dequeue();

    while (isPaused) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms to check again
    }

    await new Promise(resolve => setTimeout(resolve, 10)); // Wait 1 second before next change

    if (state === "in stack") {
      color_element(i * 60 + j, 'yellow');
    } else if (state === "current") {
      color_element(i * 60 + j, 'red');
    } else {
      color_element(i * 60 + j, 'green');
    }
  }
}
