import s from "../styles/StepsSection.module.css";
import StepsImg from "../images/steps.jpg";

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
              Start Strong. Stay Ahead.
            </h1>
            <div className={s.description}>
              <p>
                Our mission is to make high-quality tutoring accessible and impactful — 
                especially for students who need it most. Join a learning community built on support, 
                opportunity, and success.
              </p>
              <p>
                We offer a diverse range of high-quality online courses designed
                to meet the needs of learners worldwide.
              </p>
            </div>
            {/* <button className="titleFont">See How It Works</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
