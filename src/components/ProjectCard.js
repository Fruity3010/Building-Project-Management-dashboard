import React, { useState } from "react";
import Progress from "../components/Progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapPin,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({
  title,
  statusTags,
  description,
  startDate,
  endDate,
  progress,
  location,
  cost,
  color,
  imageSrc,
  onView 
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border shadow-md p-4 w-full max-w-sm bg-white">
      <div className="h-48 mb-4 rounded-md overflow-hidden">
      <img
  src={imageSrc}
  alt="Project"
  className="w-full object-cover"
  style={{ minHeight: "180px", maxHeight: "180px", height: "100%", minWidth: "100%" }}
/>

      </div>

      <h4 className="font-semibold text-lg mb-2">{title}</h4>

      <div className="flex flex-wrap gap-2 mb-2">
        {statusTags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 px-2 py-1 rounded-full "
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm mb-2">
        {expanded ? description : `${description.slice(0, 100)}...`}
      </p>

      <button
  onClick={onView}
  style={{
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#16a34a",
    color: "white",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#166534")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
>
  View Details
</button>

      <div className="text-xs mb-2 flex gap-2">
        <div className="flex items-center gap-1">
          <FontAwesomeIcon
            icon={faCalendar}
            className="me-2 w-3.5 h-3.5 text-gray-900"
          />
          Start: {startDate}
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon
            icon={faCalendar}
            className="me-2 w-3.5 h-3.5 text-gray-900"
          />
          Due: {endDate}
        </div>
      </div>
      <div className="mb-2">
        <Progress label="Progress" color={color} value={progress} />
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <div className="flex items-center gap-1">
          <FontAwesomeIcon
            icon={faMapPin}
            className="w-3.5 h-3.5 me-2 text-gray-900"
          />
          {location}
        </div>
        <div className="flex items-center gap-1 text-gray-900 font-medium">
          {cost}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
