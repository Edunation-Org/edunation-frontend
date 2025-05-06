import { useState, useEffect } from "react";
import Navbar from "../../global/components/Navbar";
import Header from "./components/Header";
import Content from "./components/Content";
import Testimonials from "./components/Testimonials";

export default function Subjects() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleBookClick = (course) => {
    setSelectedCourse(course);
  };

  useEffect(() => {
    document.body.style.overflow = selectedCourse ? "hidden" : "auto";
  }, [selectedCourse]);

  return (
    <>
      <Navbar isColored={true} />
      <Header />
      <Content onBook={handleBookClick} />
      <Testimonials />
    </>
  );
}
