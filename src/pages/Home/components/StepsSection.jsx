import s from "../styles/StepsSection.module.css";
import StepsImg from "../images/steps.jpg";
import { Link } from "react-router-dom";

export default function StepsSection() {
  return (
    <div className={s.stepsSection}>
      <div className={s.stepsGrid}>
        <div className={s.imgContainer}>
          <img src={StepsImg} alt="" />
        </div>
        <div className={s.journeyContainer}>
          <div className={s.topDesign}>
            <div className={s.left}></div>
            <div className={s.center}>
              <div className={s.centerBack}></div>
              <div className={s.centerFront}></div>
            </div>
            <div className={s.right}></div>
          </div>
          <div className={s.journeyContent}>
            <h1 className="titleFont">
              Start Your Journey Now With Just A Few Steps
            </h1>
            <div className={s.description}>
              <p>
                Our mission is to provide accessible, flexible, and impactful
                education that empowers individuals to achieve their personal
                and professional goals. Join a vibrant community.
              </p>
              <p>
                We offer a diverse range of high-quality online courses designed
                to meet the needs of learners worldwide.
              </p>
            </div>
            {/* <button className="titleFont">See How It Works</button> */}
          </div>
        </div>
        <div className={s.courseButtonContainer}>
          <Link to={"/subjects"}>
            <button className="titleFont">
              View
              <br />
              Courses Now
            </button>
          </Link>
        </div>
        <div className={s.statsContainer}>
          <div className={s.stat}>
            <h2>10K +</h2>
            <p>Happy Students</p>
          </div>
          <div className={s.stat}>
            <h2>10K +</h2>
            <p>Happy Students</p>
          </div>
        </div>
      </div>
    </div>
  );
}
