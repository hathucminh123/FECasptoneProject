import React from "react";
import classes from "./GradientCircularProgress.module.css";
interface GradientCircularProgressProps {
  percentage: number;
}

const GradientCircularProgress: React.FC<GradientCircularProgressProps> = ({
  percentage,
}) => {
  const calculateStrokeDasharray = (percentage: number): string => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    return `${(percentage / 100) * circumference} ${circumference}`;
  };

  const getStrokeColor = (): string => {
    if (percentage >= 80) return "#22c55e"; 
    if (percentage >= 50) return "#3b82f6"; 
    return "#ef4444"; 
  };
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "100px",
        height: "100px",
      }}
    >
      <svg className={classes.progress_circle} width="100" height="100">
        {/* Define the gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ff5c93", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#6a00f4", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Background track circle */}
        <circle className={classes.track} cx="50" cy="50" r="40" />

        {/* Progress circle with gradient */}
        <circle
          className={classes.progress}
          cx="50"
          cy="50"
          r="40"
       
          stroke={getStrokeColor()} 
          strokeDasharray={calculateStrokeDasharray(percentage)}
          strokeDashoffset="0"
        />

     
        <text x="50" y="50" className={classes.percentage_text}>
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  );
};

export default GradientCircularProgress;
