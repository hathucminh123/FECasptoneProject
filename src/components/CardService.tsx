
import classes from "./CardService.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type inputCard = {
  url: string;
  title: string;
  text: string;
  textButton: string;
  className?: string;
  onClick?: () => void;
};

export default function CardService({
  url,
  title,
  text,
  textButton,
  className, 
  onClick

}: inputCard) {
  return (
    <div className={`${classes.card_item} ${className}`}>
      <img src={url} alt="image" className={classes.card_image} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "start",
            fontWeight: "bold",
            color: "#121212",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            textAlign: "start",
            color: "#121212",
          }}
        >
          {text}
        </Typography>
        {/* Adding the button */}
        <Button
        onClick={onClick}
          variant="outlined"
          sx={{
            borderColor: "#f60d00",
            color: "#f60d00",
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
  );
}
