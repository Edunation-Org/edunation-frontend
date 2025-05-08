import { useContext } from "react";
import AuthContext from "../../../authentication/AuthContext";
import s from "../styles/Profile-Sidebar.module.css";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfileSidebar({ fullName, pastReservations }) {
  let { logout } = useContext(AuthContext);

  return (
    <div className={s.profileSidebarContainer}>
      <button className={s.logoutButton} onClick={logout}>
        <h3>Logout</h3>
        <LogoutIcon className={s.icon} />
      </button>
      <div className={s.profileDetails}>
        <div className={s.imgContainer}></div>
        <div className={s.content}>
          <h2>{fullName}</h2>
        </div>
      </div>
      <div className={s.prevClassesContainer}>
        <h3 className="titleFont">Previous Classes</h3>
        {pastReservations?.length > 0 ? (
          pastReservations.map((reservation, index) => {
            const start = new Date(reservation.startTime);
            const formattedDate = start.toLocaleDateString("en-GB"); // e.g., 01/06/2025

            return (
              <div key={index} className={s.classCardContainer}>
                <div className={s.cardContent}>
                  <p className={s.subjectTitle}>{reservation.course}</p>
                  <p className={s.date}>{formattedDate}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No previous classes scheduled.</p>
        )}
      </div>
    </div>
  );
}
