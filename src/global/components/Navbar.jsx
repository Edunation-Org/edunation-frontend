import s from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../authentication/AuthContext";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import axiosInstance from "../../authentication/AxiosInstance";
import config from "../../configs/config";
import Avatar from "@mui/material/Avatar";

export default function Navbar(props) {
  const { user } = useContext(AuthContext);
  const navRef = useRef(null);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 0) {
        navRef.current.classList.add(s.shadow);
      } else {
        navRef.current.classList.remove(s.shadow);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          `${config.apis.courses.web.base}`,
          {
            meta: { isPublic: true },
          }
        );

        if (response.status === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <nav ref={navRef} className={props.isColored ? s.colored : ""}>
      <div className={s.logoContainer}>
        <Link to="/">
          <h2>Edunation</h2>
        </Link>
      </div>
      <div className={s.buttonsContainer}>
        <div className={s.dropDown}>
          <div className={s.subjectsLink}>
            <p>Subjects</p>
            <span className={s.icon}>
              <ArrowDropDown fontSize="small" />
            </span>
          </div>
          <div className={s.dropDownMenu}>
            {Object.entries(courses).map(([type, subjects]) => (
              <div key={type} className={s.content}>
                <div className={`${s.item} ${s.header} titleFont`}>
                  <p>{type}</p>
                </div>
                {subjects.map((subject) => (
                  <div key={subject._id} className={s.item}>
                    <Link to={`/subject/${subject._id}`}>{subject.title}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button className={s.contactButton}>Contact Us</button>

        {user ? (
          <Link to="/wallet">
            <button className={s.walletButton}>Balance: {user.wallet}$</button>
          </Link>
        ) : (
          <></>
        )}

        {user ? (
          <Link to="/profile/dashboard">
            <Avatar
              src="../images/profile-img.jpg"
              className={s.profileButton}
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </Link>
        ) : (
          <Link to="/login">
            <button className={s.loginButton}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
