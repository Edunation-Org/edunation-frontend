import s from "../styles/GuidanceSection.module.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function GuidanceSection() {
  return (
    <div className={s.guidanceSectionGrid}>
      <div className={s.gridWrapper}>
        <div className={s.titleContainer}>
          <h1 className="titleFont">
            Expert Guidance For
            <br />
            Every Milestone
          </h1>
        </div>
        <div className={s.descriptionContainer}>
          <p>
            Personalized Tutoring for Every Student’s Journey
          </p>
        </div>
        <div className={s.cardContainer}>
          <div className={s.iconContainer}>
            <CalendarDaysIcon className={s.cardIcon} />
          </div>
          <h2>
            Rooted in Equity,
            <br />
            Driven by Excellence
          </h2>
          <p>
            We provide expert support across subjects and levels, 
            helping students master their goals — whether it's catching up, 
            staying on track, or getting ahead.

          </p>
        </div>
        <div className={s.cardContainer}>
          <div className={s.iconContainer}>
            <CalendarDaysIcon className={s.cardIcon} />
          </div>
          <h2>
            Discover Your Path to Excellence
            <br />
            Equity in Education Starts Here
          </h2>
          <p>
            At Edunation, we believe every student deserves a chance to succeed. Our inclusive 
            tutoring programs lift up learners from all backgrounds — because education should never be one-size-fits-all.
          </p>
        </div>
      </div>
    </div>
  );
}
