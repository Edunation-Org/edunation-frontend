import s from "../styles/AboutSection.module.css";
import AboutImg from "../images/discover.svg";

export default function AboutSection() {
  return (
    <div className={s.aboutSectionContainer}>
      <div className={s.aboutSectionWrapper}>
        <div className={s.imgContainer}>
          <img src={AboutImg} alt="" />
        </div>
        <div className={s.contentContainer}>
          <div className={s.titleContainer}>
            <h1 className="titleFont">Guiding Potential, Shaping Futures</h1>
          </div>
          <div className={s.descriptionContainer}>
            <p>
              Every student has a unique story. We meet them where they are —
              with empathy, expertise, and culturally responsive teaching that
              helps them grow with confidence.
            </p>
          </div>
          <div className={s.statsGrid}>
            <div className={s.statsContainer}>
              <h2 className="titleFont">300 +</h2>
              <p>Students</p>
            </div>
            <div className={s.statsContainer}>
              <h2 className="titleFont">50 +</h2>
              <p>Tutors</p>
            </div>
          </div>
        </div>
        <div className={s.cardContainer}>
          <h3>
            Our mission at EDUNATIONAL LEARNING ACADEMY is to provide inclusive,
            high-quality tutoring that empowers students of all backgrounds —
            especially those from underserved and underrepresented communities —
            to succeed academically and grow with confidence.
            <br />
          </h3>
          <p>
            We envision a world where every student has equal access to
            educational support, personalized guidance, and the encouragement
            they need to reach their full potential — no matter their starting
            point.
          </p>
        </div>
      </div>
    </div>
  );
}
