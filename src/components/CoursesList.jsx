import React from "react";
import { FaCalculator, FaFlask, FaCode, FaGlobe, FaHistory } from "react-icons/fa";
import "./CoursesList.css";

const coursesData = [
  { id: 1, name: "Math", icon: <FaCalculator /> },
  { id: 2, name: "Science", icon: <FaFlask /> },
  { id: 3, name: "Programming", icon: <FaCode /> },
  { id: 4, name: "Geography", icon: <FaGlobe /> },
  { id: 5, name: "History", icon: <FaHistory /> },
];

const CoursesList = ({ onSelectCourse }) => {
  return (
    <div className="courses-list">
      {coursesData.map((course) => (
        <div
          key={course.id}
          className="course-item"
          onClick={() => onSelectCourse(course.name)}
        >
          <span className="course-icon">{course.icon}</span>
          <span className="course-name">{course.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
