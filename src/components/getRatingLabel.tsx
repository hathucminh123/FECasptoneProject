import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface InteractiveRatingProps {
  initialValue: number; // Initial rating value
  max: number; // Maximum number of stars
  onChange: (value: number) => void; // Callback to handle value changes
}

 const getRatingLabel = (value: number): string => {
  switch (value) {
    case 1:
      return "Terrible";
    case 2:
      return "Needs Improvement";
    case 3:
      return "Good";
    case 4:
      return "Really Good";
    case 5:
      return "Fantastic";
    default:
      return "";
  }
};

export const InteractiveRating: React.FC<InteractiveRatingProps> = ({
  initialValue,
  max,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(initialValue);

  const handleMouseEnter = (value: number) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = (value: number) => {
    setSelectedValue(value);
    onChange(value);
  };

  const displayValue = hoverValue !== null ? hoverValue : selectedValue;

  return (
    <Box display="flex" alignItems="center">
      {/* Render stars */}
      {Array.from({ length: max }, (_, index) => {
        const value = index + 1;
        return (
          <Box
            key={value}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(value)}
            style={{ cursor: "pointer" }}
          >
            {value <= displayValue ? (
              <StarIcon style={{ color: "#FFA726" }} />
            ) : (
              <StarBorderIcon style={{ color: "#BDBDBD" }} />
            )}
          </Box>
        );
      })}
      {/* Render label */}
      <Typography marginLeft={1} fontWeight="bold">
        {getRatingLabel(displayValue)}
      </Typography>
    </Box>
  );
};

export default function App() {
  const handleRatingChange = (value: number) => {
    console.log("Selected Rating:", value);
  };

  return <InteractiveRating initialValue={3} max={5} onChange={handleRatingChange} />;
}
