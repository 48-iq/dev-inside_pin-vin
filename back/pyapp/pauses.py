def calc_pauses(timestamps):
  pauses = []
  for i in range(1, len(timestamps)):
      prev_end = timestamps[i-1]["timestamp"][1] 
      current_start = timestamps[i]["timestamp"][0] 
      pause = current_start - prev_end
      if pause > 0.5:  
          pauses.append(pause)

  if pauses:
    average_pause = sum(pauses) / len(pauses)
    max_pause = max(pauses)
    pause_count = len(pauses)
    return {
      "average_pause": average_pause, 
      "max_pause": max_pause, 
      "pause_count": pause_count
    }
  return {
      "average_pause": 0, 
      "max_pause": 0, 
      "pause_count": 0
    }