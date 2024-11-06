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
    className={classes.main}
    >
      <svg width="100" height="100">
        {/* Background semi-circle */}
        <circle
          className={classes.track}
          cx="50"
          cy="50"
          r="40"
          strokeWidth="10"
        />

        {/* Progress semi-circle with rotation */}
        <circle
          className={classes.progress}
          cx="50"
          cy="50"
          r="40"
          stroke={getStrokeColor()}
          strokeDasharray={calculateStrokeDasharray(percentage)}
          strokeDashoffset="0"
          transform="rotate(-90 50 50)" 
        />

        {/* Centered Percentage Text */}
        <text x="50" y="50" className={classes.percentage_text}>
          {`${percentage}%`}
        </text>
      </svg>

      {/* Label below the percentage */}
      <div className={classes.label}>completed</div>
    </div>
  );
};

export default GradientCircularProgress;
