import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { add, remove } from "../redux/slices/favoriteJob";
import Typography from "@mui/material/Typography";
import classes from "./CardJobDetails.module.css";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";


interface JobType {
  id: number;
  name: string;
  description: string;
}



interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType | string | null;
  jobLocationCities:string[] ;
  jobLocationAddressDetail:string[]
  skillSets: string[];
}

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl:string;
}

interface MyComponentProps {
  Maxwidth?: string;
  className?: string;
  formButton?: boolean;
  img?: string;
  data?: JobPost;
  company?: Company;
  onclick?: () => void;
  setShowAlert?: Dispatch<SetStateAction<boolean>>;
  setShowAlertt?: Dispatch<SetStateAction<boolean>>;
  setUndoData?: Dispatch<SetStateAction<JobPost | null>>;
}

export default function CardJobDetails({
  Maxwidth,
  className,
  formButton,
  data,
  setShowAlert,
  setShowAlertt,
  setUndoData,
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

  // const getJobLocation = (
  //   jobLocation: JobLocation | string | null | undefined
  // ): string => {
  //   if (typeof jobLocation === "string") {
  //     return jobLocation;
  //   } else if (jobLocation === null) {
  //     return "Location not specified";
  //   } else {
  //     return `${jobLocation?.district}, ${jobLocation?.city}, ${jobLocation?.state}, ${jobLocation?.country}`;
  //   }
  // };

  return (
    <div
      className={classes.card_main}
      onClick={onclick}
      style={{ cursor: "pointer" }}
    >
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
                From: {data?.postingDate.slice(0, 10)} - To:{" "}
                {data?.expiryDate.slice(0, 10)}
              </Typography>
            </div>
            <Link to={`jobs/detail/${data?.id}`} className={classes.link}>
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
                {data?.jobTitle}
              </Typography>
            </Link>
            <div className={classes.logo}>
              <img
                className={classes.image}
                src={company?.imageUrl}
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
                {company?.companyName}
              </Typography>
            </div>
            <div className={classes.money}>
              <MonetizationOnOutlinedIcon
                sx={{ color: "#0ab305 !important" }}
              />
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
                {data?.jobLocationCities.map((item)=>(item))}
              </Typography>
            </div>

            <div className={classes.job}>
              {data?.skillSets.map((tag, index) => (
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
                  onClick={handleFavoriteClick}
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
