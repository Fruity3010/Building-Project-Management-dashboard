import React from "react";
import { ProgressBar } from '@themesberg/react-bootstrap';

export default (props) => {
  const { label, variant, value, type = "label", size = "md" } = props;
  const finalValue = value ? value : Math.floor(Math.random() * (Math.floor(100) - 20 + 1)) + 20; 
  const textColor = type === "label" ? variant : "white";
  const bgColorClass = type === "tooltip" ? `bg-${variant}` : "";

  return (
    <div className="progress-wrapper">
      <div className="progress-info">
        <div className={`progress-${type} text-${textColor} ${bgColorClass}`}>
          {label}
        </div>
        <div className="progress-percentage">
          <span className={`text-${textColor}`}>{finalValue}%</span>
        </div>
      </div>
      <ProgressBar className={`progress-${size}`} variant={variant} now={finalValue} min={0} max={100} />
    </div>
  );
};
