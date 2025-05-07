import s from "../styles/Hero.module.css";
import HeroImg from "../images/hero.svg";
import Arrow from "../images/arrow.svg";
import MathIcon from "../images/math-icon.png";

export default function Hero() {
  return (
    <>
      <div className={s.heroContainer}>
        <div className={s.imgContainer}>
          <img src={HeroImg} alt="hero" />
        </div>
        <div className={s.heroContentContainer}>
          <h1 className="titleFont">
            Unlock Your
            <br />
            Potential
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
                <h3 className="titleFont">300+</h3>
                <p>Active Teachers</p>
              </div>
            </div>
            <div className={s.contactContainer}>
              <img src={Arrow} alt="" />
              <button
                className={s.contactButton}
                onClick={() => {
                  const contactSection = document.getElementById("contact-section");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={s.subjectsGraphicsContainer}>
        <div className={s.graphicsContainer}>
          <img src={MathIcon} alt="" />
          <h2 className="titleFont">Math</h2>
        </div>
        <div className={s.graphicsContainer}>
          <img src={MathIcon} alt="" />
          <h2 className="titleFont">Math</h2>
        </div>
        <div className={s.graphicsContainer}>
          <img src={MathIcon} alt="" />
          <h2 className="titleFont">Math</h2>
        </div>
        <div className={s.graphicsContainer}>
          <img src={MathIcon} alt="" />
          <h2 className="titleFont">Math</h2>
        </div>
        <div className={s.graphicsContainer}>
          <img src={MathIcon} alt="" />
          <h2 className="titleFont">Math</h2>
        </div>
        <div className={s.graphicsContainer}>
          <img src={MathIcon} alt="" />
          <h2 className="titleFont">Math</h2>
        </div>
      </div>
    </>
  );
}
