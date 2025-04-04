export const assign_color = (log) => {
    if (log == 'Started.' || log == 'Resumed.')
      return "rgb(50, 200, 50)";
    if (log == 'Stopped.')
      return "rgb(200, 50, 50)";
    if (log == 'Paused.')
      return "rgb(255, 170, 50)";
  }