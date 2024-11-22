import React, { ReactNode, useState } from "react";
import Button from "@mui/material/Button";

interface RenderButtonProps {
  iconHovered?: ReactNode;
  textHover?: string;
  icon?: ReactNode;
  text: string;
  color: string;
  variant: "contained" | "outlined";
  sxOverrides?: Record<string, unknown>;
  onClick?: () => void;
  disabled?: boolean;
}

const RenderButton: React.FC<RenderButtonProps> = ({
  iconHovered,
  textHover,
  icon,
  text,
  color,
  variant,
  sxOverrides = {},
  onClick,
  disabled,
}) => {
  const [hovered, setHovered] = useState<null | string>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHovered(event.currentTarget.textContent || null);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      size="large"
      sx={{
        mt: 1,
        backgroundColor: color,
        height: "40px",
        fontWeight: 600,
        color: variant === "contained" ? "white" : "red",
        padding: "11px 24px",
        fontSize: "16px",
        borderRadius: "4px",
        minWidth: "80px",
        display: "inline-flex",
        fontFamily: "Lexend, sans-serif",
        justifyContent: "center",
        lineHeight: "1",
        gap: "18px",
        border: "1px solid transparent",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#ff3d3d",
          color: variant === "contained" ? "white" : "white",
        },
        ...sxOverrides,
      }}
    >
      {icon && hovered ? (
        <>
          {iconHovered} {textHover}
        </>
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </Button>
  );
};

export default RenderButton;
