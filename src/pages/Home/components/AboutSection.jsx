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
            <h1 className="titleFont">Discover Your Path to Excellence</h1>
          </div>
          <div className={s.descriptionContainer}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              doloribus ducimus, minima numquam provident ex commodi nostrum
              repellendus ea? Tempore fuga aperiam pariatur corrupti quas
              voluptates tempora necessitatibus et quae.
            </p>
          </div>
        </div>
        <div className={s.overlappingSection}>
          <div className={s.cardContainer}>
            <h3 className="titleFont">
              A Place For Bright
              <br />
              Minds
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              doloremque. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, doloremque.
            </p>
          </div>
          <div className={s.statsGrid}>
            <div className={s.statsContainer}>
              <h2 className="titleFont">300 +</h2>
              <p>Students</p>
            </div>
            <div className={s.statsContainer}>
              <h2 className="titleFont">300 +</h2>
              <p>Students</p>
            </div>
            <div className={s.statsContainer}>
              <h2 className="titleFont">300 +</h2>
              <p>Students</p>
            </div>
            <div className={s.statsContainer}>
              <h2 className="titleFont">300 +</h2>
              <p>Students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
