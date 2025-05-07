import s from "../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon } from "@heroicons/react/16/solid";

export default function Sidebar() {
  return (
    <div className={s.sidebarContainer}>
      <div className={s.logoContainer}>
        <NavLink to="/">
          <h2>Edunation</h2>
        </NavLink>
      </div>
      <div className={s.sidebarLinks}>
        <NavLink
          to="dashboard"
          className={({ isActive }) => `${isActive ? s.active : ""}`}
        >
          <div className={s.sidebarLink}>
            <HomeIcon className={s.sidebarIcon} />
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
    </div>
  );
}
