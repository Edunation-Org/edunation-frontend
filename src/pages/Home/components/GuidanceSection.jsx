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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            maxime a odit minus praesentium et quam magni alias quibusdam ipsa
            quisquam, omnis, odio beatae accusantium ipsam. Nisi esse earum
            ipsam?
          </p>
        </div>
        <div className={s.cardContainer}>
          <div className={s.iconContainer}>
            <CalendarDaysIcon className={s.cardIcon} />
          </div>
          <h2>
            A Place For Bright
            <br />
            Minds
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim,
            laborum dignissimos itaque, nisi voluptate quibusdam a, eos numquam
            eveniet quasi. Optio, sit fugiat impedit odit vitae ducimus vel non!
          </p>
        </div>
        <div className={s.cardContainer}>
          <div className={s.iconContainer}>
            <CalendarDaysIcon className={s.cardIcon} />
          </div>
          <h2>
            A Place For Bright
            <br />
            Minds
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim,
            laborum dignissimos itaque, nisi voluptate quibusdam a, eos numquam
            eveniet quasi. Optio, sit fugiat impedit odit vitae ducimus vel non!
          </p>
        </div>
        <div className={s.cardContainer}>
          <div className={s.iconContainer}>
            <CalendarDaysIcon className={s.cardIcon} />
          </div>
          <h2>
            A Place For Bright
            <br />
            Minds
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim,
            laborum dignissimos itaque, nisi voluptate quibusdam a, eos numquam
            eveniet quasi. Optio, sit fugiat impedit odit vitae ducimus vel non!
          </p>
        </div>
        <div className={s.cardContainer}>
          <div className={s.iconContainer}>
            <CalendarDaysIcon className={s.cardIcon} />
          </div>
          <h2>
            A Place For Bright
            <br />
            Minds
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim,
            laborum dignissimos itaque, nisi voluptate quibusdam a, eos numquam
            eveniet quasi. Optio, sit fugiat impedit odit vitae ducimus vel non!
          </p>
        </div>
      </div>
    </div>
  );
}
