import React from 'react';
import './Tooltip.css';

interface TooltipProps {
  label: string;
  value: number;
  additionalInfo?: {
    requiredYears: number;
    candidateYears: number;
  };
}

const Tooltip: React.FC<TooltipProps> = ({ label, value, additionalInfo }) => {
  return (
    <div className="custom-tooltip">
      <div>{`${label}: ${value}%`}</div>
      {additionalInfo && (
        <div className="additional-info">
          <div>Required Years: {additionalInfo.requiredYears}</div>
          <div>Candidate Years: {additionalInfo.candidateYears}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
