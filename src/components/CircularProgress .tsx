import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress: React.FC = () => {
  const percentage = 73;

  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          // Set the path and text color to #0ab305
          pathColor: '#0ab305',
          textColor: '#0ab305',
          trailColor: '#d6d6d6', // The unfilled part color
        })}
      />
    </div>
  );
};

export default CircularProgress;
