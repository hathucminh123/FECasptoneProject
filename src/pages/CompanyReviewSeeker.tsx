import React, { useState } from "react";
import classes from "./CompanyReviewSeeker.module.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompaniesById } from "../Services/CompanyService/GetCompanyById";
import { InteractiveRating } from "../components/getRatingLabel";
import { PostReviewCompany } from "../Services/ReviewCompany/PostReviewCompany";
import { message } from "antd";
export const CompanyReviewSeeker: React.FC = () => {
  const navigate = useNavigate();
  const { CompanyId } = useParams();
  const handleGoBack = () => {
    navigate(`/company/detail/${Number(CompanyId)}`);
  };
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [summaryContent, setSummaryContent] = useState<string>("");
  const [reviewContent, setReviewContent] = useState<string>("");
  const [experienceContent, setExperienceContent] = useState<string>("");
  const [sugestionContent, setSugestionContent] = useState<string>("");

  const [salaryRating, setSalaryRating] = useState<number>();
  const [trainingRating, setTrainingRating] = useState<number>();
  const [careRating, setCareRating] = useState<number>();
  const [cultureRating, setCultureRating] = useState<number>();
  const [officeRating, setOfficeRating] = useState<number>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isYes, setIsYes] = useState<boolean>();

  //   const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRecommendationChange = (value: boolean) => {
    setIsYes(value);
  };

  //   const handleUploadClick = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (fileInputRef.current) {
  //       fileInputRef.current.click();
  //     }
  //   };

  const handleFocus = () => {
    setIsActive(true);
  };
  const handleFocusExperience = () => {
    setIsActive1(true);
  };
  const handleFocusSugestion = () => {
    setIsActive2(true);
  };

  const handleFocusReview = () => {
    setIsActive3(true);
  };

  const handleBlurReview = () => {
    if (reviewContent === "") {
      setIsActive3(false);
    } else {
      setIsActive3(true);
    }
  };

  const handleBlurSugestion = () => {
    if (sugestionContent === "") {
      setIsActive2(false);
    } else {
      setIsActive2(true);
    }
  };
  const handleBlurExperience = () => {
    if (experienceContent === "") {
      setIsActive1(false);
    } else {
      setIsActive1(true);
    }
  };

  const handleBlur = () => {
    if (summaryContent === "") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }

    // setIsActive(false);
  };
  const handleRatingChange = (value: number) => {
    setSalaryRating(value);
  };

  const handleTrainingRating = (value: number) => {
    setTrainingRating(value);
  };

  const handleCareRating = (value: number) => {
    setCareRating(value);
  };

  const handleCultureRating = (value: number) => {
    setCultureRating(value);
  };

  const handleOfficeRating = (value: number) => {
    setOfficeRating(value);
  };

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

  const { mutate: Review } = useMutation({
    mutationFn: PostReviewCompany,
    onSuccess: () => {
      // console.log("ok chua ta ", data);
      // queryClient.invalidateQueries({
      //   queryKey: ["JobPostActivity"],
      //   refetchType: "active", // Ensure an active refetch
      // });
      message.success(`Review on ${companyDataa?.companyName} successfully!`);
      // navigate(`/thankyou/${job?.id}`);
      navigate(`/company/success/${Number(CompanyId)}`);
    },

    onError: () => {
      message.error(`Failed to Review on ${companyDataa?.companyName}.`);
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!summaryContent)
      newErrors.summaryContent = "Summary content is required.";
    if (!reviewContent) newErrors.reviewContent = "Review content is required.";
    if (!experienceContent)
      newErrors.experienceContent = "Experience content is required.";
    if (!sugestionContent)
      newErrors.sugestionContent = "Suggestion content is required.";
    if (!salaryRating)
      newErrors.salaryRating = "Salary & benefits rating is required.";
    if (!trainingRating)
      newErrors.trainingRating = "Training & learning rating is required.";
    if (!careRating) newErrors.careRating = "Care rating is required.";
    if (!cultureRating) newErrors.cultureRating = "Culture rating is required.";
    if (!officeRating) newErrors.officeRating = "Office rating is required.";
    if (isYes === undefined) newErrors.isYes = "Recommendation is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      Review({
        data: {
          salaryRating,
          trainingRating,
          careRating,
          cultureRating,
          officeRating,
          summaryContent,
          reviewContent,
          reasonContent: "",
          experienceContent,
          suggestionContent: sugestionContent,
          recommened: isYes,
          companyId: Number(CompanyId),
        },
      });
    }


  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}></div>
        <div className={classes.main3}>
          <div className={classes.main4} style={{ marginBottom: "20px" }}>
            <div className={classes.main5}>
              <div className={classes.iconback}>
                <ArrowBackIosNewOutlinedIcon
                  sx={{ width: "20px", height: "20px", color: "#000000" }}
                />
                <Typography
                  sx={{
                    display: "flex",
                    color: "#000000",
                    textAlign: "center",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                    width: "100px",
                    justifyContent: "center",
                  }}
                  onClick={handleGoBack}
                >
                  Back
                </Typography>
              </div>
            </div>
            <div className={classes.main6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Căn giữa theo chiều dọc
                }}
              >
                {/* Phần chữ "it" */}
                <Box
                  sx={{
                    backgroundColor: "#3cbc8c",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "22px",
                    fontFamily: "Lexend, sans-serif",
                    lineHeight: "1",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "3px",
                  }}
                >
                  A
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "22px",
                    fontFamily: "Lexend, sans-serif",
                    lineHeight: "1.5",
                  }}
                >
                  mazingJob
                </Typography>
              </Box>
            </div>
          </div>
        </div>
        <section className={classes.section}>
          <div className={classes.main7}>
            <div className={classes.main8}>
              <div className={classes.left}>
                <div className={classes.main9}>
                  <Typography
                    variant="h2"
                    sx={{
                      marginBottom: "8px !important",
                      color: "#121212 !important",
                      lineHeight: 1.5,
                      fontSize: "22px",
                      fontWeight: 700,
                      marginTop: 0,
                      boxSizing: "border-box",
                      fontFamily: "Lexend, sans-serif",
                    }}
                  >
                    {companyDataa?.companyName}
                  </Typography>
                  <p className={classes.p}>
                    Your opinion review will be very helpful for the Developer
                    community who are looking for a job.
                  </p>
                  <form className={classes.form} onSubmit={handleReview}>
                    <div className={classes.main10}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px !important",
                          color: "#121212 !important",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                          marginTop: 0,
                          boxSizing: "border-box",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Summary Content
                      </Typography>
                    </div>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <input
                          type="text"
                          value={summaryContent}
                          className={` ${
                            isActive ? classes.inputhover : classes.input
                          }`}
                          required={true}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onChange={(e) => setSummaryContent(e.target.value)}
                        />
                        {errors.summaryContent && (
                          <p className={classes.error}>
                            {errors.summaryContent}
                          </p>
                        )}
                        <label
                          htmlFor=""
                          className={`${
                            isActive ? classes.labelhover : classes.label
                          }`}
                        >
                          {"Summary "}
                          <span className={classes.spanre}>*</span>
                        </label>
                      </div>
                    </div>
                    <div className={classes.main13}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px !important",
                          color: "#121212 !important",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                          marginTop: 0,
                          boxSizing: "border-box",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        {"What your review? "}

                        <span className={classes.spanre}>*</span>
                      </Typography>
                      <textarea
                        name=""
                        value={reviewContent}
                        className={`${
                          isActive3 ? classes.textareahover : classes.textarea
                        }`}
                        placeholder="Input your Review"
                        id=""
                        onChange={(e) => setReviewContent(e.target.value)}
                        onFocus={handleFocusReview}
                        onBlur={handleBlurReview}
                        required={true}
                      ></textarea>
                      {errors.reviewContent && (
                        <p className={classes.error}>{errors.reviewContent}</p>
                      )}
                    </div>
                    <div className={classes.main13}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px !important",
                          color: "#121212 !important",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                          marginTop: 0,
                          boxSizing: "border-box",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        {"What make you feel happy when working here? "}

                        <span className={classes.spanre}>*</span>
                      </Typography>
                      <textarea
                        name=""
                        value={experienceContent}
                        className={`${
                          isActive1 ? classes.textareahover : classes.textarea
                        }`}
                        placeholder="Input your experience"
                        id=""
                        onChange={(e) => setExperienceContent(e.target.value)}
                        onFocus={handleFocusExperience}
                        onBlur={handleBlurExperience}
                        required={true}
                      ></textarea>
                      {errors.experienceContent && (
                        <p className={classes.error}>
                          {errors.experienceContent}
                        </p>
                      )}
                    </div>
                    <div className={classes.main13}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px !important",
                          color: "#121212 !important",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                          marginTop: 0,
                          boxSizing: "border-box",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        {"Sugerstion for the company improvement "}

                        <span className={classes.spanre}>*</span>
                      </Typography>
                      <textarea
                        name=""
                        value={sugestionContent}
                        className={`${
                          isActive2 ? classes.textareahover : classes.textarea
                        }`}
                        placeholder="Input your Sugestion"
                        id=""
                        onChange={(e) => setSugestionContent(e.target.value)}
                        onFocus={handleFocusSugestion}
                        required={true}
                        onBlur={handleBlurSugestion}
                      ></textarea>
                      {errors.sugestionContent && (
                        <p className={classes.error}>
                          {errors.sugestionContent}
                        </p>
                      )}
                    </div>

                    <div className={classes.main14}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px !important",
                          color: "#121212 !important",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                          marginTop: 0,
                          boxSizing: "border-box",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        {"Rating detail "}

                        <span className={classes.spanre}>*</span>
                      </Typography>
                      <div className={classes.main144}>
                        <div className={classes.main15}>
                          <div className={classes.main16}>
                            Salary & benefits
                          </div>
                          <div className={classes.main17}>
                            <div className={classes.main18}>
                              <div className={classes.main19}>
                                <InteractiveRating
                                  initialValue={0}
                                  max={5}
                                  onChange={handleRatingChange}
                                />
                                {errors.salaryRating && (
                                  <p className={classes.error}>
                                    {errors.salaryRating}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={classes.main144}>
                        <div className={classes.main15}>
                          <div className={classes.main16}>
                            Training & learning
                          </div>
                          <div className={classes.main17}>
                            <div className={classes.main18}>
                              <div className={classes.main19}>
                                <InteractiveRating
                                  initialValue={0}
                                  max={5}
                                  onChange={handleTrainingRating}
                                />
                                {errors.trainingRating && (
                                  <p className={classes.error}>
                                    {errors.trainingRating}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={classes.main144}>
                        <div className={classes.main15}>
                          <div className={classes.main16}>
                            Management cares about me
                          </div>
                          <div className={classes.main17}>
                            <div className={classes.main18}>
                              <div className={classes.main19}>
                                <InteractiveRating
                                  initialValue={0}
                                  max={5}
                                  onChange={handleCareRating}
                                />
                                {errors.careRating && (
                                  <p className={classes.error}>
                                    {errors.careRating}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={classes.main144}>
                        <div className={classes.main15}>
                          <div className={classes.main16}>Culture & fun</div>
                          <div className={classes.main17}>
                            <div className={classes.main18}>
                              <div className={classes.main19}>
                                <InteractiveRating
                                  initialValue={0}
                                  max={5}
                                  onChange={handleCultureRating}
                                />
                                {errors.cultureRating && (
                                  <p className={classes.error}>
                                    {errors.cultureRating}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={classes.main144}>
                        <div className={classes.main15}>
                          <div className={classes.main16}>
                            Office & workspace
                          </div>
                          <div className={classes.main17}>
                            <div className={classes.main18}>
                              <div className={classes.main19}>
                                <InteractiveRating
                                  initialValue={0}
                                  max={5}
                                  onChange={handleOfficeRating}
                                />
                                {errors.officeRating && (
                                  <p className={classes.error}>
                                    {errors.officeRating}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.main20}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px !important",
                          color: "#121212 !important",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                          marginTop: 0,
                          boxSizing: "border-box",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        {
                          "Do you want to recommend this company to your friends "
                        }

                        <span className={classes.spanre}>*</span>
                      </Typography>
                      <div className={classes.main21}>
                        <label htmlFor="" className={classes.label1}>
                          <input
                            type="radio"
                            id="recommend-yes"
                            name="recommendation"
                            className={classes.radio}
                            onChange={() => handleRecommendationChange(true)}
                          />
                          <span
                            className={isYes ? classes.span1 : classes.span}
                            onClick={() => handleRecommendationChange(true)}
                          >
                            {" Yes"}
                          </span>
                        </label>
                        <br />
                        <label htmlFor="" className={classes.label2}>
                          <input
                            type="radio"
                            id="recommend-no"
                            name="recommendation"
                            className={classes.radio}
                            style={{ display: "none" }}
                            onChange={() => handleRecommendationChange(false)}
                          />
                          <span
                            className={
                              isYes === false ? classes.span1 : classes.span
                            }
                            onClick={() => handleRecommendationChange(false)}
                          >
                            {" No"}
                          </span>
                        </label>
                        {errors.isYes && (
                          <p className={classes.error}>{errors.isYes}</p>
                        )}
                      </div>
                    </div>
                    <button className={classes.button} type="submit">
                      Send Review
                    </button>
                  </form>
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes.main23}>
                  <div className={classes.main24}>
                    <Typography
                      variant="h2"
                      sx={{
                        padding: 0,
                        border: "none",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#121212 !important",
                        fontFamily: "Lexend, sans-serif",
                      }}
                    >
                      Review Guidelines & conditions
                    </Typography>
                  </div>
                  <div className={classes.main25}>
                    <p className={classes.p1}>
                      {
                        "In order for a review to be displayed on the website, it must adhere to the Guidelines & Conditions for reviews."
                      }
                    </p>
                    <p className={classes.p2}>Please ensure that:</p>
                    <ul className={classes.ul}>
                      <li className={classes.li}>
                        Do not use offensive or derogatory language
                      </li>
                      <li className={classes.li}>
                        Do not provide personal information
                      </li>
                      <li className={classes.li}>
                        Do not provide confidential or proprietary business
                        information
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
