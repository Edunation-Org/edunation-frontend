import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DatePickerSx({ label, value, setNewDay }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={value}
          onChange={(val) => setNewDay(val)}
          minDate={dayjs().startOf("day")}
          slotProps={{
            textField: {
              sx: { width: "100%" },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
