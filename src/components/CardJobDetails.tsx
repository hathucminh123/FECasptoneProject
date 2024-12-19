import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { add, remove } from "../redux/slices/favoriteJob";
import Typography from "@mui/material/Typography";
import classes from "./CardJobDetails.module.css";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import moment from "moment";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import React from "react";

interface JobType {
  id: number;
  name: string;
  description: string;
}

interface Benefits {
  id: number;
  name: string;
  // shorthand: string;
  // description: string;
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
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
  benefitObjects?: Benefits[];
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
  imageUrl: string;
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

  const pendingJobsArray = [];
  pendingJobsArray.push(data);
  const city = pendingJobsArray?.map((city) => city?.jobLocationCities);
  const flattenedArrayCity = city?.flat();

  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumn = uniqueArrayCity;
 
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
            {/* <div className={classes.time}>
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
            </div> */}
              <div className={classes.time}>
              <span
               style={{ fontSize: "14px",
                fontWeight: 400,
                color: "#a6a6a6 !important",}}
              >
                From:{" "}
                {moment(data?.postingDate.slice(0, 10)).format("DD-MM-YYYY")} -
                To: {moment(data?.expiryDate.slice(0, 10)).format("DD-MM-YYYY")}
              </span>
            </div>

            <Link to={`/jobs/detail/${data?.id}`} className={classes.link}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  lineHeight: "1.5",
                  fontWeight: "bold",
                  // color: "#121212",
                  marginTop: "12px !important",
                  fontFamily: "Lexend, sans-serif",
                }}
              >
                {data?.jobTitle}
              </Typography>
            </Link>
            <div className={classes.logo}>
              <img
                className={classes.image}
                src={
                  company?.imageUrl === null || company?.imageUrl === "string"
                    ? data?.imageURL
                    : company?.imageUrl
                }
                alt="image-job"
              />
              <Link
                to={`/company/detail/${company?.id}`}
                className={classes.link3}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#414042 !important",
                    fontFamily: "Lexend, sans-serif",
                  }}
                >
                  {company?.companyName}
                </Typography>
              </Link>
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
                {data?.salary} USD
              </Typography>
            </div>
            <div className={classes.separator}></div>

            {/* <div className={classes.location}>
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
                {data?.jobLocationCities.map((item) => item)}
              </Typography> */}
                {/* <div className={classes.location}>
              <LocationOnOutlinedIcon />
              <span
               className={classes.span}
               style={{
                paddingLeft: "8px",
               }}
              >
                {cityColumn.length && cityColumn.length > 0 ? (
                  <span
                    style={{
                      display: "inline-block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {cityColumn.join(", ")}
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {company?.address} {" in "} {company?.city}
                  </span>
                )}
              </span>
            </div> */}
            <div className={classes.location}>
              <LocationOnOutlinedIcon />
              <span
               className={classes.span}
              >
                {cityColumn.length && cityColumn.length > 0 ? (
                  <span
                    style={{
                      display: "inline-block",
                      whiteSpace: "wrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {cityColumn.join(", ")}
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-block",
                      whiteSpace: "wrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {company?.address} {" in "} {company?.city}
                  </span>
                )}
              </span>
            </div>
            </div>
            <div className={classes.location}>
              <BusinessCenterOutlinedIcon />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#414042",
                  paddingLeft: "8px",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              >
                {data?.jobType?.name}
              </span>
            </div>


            <div className={classes.job}>
              {data?.skillSets.map((tag, index) => (
                <div key={index} className={classes.button}>
                  {tag}
                </div>
              ))}
            </div>
            <div className={classes.separator}></div>

          <div className={classes.benefit}>
            <ul className={classes.ul}>
              {data?.benefitObjects && data.benefitObjects.length > 0 ? (
                data.benefitObjects.map((benefit) => (
                  <li className={classes.li} key={benefit.id}>
                    {benefit.name}
                  </li>
                ))
              ) : (
                <li className={classes.li}>no Benefits Yet</li>
              )}
            </ul>
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

  );
}
