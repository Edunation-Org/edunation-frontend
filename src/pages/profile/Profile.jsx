import s from "./styles/Profile.module.css";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../authentication/AxiosInstance";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import config from "../../configs/config";
import AuthContext from "../../authentication/AuthContext";
import { hasRole } from "../../authentication/guards/RoleGuard";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState(null);

  const isTutor = hasRole(user?.roles || [], ["tutor"]);

  const [fetchedReservations, setFetchedReservations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileRes = await axiosInstance.get(
          config.apis.userProfiles.base
        );
        if (userProfileRes.status === 200) {
          setUserProfile(userProfileRes.data);
        }

        const reservationsRes = await axiosInstance.get(
          `${config.apis.reservations.web.base}?isTutor=${isTutor}`
        );
        if (reservationsRes.status === 200) {
          setFetchedReservations(reservationsRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isTutor]);

  return (
    <div className={s.profileContainer}>
      <Sidebar />
      <Outlet context={{ userProfile, fetchedReservations }} />
    </div>
  );
}
