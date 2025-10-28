import s from "../styles/Hero.module.css";
import HeroImg from "../images/hero.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../authentication/AuthContext";

export default function Hero() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={s.heroContainer}>
        <div className={s.imgContainer}>
          <img src={HeroImg} alt="hero" />
        </div>
        <div className={s.heroContentContainer}>
          <h1 className="titleFont">
            Empowering Every
            <br />
            Learner, Everywhere.
          </h1>
          <div className={s.subContent}>
            <h3 className="titleFont">
              Helping students thrive through engaging, high-quality 
              education tailored to their needs
            </h3>
            <p>50+ Active Teachers</p>

            {user ? (
              <Link to="/profile/dashboard">
                <button className={s.heroBtn}>Start Learning</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className={s.heroBtn}>Start Learning</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
