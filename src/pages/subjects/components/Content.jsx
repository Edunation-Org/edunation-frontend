import s from "../styles/Content.module.css";
import Card from "./Card";
import axiosInstance from "../../../authentication/AxiosInstance";
import config from "../../../configs/config";
import { useEffect, useState } from "react";

export default function Content({ onBook }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          `${config.apis.courses.web.base}`
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className={s.contentContainer}>
      <div className={s.cardsContainer}>
        {courses.map((course) => (
          <Card
            key={course.id || course._id}
            id={course.id || course._id}
            name={course.name}
            description={course.description}
            price={course.price}
            onBook={onBook}
          />
        ))}
      </div>
    </div>
  );
}
