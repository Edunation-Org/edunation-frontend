import { useContext, useEffect, useRef, useState } from "react";
import s from "../styles/Dashboard.module.css";
import HeaderIllustration from "../images/dashboard-illustration.svg";
import Chart from "chart.js/auto";
import ProfileSidebar from "./Profile-Sidebar.jsx";
import { useOutletContext } from "react-router-dom";
import { hasRole } from "../../../authentication/guards/RoleGuard.jsx";
import axiosInstance from "../../../authentication/AxiosInstance.jsx";
import config from "../../../configs/config.js";
import AuthContext from "../../../authentication/AuthContext.jsx";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard() {
  const { fetchedReservations } = useOutletContext();

  const [isLoading, setIsLoading] = useState(true);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const { user } = useContext(AuthContext);
  const { userProfile } = useOutletContext();

  const isTutor = hasRole(user?.roles || [], ["tutor"]);

  const [reservations, setReservations] = useState({});
  const [editZoomStates, setEditZoomStates] = useState({});

  const [chartLabels, setChartLabels] = useState([]);

  const [courseDurations, setCourseDurations] = useState({});
  const [totalMinutes, setTotalMinutes] = useState(0);

  const toggleZoomEdit = (reservation) => {
    setEditZoomStates((prev) => ({
      ...prev,
      [reservation._id]: {
        isEditing: !prev[reservation._id]?.isEditing,
        zoomUrl: reservation.zoomUrl || "",
      },
    }));
  };

  const handleZoomChange = (e, reservationId) => {
    const newUrl = e.target.value;
    setEditZoomStates((prev) => ({
      ...prev,
      [reservationId]: {
        ...prev[reservationId],
        zoomUrl: newUrl,
      },
    }));
  };

  const handleZoomSave = async (reservation) => {
    const newZoomUrl = editZoomStates[reservation._id]?.zoomUrl;

    try {
      setIsLoading(true);

      const response = await axiosInstance.patch(
        `${
          config.apis.reservations.web.base
        }/${config.apis.reservations.web.endpoints.updateReservation(
          reservation._id
        )}`,
        { zoomUrl: newZoomUrl }
      );

      if (response.status === 200) {
        console.log("Zoom URL updated");
        setEditZoomStates((prev) => ({
          ...prev,
          [reservation._id]: {
            isEditing: false,
            zoomUrl: newZoomUrl,
          },
        }));
        setReservations((prev) => {
          const updatedReservations = { ...prev };
          const reservationIndex =
            updatedReservations.upcomingReservations.findIndex(
              (res) => res._id === reservation._id
            );
          if (reservationIndex !== -1) {
            updatedReservations.upcomingReservations[reservationIndex].zoomUrl =
              newZoomUrl;
          }
          return updatedReservations;
        });
      }
    } catch (err) {
      console.error("Error updating Zoom URL", err);
      alert("Error updating Zoom URL");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedReservations) {
      setReservations(fetchedReservations);
      setIsLoading(false);
    }
  }, [fetchedReservations]);

  useEffect(() => {
    const durations = {};
    let totalMins = 0;

    if (reservations) {
      reservations.pastReservations?.forEach((reservation) => {
        if (
          reservation.course &&
          reservation.startTime &&
          reservation.endTime
        ) {
          const start = new Date(reservation.startTime);
          const end = new Date(reservation.endTime);
          const duration = (end - start) / (1000 * 60); // in minutes
          totalMins += duration;

          if (durations[reservation.course]) {
            durations[reservation.course] += duration;
          } else {
            durations[reservation.course] = duration;
          }
        }
      });
    }

    setCourseDurations(durations);
    setTotalMinutes(totalMins);
    setChartLabels(Object.keys(durations));
  }, [reservations]);

  useEffect(() => {
    if (chartRef.current && chartLabels.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy the previous chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new Chart instance and store it in ref
      chartInstanceRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartLabels.map((label) => courseDurations[label] || 0),
              backgroundColor: [
                "rgb(154, 99, 255)",
                "rgb(54, 162, 235)",
                "rgb(242, 147, 255)",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: "70%",
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartLabels, courseDurations]);

  return (
    <>
      <div className={s.dashboardContainer}>
        <div className={s.dashboardHeader}>
          <div className={s.content}>
            <h2 className="titleFont">
              Hello {userProfile ? userProfile.firstName : "Loading..."}!
            </h2>
            <p className={s.quote}>
              “You’re on the path to success. Whether you're here for a quick boost or long-term support,
               we’re excited to work with you. Your goals are our goals — let’s achieve them together.”
            </p>
          </div>
          <div className={s.imageContainer}>
            <img src={HeaderIllustration} alt="Dashboard Illustration" />
          </div>
        </div>

        <div className={s.dashboardContent}>
          <div className={s.classesContainer}>
            <h3 className="titleFont">Upcoming Classes</h3>
            {reservations?.upcomingReservations?.length > 0 ? (
              reservations.upcomingReservations.map((reservation, index) => {
                const start = new Date(reservation.startTime);
                const end = new Date(reservation.endTime);

                const formattedDate = start.toLocaleDateString("en-GB"); // e.g., 01/06/2025
                const formattedStartTime = start.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const formattedEndTime = end.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={index} className={s.classCardContainer}>
                    <div className={s.upperHalf}>
                      <div className={s.cardContent}>
                        <p className={s.subjectTitle}>{reservation.course}</p>
                        {isTutor ? (
                          <p className={s.tutorName}>
                            <b>Student name:</b> {reservation.fullName}
                          </p>
                        ) : reservation.fullName ? (
                          <p className={s.tutorName}>
                            Tutor name: {reservation.fullName}
                          </p>
                        ) : (
                          <p className={s.tutorName}>
                            A tutor will be assigned soon!
                          </p>
                        )}
                      </div>
                      <div className={s.dateTimeContainer}>
                        <p className={s.date}>{formattedDate}</p>
                        <p className={s.time}>
                          {formattedStartTime} - {formattedEndTime}
                        </p>
                      </div>
                    </div>
                    {isTutor ? (
                      <div className={s.zoomEditContainer}>
                        {editZoomStates[reservation._id]?.isEditing ? (
                          <>
                            <input
                              type="text"
                              className={s.zoomInput}
                              value={
                                editZoomStates[reservation._id]?.zoomUrl || ""
                              }
                              onChange={(e) =>
                                handleZoomChange(e, reservation._id)
                              }
                            />
                            <div className={s.zoomButtonsContainer}>
                              <button
                                id={s.saveZoomButton}
                                className={s.zoomButton}
                                onClick={() => handleZoomSave(reservation)}
                                disabled={
                                  editZoomStates[reservation._id]?.zoomUrl ===
                                  reservation.zoomUrl
                                }
                              >
                                Save
                              </button>
                              <button
                                id={s.cancelZoomButton}
                                className={s.zoomButton}
                                onClick={() => toggleZoomEdit(reservation)}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className={s.zoomUrlText}>
                              {reservation.zoomUrl || "No Zoom URL set"}
                            </p>
                            <div className={s.zoomButtonsContainer}>
                              <button
                                id={s.editZoomButton}
                                className={s.zoomButton}
                                onClick={() => toggleZoomEdit(reservation)}
                              >
                                Edit
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ) : reservation.zoomUrl ? (
                      <div>
                        <small>
                          <a
                            className={s.zoomLink}
                            href={reservation.zoomUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <strong>Join Zoom Meeting</strong>
                          </a>
                        </small>
                      </div>
                    ) : (
                      <div>
                        <small style={{ color: "#BABABA" }}>
                          Check back before the class for the Zoom link!
                        </small>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No upcoming classes.</p>
            )}
          </div>

          <div className={s.timeSpentContainer}>
            <h3 className="titleFont">Time Spent</h3>
            <div className={s.contentContainer}>
              {reservations?.pastReservations?.length > 0 ? (
                <>
                  <h3>Good job, keep going!</h3>
                  <div className={s.chartContainer}>
                    <canvas
                      className={s.timeSpentChart}
                      ref={chartRef}
                    ></canvas>
                    <p className={s.totalTime}>
                      {Math.floor(totalMinutes / 60)} hours
                      <br />
                      {Math.floor(totalMinutes % 60)} mins
                    </p>
                  </div>
                  <div className={s.chartLabels}>
                    {chartLabels.map((label, index) => (
                      <div className={s.label} key={label}>
                        <div
                          className={s.colorBox}
                          style={{
                            backgroundColor: [
                              "rgb(154, 99, 255)",
                              "rgb(54, 162, 235)",
                              "rgb(242, 147, 255)",
                            ][index % 3],
                          }}
                        ></div>
                        <p>
                          {label} - {Math.round(courseDurations[label])} mins
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>No past reservations to display.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProfileSidebar
        fullName={userProfile?.firstName + " " + userProfile?.lastName}
        pastReservations={reservations?.pastReservations}
      />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
