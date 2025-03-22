// Returns next option (with circular rotation)
export const next_option = (list, index) => {
    if (index + 1 < list.length)
        return (list[index + 1], index + 1)
    else 
      return (list[0], 0)
}

// Computes how much time passed between 2 moments in time
export const get_time_since = (start_date, current_date) => {
  // Calculate the time difference in milliseconds
  const time_diff_ms = current_date - start_date;

  // Extract seconds and milliseconds
  const seconds = Math.floor(time_diff_ms / 1000); // Seconds part
  const milliseconds = time_diff_ms % 1000; // Remaining milliseconds

  // Format the result as "seconds:milliseconds"
  const formatted_time = `${seconds}:${milliseconds.toString().padStart(3, '0')}`; // Add padding for milliseconds

  return formatted_time;
};
