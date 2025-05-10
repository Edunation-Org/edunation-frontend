import s from "../styles/GuidanceSection.module.css";
import BalanceIcon from "@mui/icons-material/Balance";
import SchoolIcon from "@mui/icons-material/School";

export default function GuidanceSection() {
  return (
    <div className={s.guidanceSectionContainer}>
      <div className={s.titleContainer}>
        <h1 className="titleFont">
          Expert Guidance
          <br />
          For Every Milestone
        </h1>
        <p>Personalized Tutoring for Every Student’s Journey</p>
      </div>
      <div className={s.cardsContainer}>
        <div className={`${s.cardContainer} ${s.coloredCard}`}>
          <SchoolIcon fontSize="large" />
          <h2>
            Rooted in Equity,
            <br />
            Driven by Excellence
          </h2>
          <p>
            We provide expert support across subjects and levels, helping
            students master their goals — whether it's catching up, staying on
            track, or getting ahead.
          </p>
        </div>
        <div className={s.cardContainer}>
          <BalanceIcon fontSize="large" className={s.cardIcon} />
          <h2>
            Discover Your Path to Excellence
            <br />
            Equity in Education Starts Here
          </h2>
          <p>
            At EDUNATIONAL LEARNING ACADEMY, we believe every student deserves a
            chance to succeed. Our inclusive tutoring programs lift up learners
            from all backgrounds — because education should never be
            one-size-fits-all.
          </p>
        </div>
      </div>
    </div>
  );
}
