import s from "./styles/Subject.module.css";
import Navbar from "../../global/components/Navbar";
import DatePickerSx from "../../global/components/Date-Picker";
import CustomTimePicker from "../../global/components/Custom-Time-Picker";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import axiosInstance from "../../authentication/AxiosInstance";
import config from "../../configs/config";
import { useNavigate, useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "../../authentication/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Subject() {
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(false);

  const [day, setDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  let Navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const setNewDay = (val) => {
    setDay(val);
    setStartTime(null);
    setEndTime(null);
  };

  const setNewStartTime = (val) => {
    setStartTime(val);
    setEndTime(null);
  };

  const getMinTime = () => {
    if (dayjs(day).isSame(dayjs(), "day")) {
      const now = dayjs();
      const roundedMinutes = Math.ceil(now.minute() / 15) * 15;
      return now.minute(roundedMinutes).second(0);
    }
    return dayjs().startOf("day");
  };

  const handleBooking = async () => {
    if (!user) {
      Navigate("/login");
      return;
    }

    if (!day || !startTime || !endTime) {
      handleSnackbar("Please select a day and time for booking.");
      return;
    }

    const bookingData = {
      courseId: id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${config.apis.reservations.web.base}`,
        bookingData
      );

      if (response.status === 201) {
        Navigate("/profile/dashboard");
      } else {
        handleSnackbar(
          `Error booking course: ${response.data.errorDetails.message}`
        );
      }
    } catch (error) {
      handleSnackbar(
        `Error booking course: ${error.response.data.errorDetails.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        console.error("No course ID found");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `${
            config.apis.courses.web.base
          }/${config.apis.courses.web.endpoints.getCourseById(id)}`,
          {
            meta: { isPublic: true },
          }
        );

        if (response.status === 200) {
          setCourse(response.data);
          setLoading(false);
        } else {
          console.error("Error fetching course data:", response.data.details);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Navbar />
      <div className={s.subjectContainer}>
        <div className={s.subjectWrapper}>
          <div className={s.reservationContainer}>
            <div className={s.reservationWrapper}>
              <div className={s.reservationTitle}>
                <h2>Reservation</h2>
              </div>
              <div className={s.inputContainer}>
                <DatePickerSx
                  label={"Day"}
                  value={day}
                  setNewDay={setNewDay}
                ></DatePickerSx>
              </div>
              <div className={s.inputContainer}>
                <CustomTimePicker
                  label={"Start Time"}
                  value={startTime}
                  day={day}
                  minTime={getMinTime()}
                  maxTime={dayjs().hour(22).minute(45)}
                  setNewTime={setNewStartTime}
                  disabled={day ? false : true}
                ></CustomTimePicker>
              </div>
              <div className={s.inputContainer}>
                <CustomTimePicker
                  label={"End Time"}
                  value={endTime}
                  day={day}
                  minTime={startTime ? startTime.add(1, "hour") : null}
                  maxTime={dayjs(day).hour(23).minute(45)}
                  setNewTime={setEndTime}
                  disabled={startTime ? false : true}
                ></CustomTimePicker>
              </div>
              <div className={s.totalContainer}>
                <h2>Total</h2>
                <h1>
                  {startTime && endTime && course
                    ? `$${(
                        (endTime.diff(startTime, "minute") / 60) *
                        course.price
                      ).toFixed(2)}`
                    : "$0.00 "}
                </h1>
              </div>
              <div className={s.btnContainer}>
                <button className={s.btn} onClick={handleBooking}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
          <hr className={s.border} />
          <div className={s.subjectDetailsContainer}>
            <div className={s.subjectDetailsWrapper}>
              <div className={s.subjectTitle}>
                <h1>{course ? course.title : "Subject Title"}</h1>
              </div>
              <div className={s.subjectDescription}>
                <p>
                  {course
                    ? course.description
                    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut erat nec ligula facilisis facilisis."}
                </p>
              </div>
              <div className={s.subjectPrice}>
                <h2>
                  {course ? `Price: $${course.price}` : "Price: $100"}
                  <small>/hr</small>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Subject;
