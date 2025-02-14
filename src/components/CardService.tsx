import classes from "./CardService.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { ReactNode } from "react";

type inputCard = {
  url: string;
  title: string;
  text: string;
  textButton: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
};

const CardService: React.FC<inputCard> = ({
  url,
  title,
  text,
  textButton,
  children,
  // className,
  onClick,
}) => {
  return (
    <div className={`${classes.card_item} `}>
      <div className={classes.card}>
        <div className={classes.divimg}>
          <img src={url} alt="image" className={classes.card_image} />
        </div>
        <div className={classes.right}>
          <div className={classes.right1}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                mt: 0,
                mb: 0,
                boxSizing: "border-box",
                display: "block",
                fontFamily:"Lexend",
              }}
            >
              {title}
            </Typography>
          </div>
          <Typography
          variant="body2"
          gutterBottom
          sx={{
           lineHeight:1.8,
           marginTop:"8px",
           color:'#414042',
           fontSize:'16px',
           fontWeight:400,
           mb:0,
           boxSizing:'border-box',
           display:'block',
           fontFamily:"Lexend",
          }}
        >
          {text}
        </Typography>
        <Button
          onClick={onClick}
          variant="outlined"
          sx={{
            // borderColor: "#f60d00",
            borderColor:"#4cd681",
            color:"#4cd681",
            // color: "#f60d00",
            marginTop: "10px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f60d00",
              color: "white",
              borderColor: "#f60d00",
            },
          }}
        >
          {textButton}
        </Button>
        </div>
      </div>
   
       {children}
     
    </div>
  );
}
export default CardService