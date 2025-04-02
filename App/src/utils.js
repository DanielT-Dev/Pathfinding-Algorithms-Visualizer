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

let start = -1, start_coordinates = [0, 0];
let end = -1, end_coordinates = [15 - 1, 15 - 1];
let start_color = null;
let end_color = null;
let seen_color = null;
let in_stack_color = null
let current_color = null

export const unpack_colors = (colors) => {
  start_color = colors.filter(color => color.label == 'Start')[0].color;
  end_color = colors.filter(color => color.label == 'Finish')[0].color;
  seen_color = colors.filter(color => color.label == 'Seen')[0].color;
  in_stack_color = "rgb(255, 150, 50)";
  current_color = "rgb(100, 200, 100)";
}

export const color_element = (index, color) => {
  const cellRef = document.querySelector(`[data-index='${index}']`);
  if (cellRef) {

    // Make sure start element is uinque
    if(color == start_color && start != -1) {
      const previousCellRef = document.querySelector(`[data-index='${start}']`);
      previousCellRef.style.background = "rgb(240, 240, 240)";
      start = index;
    }

    // Make sure start element is uinque
    if(color == end_color && end != -1) {
      const previousCellRef = document.querySelector(`[data-index='${end}']`);
      previousCellRef.style.background = "rgb(240, 240, 240)";
      end = index;
    }

    cellRef.style.background = color;

    // Keep track of start index
    if (color == start_color) {
      start = index;
      start_coordinates = [parseInt(index / 15), index % 15];
    }
    // Keep track of start index
    if (color == end_color) {
      end = index;
      end_coordinates = [parseInt(index / 15), index % 15];
    }
  }
};

export const buildMatrix = (cellRefs, colors) => {

  const wall_color = colors.filter(color => color.label == 'Wall')[0].color;

  const rows = 15
  const cols = 15
  let matrix = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (cellRefs.current[(i * cols) + j].style.background == wall_color) {
        matrix[i][j] = -1;
      }
      else {
        matrix[i][j] = 0;
      }
    }
  }

  matrix[start_coordinates[0]][start_coordinates[1]] = 1;
  matrix[end_coordinates[0]][end_coordinates[1]] = -2;

  return matrix;
};

let isPaused = false;
let reset_signal = false;

// Pause the algorithm
export const pause_algorithm = () => {
  isPaused = true;
};

// Resume the algorithm
export const resume_algorithm = () => {
  isPaused = false;
};

export const reset_algorithm = (new_signal) => {
  reset_signal = new_signal
}

export async function colorMatrix(changes, selected_speed) {

  console.log("Avem viteza: ", selected_speed)

  reset_signal = false

  // While queue of changes is NOT empty
  while(changes.isEmpty() == false) {

    // Get first element + Remove first element
    let [i, j, state] = changes.dequeue();

    if (reset_signal == true) {
      reset_signal = false
      return;
    }

    while (isPaused) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms to check again
    }

    await new Promise(resolve => setTimeout(resolve, 100 * (1 / selected_speed))); // Wait 1 second before next change

    if (state === "in stack") {
      color_element(i * 15 + j, in_stack_color);
    } else if (state === "current") {
      color_element(i * 15 + j, current_color);
    } else {
      color_element(i * 15 + j, seen_color);
    }
  }
}

export function clearMatrix(cellRefs)
{
  const rows = 15
  const cols = 15

  for (let i = 0; i < rows; i++)
  {
    for (let j = 0; j < cols; j++)
    {
      cellRefs.current[i * cols + j].style.background = "rgb(240, 240, 240)";
    }
  }
}