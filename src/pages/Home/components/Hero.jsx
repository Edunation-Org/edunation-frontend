import s from "../styles/Hero.module.css";
import HeroImg from "../images/hero.svg";
import Arrow from "../images/arrow.svg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className={s.heroContainer}>
        <div className={s.imgContainer}>
          <img src={HeroImg} alt="hero" />
        </div>
        <div className={s.heroContentContainer}>
          <h1 className="titleFont">
            Empowering Every Learner,
            <br />
            Everywhere.
          </h1>
          <div className={s.subContentContainer}>
            <div className={s.subContent}>
              <div className={s.imgRow}>
                <div className={s.imgFiller}></div>
                <div className={s.imgFiller}></div>
                <div className={s.imgFiller}></div>
                <div className={s.imgFiller}></div>
              </div>
              <div className={s.subTextContainer}>
                <h3 className="titleFont">Dedicated to helping students thrive — with special care for underrepresented and underserved communities.</h3>
                <p>50+ Active Teachers</p>
              </div>
            </div>
            <div className={s.contactContainer}>
              <img src={Arrow} alt="" />
              <Link to="/login">
                <button className={s.loginButton}>Start Learning</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
