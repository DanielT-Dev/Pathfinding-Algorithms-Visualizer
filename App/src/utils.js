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
