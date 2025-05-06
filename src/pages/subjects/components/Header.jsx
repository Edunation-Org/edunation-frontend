import s from "../styles/Header.module.css";
import HeaderImage from "../images/subjects-header.jpg";

export default function Header() {
  return (
    <div className={s.headerContainer}>
      <div className={s.headerTitle}>
        <h1 className="titleFont">
          Choose Your Subject
          <br />
          Start Learning
        </h1>
      </div>
      <div className={s.headerImageContainer}>
        <img src={HeaderImage} alt="header" />
      </div>
    </div>
  );
}
