import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { add, remove } from "../redux/slices/favoriteJob";
import Typography from "@mui/material/Typography";
import classes from "./CardJob.module.css";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
}

interface Company {
  id: number;
  name: string;
  overview: {
    title: string;
    description: string;
  };
  jobs: Job[];
  location: string;
  jobOpeningsCount: number;
  image: string;
}

interface MyComponentProps {
  Maxwidth?: string;
  className?: string;
  formButton?: boolean;
  data?: Job;
  img?: string;
  company?: Company;
  onclick?: () => void;
  setShowAlert?: Dispatch<SetStateAction<boolean>>;
  setShowAlertt?: Dispatch<SetStateAction<boolean>>;
  setUndoData?: Dispatch<SetStateAction<Job | null>>; // Hàm để lưu lại công việc khi undo
}

export default function CardJob({
  Maxwidth,
  className,
  formButton,
  data,
  img,
  setShowAlert,
  setShowAlertt,
  setUndoData, // Nhận thêm prop để lưu công việc khi xóa
  company,
  onclick,
}: MyComponentProps) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const dataa = useAppSelector((state) => state.favorite.item);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && dataa.find((item) => item.id === data.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [dataa, data]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data) {
      if (favorite) {
        dispatch(remove(data.id)); 
        setShowAlert?.(true); 
        setUndoData?.(data); 
      } else {
        dispatch(add(data)); 
        setShowAlertt?.(true); 
      }
      setFavorite((prev) => !prev);
    }
  };

  return (
    <div className={classes.card_main} onClick={onclick} style={{ cursor: 'pointer' }}>
      <div
        className={`${className ? className : classes.card_item}`}
        style={Maxwidth ? { maxWidth: Maxwidth } : {}}
      >
        <div className={formButton ? classes.card_itemm1 : classes.card_itemm}>
          <div style={{ display: "block" }}>
            <div className={classes.time}>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#a6a6a6 !important",
                }}
              >
                {data?.postDate}
              </Typography>
            </div>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                lineHeight: "1.5",
                fontWeight: "bold",
                color: "#121212",
                marginTop: "12px !important",
              }}
            >
              {data?.title}
            </Typography>
            <div className={classes.logo}>
              <img
                className={classes.image}
                src={company ? company?.image : img}
                alt="image-job"
              />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#414042 !important",
                }}
              >
                {company?.name}
              </Typography>
            </div>
            <div className={classes.money}>
              <MonetizationOnOutlinedIcon sx={{ color: "#0ab305 !important" }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  alignItems: "start",
                  fontWeight: "bold",
                  mt: "7px",
                  color: "#0ab305 !important",
                }}
              >
                {data?.salary}
              </Typography>
            </div>
            <div className={classes.separator}></div>

            <div className={classes.location}>
              <LocationOnIcon />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  alignItems: "start",
                  fontWeight: 400,
                  mt: "7px",
                  color: " #414042 !important",
                  fontSize: "14px",
                }}
              >
                {data?.location}
              </Typography>
            </div>

            <div className={classes.job}>
              {data?.tags.map((tag, index) => (
                <button key={index} className={classes.button}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          {formButton ? (
            <div className={classes.formbutton}>
              <div className={classes.button_icon}>
                <Button
                  sx={{
                    minWidth: "140px",
                    backgroundColor: "#ed1b2f",
                    borderColor: "#ed1b2f",
                    color: "#fff",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "7px 20px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    lineHeight: 1.5,
                    gap: "8px",
                    border: "1px solid transparent",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#C82222",
                      color: "white",
                    },
                  }}
                >
                  Apply now
                </Button>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleFavoriteClick} // Gọi hàm xử lý khi click yêu thích
                >
                  {favorite ? (
                    <FavoriteIcon
                      fontSize="large"
                      sx={{
                        color: "#ed1b2f !important",
                        mr: 2,
                      }}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      fontSize="large"
                      sx={{
                        color: "#ed1b2f !important",
                        mr: 2,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}
