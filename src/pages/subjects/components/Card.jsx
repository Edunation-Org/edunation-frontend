import s from "../styles/Card.module.css";

export default function Card({ id, name, description, price, onBook }) {
  const handleClick = () => {
    onBook({ id, name, price });
  };

  return (
    <div className={s.cardContainer}>
      <div className={s.cardHeader}>
        <div className={s.subjectTitle}>
          <h2 className="titleFont">{name}</h2>
        </div>
        <div className={s.priceContainer}>
          <p>{price}$<small>/hr</small></p>
        </div>
      </div>
      <div className={s.cardBody}>
        <p>{description}</p>
      </div>
      <div className={s.cardButtonContainer}>
        <button onClick={handleClick} className="bodyFont">
          Book Class Now
        </button>
      </div>
    </div>
  );
}
