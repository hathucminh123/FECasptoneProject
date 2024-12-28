import React, { useState } from "react";
import classes from "./CompanyReview.module.css";
import Typography from "@mui/material/Typography";
import RenderButton from "../components/RenderButton";
import { Rate, Modal } from "antd";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import "react-circular-progressbar/dist/styles.css";
// import CircularProgress from "../components/CircularProgress ";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetReviewApprovedCompany } from "../Services/ReviewCompany/GetReviewApprovedCompany";
import { fetchCompaniesById } from "../Services/CompanyService/GetCompanyById";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { debounce } from "lodash";

const CompanyReview: React.FC = () => {
  // const location = useLocation();
  // const companyData: Company | null = location.state || null;
  const { CompanyId } = useParams();
  const [hoveredReview, setHoveredReview] = useState<null | number>(null);
  const handleSelectReview = (id: number) => {
    setHoveredReview(id); // Hiển thị modal khi click
  };

  const handleCloseModal = () => {
    setHoveredReview(null); // Đóng modal
  };

  const { data: ReviewApproved } = useQuery({
    queryKey: ["Company-Review", CompanyId],
    queryFn: ({ signal }) =>
      GetReviewApprovedCompany({ id: Number(CompanyId), signal }),
    enabled: !!CompanyId,
  });

  const ApprovedReview = ReviewApproved?.reviewDetails;

  const {
    data: CompanyDa,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["Company-details", CompanyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(CompanyId), signal }),
    enabled: !!CompanyId,
  });

  // Dữ liệu công ty (nếu có)
  const companyDataa = CompanyDa?.Companies;

  console.log("okchua", companyDataa);

  return (
    <>
      {/* <div className={classes.overview}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            // borderBottom: "1px dashed #dedede",
            // paddingBottom: "16px",
          }}
        >
          OverRall rating
        </Typography>

        <div className={classes.percent}>
          <div className={classes.percentleft}>
            <div className={classes.percent1}>
              <div className={classes.percent2}>
                <div className={classes.percent3}>
                  <p
                    style={{
                      color: "#121212",
                      fontSize: "36px",
                      fontWeight: 700,
                      marginTop: "0px",
                      marginBottom: "0px",
                      lineHeight: 1,
                    }}
                  >
                    3.4
                  </p>
                  <div className={classes.rate1}>
                    <Rate defaultValue={3} disabled style={{ marginTop: 5 }} />
                  </div>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {ApprovedReview?.length} reviews
                  </Typography>
                </div>
              </div>
              <div className={classes.line}></div>
            </div>
          </div>
          <div className={classes.percentRight}>
            <div className={classes.percentRight1}>
              <CircularProgress />
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", fontWeight: 400, paddingLeft: "12px" }}
              >
                Recommend working here to a friend
              </Typography>
            </div>
          </div>
        </div>
      </div> */}
      <div className={classes.review}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            // borderBottom: "1px dashed #dedede",
            // paddingBottom: "16px",
          }}
        >
          Let your voice be heard.
        </Typography>
        <div className={classes.buttonreview}>
          <RenderButton
            text="Write review"
            color="#4cd681"
            variant="contained"
            sxOverrides={{ width: "100%" }}
          />
        </div>
      </div>
      <div className={classes.overview}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            borderBottom: "1px dashed #dedede",
            paddingBottom: "16px",
          }}
        >
          {ApprovedReview?.length} Reviews
        </Typography>

        {ApprovedReview?.map((item) => {
          const averageRating = (
            (item.salaryRating +
              item.trainingRating +
              item.careRating +
              item.cultureRating +
              item.officeRating) /
            5
          ).toFixed(1);
          return (
            <div key={item.id} className={classes.comment}>
              <div className={classes.comment1}>
                {/* <span
                style={{ fontWeight: 400, fontSize: "14px", color: "#a6a6a6" }}
              >
                July 2024
              </span> */}
                <Typography
                  variant="h3"
                  sx={{
                    color: "#121212",
                    lineHeight: 1.5,
                    fontSize: "18px",
                    fontWeight: 700,
                    marginTop: "0px",
                    marginBottom: "0px",
                  }}
                >
                  {item.summaryContent}
                </Typography>
                <div className={classes.rate}>
                  <div className={classes.rate1}  style={{cursor:'pointer'}} onClick={() => handleSelectReview(item.id)} >
                    <Rate
                      value={parseFloat(averageRating)} // Giá trị trung bình
                      disabled
                      style={{ marginTop: 5 }}
                    />
                    <span
                      style={{
                        marginLeft: "12px",
                        marginRight: "4px",
                        marginTop: "0px",
                        marginBottom: "0px",
                        color: "#121212",
                      }}
                    >
                      {averageRating} / 5
                    </span>
                    <div className={classes.main1}>
                      <ExpandMoreIcon style={{ fontSize: 24 }} />
                    </div>
                  </div>
                  {item.recommened && (
                    <div className={classes.like}>
                      <ThumbUpOutlinedIcon
                        sx={{
                          position: "relative",
                          top: "2px",
                          width: "16px",
                          height: "16px",
                          color: "#0ab305",
                        }}
                      />
                      Recommend
                    </div>
                  )}
                  <Modal
                    open={hoveredReview === item.id}
                    footer={null}
                    onCancel={handleCloseModal} // Đóng modal khi click ngoài
                    title="Detailed Ratings"
                  >
                    <div className={classes.modalContent}>
                      <div className={classes.ratingItem}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Salary & Benefits:
                        </Typography>
                        <Rate
                          value={item.salaryRating}
                          disabled
                          style={{ color: "#fadb14" }}
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {item.salaryRating} / 5
                        </span>
                      </div>
                      <div className={classes.ratingItem}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Training & Learning:
                        </Typography>
                        <Rate
                          value={item.trainingRating}
                          disabled
                          style={{ color: "#fadb14" }}
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {item.trainingRating} / 5
                        </span>
                      </div>
                      <div className={classes.ratingItem}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Management Cares:
                        </Typography>
                        <Rate
                          value={item.careRating}
                          disabled
                          style={{ color: "#fadb14" }}
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {item.careRating} / 5
                        </span>
                      </div>
                      <div className={classes.ratingItem}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Culture & Fun:
                        </Typography>
                        <Rate
                          value={item.cultureRating}
                          disabled
                          style={{ color: "#fadb14" }}
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {item.cultureRating} / 5
                        </span>
                      </div>
                      <div className={classes.ratingItem}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Office & Workspace:
                        </Typography>
                        <Rate
                          value={item.officeRating}
                          disabled
                          style={{ color: "#fadb14" }}
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {item.officeRating} / 5
                        </span>
                      </div>
                    </div>
                  </Modal>
                </div>

                <div className={classes.comment2}>
                  <Typography
                    variant="h4"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "16px",
                      fontWeight: 600,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    What I liked:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "16px",
                      fontWeight: 400,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    {item.reviewContent}
                  </Typography>
                </div>

                <div className={classes.comment2}>
                  <Typography
                    variant="h4"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "16px",
                      fontWeight: 600,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    Your Experience:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "16px",
                      fontWeight: 400,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    {item.experienceContent}
                  </Typography>
                </div>
                <div className={classes.comment2}>
                  <Typography
                    variant="h4"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "16px",
                      fontWeight: 600,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    Suggestions for improvement:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "16px",
                      fontWeight: 400,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    {item.suggestionContent}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className={classes.comment}>
          <div className={classes.comment1}>
            <span
              style={{ fontWeight: 400, fontSize: "14px", color: "#a6a6a6" }}
            >
              July 2024
            </span>
            <Typography
              variant="h3"
              sx={{
                color: "#121212",
                lineHeight: 1.5,
                fontSize: "18px",
                fontWeight: 700,
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              The working environment is comfortable, convenient, equipment is
              provided fully.
            </Typography>
            <div className={classes.rate}>
              <div className={classes.rate1}>
                <Rate defaultValue={3} disabled style={{ marginTop: 5 }} />
                <span
                  style={{
                    marginLeft: "12px",
                    marginRight: "4px",
                    marginTop: "0px",
                    marginBottom: "0px",
                    color: "#121212",
                  }}
                >
                  4
                </span>
              </div>
              <div className={classes.like}>
                <ThumbUpOutlinedIcon
                  sx={{
                    position: "relative",
                    top: "2px",
                    width: "16px",
                    height: "16px",
                    color: "#0ab305",
                  }}
                />
                Recommend
              </div>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I liked:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Suggestions for improvement:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>
          </div>
        </div> */}
        {/* <div className={classes.comment}>
          <div className={classes.comment1}>
            <span
              style={{ fontWeight: 400, fontSize: "14px", color: "#a6a6a6" }}
            >
              July 2024
            </span>
            <Typography
              variant="h3"
              sx={{
                color: "#121212",
                lineHeight: 1.5,
                fontSize: "18px",
                fontWeight: 700,
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              The working environment is comfortable, convenient, equipment is
              provided fully.
            </Typography>
            <div className={classes.rate}>
              <div className={classes.rate1}>
                <Rate defaultValue={3} disabled style={{ marginTop: 5 }} />
                <span
                  style={{
                    marginLeft: "12px",
                    marginRight: "4px",
                    marginTop: "0px",
                    marginBottom: "0px",
                    color: "#121212",
                  }}
                >
                  4
                </span>
              </div>
              <div className={classes.like}>
                <ThumbUpOutlinedIcon
                  sx={{
                    position: "relative",
                    top: "2px",
                    width: "16px",
                    height: "16px",
                    color: "#0ab305",
                  }}
                />
                Recommend
              </div>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I liked:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Suggestions for improvement:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default CompanyReview;
