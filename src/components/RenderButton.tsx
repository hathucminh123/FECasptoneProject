import React from 'react';
import Button  from '@mui/material/Button';

// Hàm renderButton để tạo ra button theo cách bạn đã định nghĩa
export const renderButton = (
  text: string,
  color: string,
  variant: "contained" | "outlined",
  sxOverrides: Record<string, unknown> = {},
  onClick?: () => void
) => (
  <Button
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
    {text}
  </Button>
);


