import s from "../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { HomeIcon, UserIcon } from "@heroicons/react/16/solid";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthContext from "../../../authentication/AuthContext";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);

    const sidebarContainer = document.querySelector(`.${s.sidebarContainer}`);

    if (sidebarContainer) {
      if (!openSidebar) {
        sidebarContainer.style.display = "flex";
      } else {
        sidebarContainer.style.display = "none";
      }
    }
  };

  return (
    <>
      <button className={s.sidebarButton} onClick={() => toggleSidebar()}>
        <MenuIcon fontSize="large" sx={{ color: "#1A1A80" }} />
      </button>
      <div className={s.sidebarContainer}>
        <div className={s.logoContainer}>
          <NavLink to="/">
            <h2>Edunation</h2>
          </NavLink>
        </div>
        <button className={s.sidebarButton} onClick={() => toggleSidebar()}>
          <CloseIcon fontSize="large" sx={{ color: "#1A1A80" }} />
        </button>
        <div className={s.sidebarLinks}>
          <NavLink id={s.homeLink} to="/">
            <div className={s.sidebarLink}>
              <HomeIcon className={s.sidebarIcon} />
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink
            to="dashboard"
            className={({ isActive }) => `${isActive ? s.active : ""}`}
          >
            <div className={s.sidebarLink}>
              <DashboardIcon className={s.sidebarIcon} />
              <p>My Dashboard</p>
            </div>
          </NavLink>
          <NavLink
            to="my-profile"
            className={({ isActive }) => `${isActive ? s.active : ""}`}
          >
            <div className={s.sidebarLink}>
              <UserIcon className={s.sidebarIcon} />
              <p>My Profile</p>
            </div>
          </NavLink>
        </div>
        <div
          id={s.logoutLink}
          className={s.sidebarLink}
          onClick={() => logout()}
        >
          <LogoutIcon className={s.sidebarIcon} />
          <p>Logout</p>
        </div>
      </div>
    </>
  );
}
