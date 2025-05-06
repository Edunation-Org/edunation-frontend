import s from "../styles/Testimonials.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/autoplay";

const NextButton = ({ swiperRef }) => {
  return (
    <button
      onClick={() => {
        if (!swiperRef.current) return;
        if (swiperRef.current.isEnd) {
          swiperRef.current.slideTo(0);
        } else {
          swiperRef.current.slideNext();
        }
      }}
      className={s.swiperButton}
    >
      <FaAngleRight />
    </button>
  );
};
const PrevButton = ({ swiperRef }) => {
  return (
    <button
      onClick={() => {
        if (!swiperRef.current) return;
        if (swiperRef.current.isBeginning) {
          swiperRef.current.slideTo(swiperRef.current.slides.length - 1);
        } else {
          swiperRef.current.slidePrev();
        }
      }}
      className={s.swiperButton}
    >
      <FaAngleLeft />
    </button>
  );
};

export default function Testimonials() {
  const swiperRef = useRef(null);

  return (
    <div className={s.testimonialsContainer}>
      <div className={s.testimonialsTitle}>
        <h1 className="titleFont">What our students say</h1>
      </div>
      <div className={s.swiperContainer}>
        <PrevButton swiperRef={swiperRef} />
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          onSlideChange={() => console.log("slide change")}
          className={s.swiperWrapper}
        >
          <SwiperSlide>
            <p style={{ fontStyle: "italic", color: "#151515" }}>
              “Nulla sed suscipit lectus. Phasellus rhoncus vulputate odio et
              placerat. Aenean ut aliquam erat. Integer rutrum eleifend ante, a
              bibendum leo tristique id. Phasellus euismod sapien non ornare
              sagittis. Donec molestie eros dolor. Curabitur laoreet neque at
              magna pulvinar cursus. Nulla euismod orci in varius mollis”
            </p>
            <div className={s.studentDetails}>
              <div className={s.studentImageContainer}></div>
              <div className={s.studentName}>
                <h3>John Doe</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <p style={{ fontStyle: "italic", color: "#151515" }}>
              “Nulla sed suscipit lectus. Phasellus rhoncus vulputate odio et
              placerat. Aenean ut aliquam erat. Integer rutrum eleifend ante, a
              bibendum leo tristique id. Phasellus euismod sapien non ornare
              sagittis. Donec molestie eros dolor. Curabitur laoreet neque at
              magna pulvinar cursus. Nulla euismod orci in varius mollis”
            </p>
            <div className={s.studentDetails}>
              <div className={s.studentImageContainer}></div>
              <div className={s.studentName}>
                <h3>John Doe</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <p style={{ fontStyle: "italic", color: "#151515" }}>
              “Nulla sed suscipit lectus. Phasellus rhoncus vulputate odio et
              placerat. Aenean ut aliquam erat. Integer rutrum eleifend ante, a
              bibendum leo tristique id. Phasellus euismod sapien non ornare
              sagittis. Donec molestie eros dolor. Curabitur laoreet neque at
              magna pulvinar cursus. Nulla euismod orci in varius mollis”
            </p>
            <div className={s.studentDetails}>
              <div className={s.studentImageContainer}></div>
              <div className={s.studentName}>
                <h3>John Doe</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <p style={{ fontStyle: "italic", color: "#151515" }}>
              “Nulla sed suscipit lectus. Phasellus rhoncus vulputate odio et
              placerat. Aenean ut aliquam erat. Integer rutrum eleifend ante, a
              bibendum leo tristique id. Phasellus euismod sapien non ornare
              sagittis. Donec molestie eros dolor. Curabitur laoreet neque at
              magna pulvinar cursus. Nulla euismod orci in varius mollis”
            </p>
            <div className={s.studentDetails}>
              <div className={s.studentImageContainer}></div>
              <div className={s.studentName}>
                <h3>John Doe</h3>
              </div>
            </div>
          </SwiperSlide>
          ...
        </Swiper>
        <NextButton swiperRef={swiperRef} />
      </div>
    </div>
  );
}
