import { rows, cols } from "./components/Grid";

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

let algorithm = -1
let start = -1, start_coordinates = [-1, -1];
let end = -1, end_coordinates = [-1, -1];
let start_color = null;
let end_color = null;
let seen_color = null;
let in_stack_color = null
let current_color = null
let wall_color = null
let min_path_color = null;

export const unpack_algorithm = (algo_name) => {
  algorithm = algo_name
}

export const unpack_colors = (colors) => {
  start_color = colors.filter(color => color.label == 'Start')[0].color;
  end_color = colors.filter(color => color.label == 'Finish')[0].color;
  seen_color = colors.filter(color => color.label == 'Seen')[0].color;
  wall_color = colors.filter(color => color.label == 'Wall')[0].color;
  in_stack_color = "rgb(170, 215, 200)";
  current_color = "rgb(100, 100, 255)";
  min_path_color = "rgb(40, 151, 40)";
}

let speed = 1;

export const unpack_speed = (new_speed) => {
  speed = new_speed;
}

function update_telemetry(old_color, new_color) {
  if (old_color == in_stack_color)
    in_processing--;
  if (new_color == in_stack_color)
    in_processing++;
  if (new_color == seen_color)
    visited++;
  if (new_color == min_path_color)
    min_path_length++;
}

export const color_element = async (index, color, animation_duration) => {
  const cellRef = document.querySelector(`[data-index='${index}']`);
  if (cellRef) {

    // Make sure start element is uinque
    if (color == start_color && start != -1) {
      const previousCellRef = document.querySelector(`[data-index='${start}']`);
      previousCellRef.style.animation = "none";
      previousCellRef.style.background = "rgb(240, 240, 240)";
      start = index;
    }

    // Make sure end element is uinque
    if (color == end_color && end != -1) {
      const previousCellRef = document.querySelector(`[data-index='${end}']`);
      previousCellRef.style.animation = "none";
      previousCellRef.style.background = "rgb(240, 240, 240)";
      end = index;
    }

    if (cellRef.style.background != color) {

      // Update current telemetry parameters when the elements changes color (state)
      let old_color = cellRef.style.background
      let new_color = color
      update_telemetry(old_color, new_color)

      cellRef.style.animation = "none"; // Reset animation
      cellRef.offsetHeight; // Trigger reflow (hack to restart animation)

      cellRef.style.setProperty('--cell-color', color);
      cellRef.style.animation = "color_element linear forwards";
      cellRef.style.animationDuration = animation_duration;
      await new Promise(resolve => setTimeout(resolve, animation_duration));

      cellRef.style.background = color;
    }

    // Keep track of start index
    if (color == start_color) {
      start = index;
      start_coordinates = [parseInt(index / rows), index % cols]; // was 15, repalced with rows ?
    }
    // Keep track of start index
    if (color == end_color) {
      end = index;
      end_coordinates = [parseInt(index / rows), index % cols]; // was 15, repalced with rows ?
    }
  }

  return {
    color: cellRef.style.background,
  }
};

export const buildMatrix = (cellRefs) => {

  if (algorithm == -1) {
    alert("No algorithm selected.\n")
    return "ERROR";
  }
  if (start_coordinates[0] == -1 || start_coordinates[1] == -1) {
    alert("Start element is not selected!\n");
    return "ERROR";
  }
  if (end_coordinates[0] == -1 || end_coordinates[1] == -1) {
    alert("End element is not selected!\n");
    return "ERROR";
  }

  let matrix = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (cellRefs.current[(i * cols) + j].style.background == wall_color) {
        matrix[i][j] = -1;
        blocked++;
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

const toRGB = (color) => {
  const temp = document.createElement("div");
  temp.style.color = color;
  document.body.appendChild(temp);
  const rgb = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);
  return rgb;
};


export const recolorMatrix = (cellRefs, new_colors) => {

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = cellRefs.current[(i * cols) + j];
      if (!cell) continue;

      const bg = window.getComputedStyle(cell).backgroundColor;

      if (bg === toRGB(start_color)) {
        cell.style.backgroundColor = new_colors[0].color;
      } else if (bg === toRGB(wall_color)) {
        cell.style.backgroundColor = new_colors[1].color;
      } else if (bg === toRGB(end_color)) {
        cell.style.backgroundColor = new_colors[3].color;
      }
    }
  }

  unpack_colors(new_colors);
};


let isPaused = false;
let reset_signal = false;

// Pause the algorithm
export const pause_algorithm = (set_telemetry) => {
  isPaused = true;
  set_telemetry(get_telemetry());
};

let visited = 0
let in_processing = 0
let min_path_length = 2
let total_checks = 0
let blocked = 0

export const get_telemetry = (signal = "non-final") => {
  let result = {
    visited,
    in_processing,
    min_path_length,
    total_checks,
    blocked,
  };

  // Reset telemetry parameters before sending the result.
  // Reset telemetry
  if (signal == "final") {
    visited = 0
    in_processing = 0
    min_path_length = 2// start & finish
    total_checks = 0
    blocked = 0
  }

  return result;
}
// Resume the algorithm
export const resume_algorithm = (set_telemetry) => {
  isPaused = false;
  set_telemetry(get_telemetry())
};

export const reset_algorithm = (new_signal, set_telemetry) => {
  reset_signal = new_signal
  set_telemetry(get_telemetry("final"))
}

export let is_coloring = false;

export async function colorMatrix(changes) {

  is_coloring = true;
  isPaused = false;
  reset_signal = false
  let coloringJustStarted = true;

  // While queue of changes is NOT empty
  while (changes.isEmpty() == false) {
    // Get first element + Remove first element
    let [i, j, state] = changes.dequeue();

    if (reset_signal == true) {
      reset_signal = false
      return;
    }

    while (isPaused) {
      if (reset_signal == true) {
        reset_signal = false
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms to check again
    }

    let delay_duration = 500 * (1 / speed); // 0.5s is the base animation duration
    let animation_duration = (delay_duration / 1000) + "s";

    if (!coloringJustStarted) {
      await new Promise(resolve => setTimeout(resolve, delay_duration / (10))); // Wait for the last animation to finish before next change
    }
    coloringJustStarted = false;

    if (state === "in stack") {
      await color_element(i * rows + j, in_stack_color, animation_duration);
    } else if (state === "current") {
      await color_element(i * rows + j, current_color, animation_duration);
    } else if (state == "minimum path") {
      await color_element(i * rows + j, min_path_color, animation_duration);
    } else if (state == "start") {
      await color_element(i * rows + j, start_color, animation_duration);
    } else if (state == "end") {
      await color_element(i * rows + j, end_color, animation_duration);
    } else {
      await color_element(i * rows + j, seen_color, animation_duration);
    }
  }
  is_coloring = false;
}

export async function colorRandomMatrix(maze, rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (maze[i][j] == -1) {
        await color_element(i * rows + j, wall_color, "0.5s");
      }
      if (maze[i][j] == -2) {
        await color_element(i * rows + j, start_color, "0.5s");
      }
      if (maze[i][j] == -3) {
        await color_element(i * rows + j, end_color, "0.5s");
      }
    }
  }
}

export function clearMatrix(cellRefs) {
  // Reset start and end (since they are deleted)
  start_coordinates = [-1, -1];
  end_coordinates = [-1, -1];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cellRefs.current[i * cols + j].style.animation = "none";
      cellRefs.current[i * cols + j].style.background = "rgb(240, 240, 240)";
    }
  }
}