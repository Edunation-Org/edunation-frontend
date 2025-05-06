import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";

function CustomTimePicker({
  label,
  value,
  day,
  minTime,
  maxTime,
  setNewTime,
  disabled,
}) {
  const minutesStep = 15;

  const generateTimeOptions = () => {
    if (!minTime || !maxTime) return [];

    const times = [];
    let current = minTime.startOf("minute");

    while (current.isBefore(maxTime) || current.isSame(maxTime)) {
      times.push(current);
      current = current.add(minutesStep, "minute");
    }

    return times;
  };

  const handleChange = (event) => {
    const time = event.target.value;
    const dayString = day.format("YYYY-MM-DD");
    const selectedTime = dayjs(`${dayString}T${time}`);
    console.log("🚀 ~ handleChange ~ selectedTime:", selectedTime.format());
    setNewTime(selectedTime);
  };

  return (
    <Box sx={{ zIndex: 999, width: "100%" }}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value ? value.format("HH:mm") : ""}
          label={label}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200, // Set your desired height
              },
            },
          }}
        >
          {generateTimeOptions().map((time) => (
            <MenuItem
              key={time.format("HH:mm")}
              value={time.format("HH:mm")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#87CEEB",
                  color: "#FAFAFA",
                  padding: "1rem",
                },
                "&:hover": {
                  backgroundColor: "#E0F6FF",
                },
              }}
            >
              {time.format("hh:mm A")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CustomTimePicker;
