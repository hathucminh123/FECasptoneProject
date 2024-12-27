import React from "react";
import { createPortal } from "react-dom";
import classes from "./EmployerServiceModal.module.css";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
// import { Payment } from "../../Services/Payment/Payment";
// import { message } from "antd";
// import { GetServicePayment } from "../../Services/ServicePayment/GetServicePayment";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";

// import { redirect, useNavigate } from "react-router-dom";
interface Services {
  id: number;
  name: string;
  numberOfPost: number;
  description: string;
  price: number;
}
interface Props {
  onClose?: () => void;
  setSelectService: React.Dispatch<
    React.SetStateAction<Services | null | undefined>
  >;
  setSelectServiceId: React.Dispatch<
    React.SetStateAction<number | null | undefined> 
  >;
}
export default function EmployerServiceModal({
  onClose,
  setSelectService,
  setSelectServiceId,
}: Props) {
  const modalRoot = document.getElementById("EmployerServiceModal");
  // const Email = localStorage.getItem("Email");
  const userId = localStorage.getItem("userId");
  //   const {
  //     data: SkillSetData,
  //     // isLoading,
  //     // isError,
  //   } = useQuery({
  //     queryKey: ["ServicePayment"],
  //     queryFn: ({ signal }) => GetServicePayment({ signal }),
  //     staleTime: 1000,
  //   });

  //   const skillSets = SkillSetData?.Services || [];
  const handleSelectService = (service: Services) => {
    setSelectService(service); // Set the selected service
    setSelectServiceId(service.id); // Set the selected service ID
    if (onClose) onClose(); // Close the modal after selection
  };

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  //   const { mutate } = useMutation({
  //     mutationFn: Payment,
  //     onSuccess: (data) => {
  //       // console.log("okchua", data.result);

  //       // message.success(`Payment successfully!`);

  //       // Mở đường link data.result trong tab mới
  //       // window.open(data.result, '_blank');

  //       // Nếu bạn muốn chuyển hướng người dùng đến link đó trong cùng tab, dùng:
  //       window.location.href = data.result;

  //       // redirect(data.result); // Nếu bạn cần gọi hàm này sau khi mở, hãy giữ lại.
  //     },
  //     onError: () => {
  //       message.error("Failed to Payment.");
  //     },
  //   });
  // const { mutate: Year } = useMutation({
  //   mutationFn: Payment,
  //   onSuccess: (data) => {
  //     // message.success(`Payment successfully!`);

  //     // Mở đường link data.result trong tab mới
  //     // window.open(data.result, '_blank');

  //     // Nếu bạn muốn chuyển hướng người dùng đến link đó trong cùng tab, dùng:
  //     window.location.href = data.result;

  //     // redirect(data.result); // Nếu bạn cần gọi hàm này sau khi mở, hãy giữ lại.
  //   },
  //   onError: () => {
  //     message.error("Failed to Payment.");
  //   },
  // });

  //   const handlePayment = (e: React.MouseEvent<HTMLButtonElement>,id:number) => {
  //     e.preventDefault();
  //     mutate({
  //       data: {
  //         orderType: id,
  //       },
  //     });
  //   };
  // const handlePaymentYear = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   Year({
  //     data: {
  //       orderType: 2,
  //     },
  //   });
  // };

  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div className={classes.backdrop} onClick={onClose ? onClose : undefined}>
      <motion.dialog
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        initial="hidden"
        animate="visible"
        // exit="hidden"
        // whileHover="hidden"
        open
        className={classes.modall}
      >
        <div className={classes.main}>
          <div className={classes.main1}>
            <button className={classes.button} onClick={onClose}>
              <svg viewBox="0 0 24 24" className={classes.svg}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M13.414 12l5.293-5.293a.999.999 0 10-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 10-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 101.414 1.414L12 13.414l5.293 5.293a.997.997 0 001.414 0 .999.999 0 000-1.414L13.414 12z"
                ></path>
              </svg>
            </button>
            <div className={classes.main2}>
              <div className={classes.main3}>
                <div className={classes.main4}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "36px",
                      lineHeight: "40px",
                      marginBottom: "24px",
                    }}
                  >
                    Post Job to find the best the best candidates
                  </Typography>
                  <div className={classes.main5}>
                    <p className={classes.p}>
                      Discover our professional tools for finding best
                      candidates. Save time and find the perfect fit for your
                      roles with our professional recruiting tools.
                    </p>
                  </div>
                </div>
                <div className={classes.main6}>
                  {UserProfileData?.userAccountServices &&
                  UserProfileData.userAccountServices.length > 0 ? (
                    UserProfileData?.userAccountServices.map((item) => (
                      <div key={item.id} className={classes.main7}>
                        <div className={classes.main8}>
                          <div className={classes.main9}>
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: 700,
                                fontSize: "100%",
                                margin: 0,
                                padding: 0,

                                boxSizing: "border-box",
                                borderWidth: 0,
                                borderStyle: "solid",
                              }}
                            >
                              {" "}
                              {item.serviceResponse.name}
                            </Typography>
                            <div className={classes.main10}>
                              {item.serviceResponse.description}
                            </div>
                            <Typography
                              variant="h3"
                              sx={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                marginBottom: "24px",
                                fontWeight: 400,
                                boxSizing: "border-box",
                                borderWidth: 0,
                                borderStyle: "solid",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  fontSize: "24px",
                                  lineHeight: "30px",
                                  boxSizing: "border-box",
                                  borderWidth: 0,
                                  borderStyle: "solid",
                                }}
                              >
                                {item.serviceResponse.price}/VNĐ
                              </span>
                            </Typography>
                            <p className={classes.p1}>Includes:</p>
                            <ul className={classes.ul}>
                              <li className={classes.li}>
                                <svg
                                  viewBox="0 0 24 24"
                                  className={classes.svg1}
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                    d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                                  ></path>
                                </svg>
                                Post {item.numberOfPostLeft} Jobs Left
                              </li>

                              <li className={classes.li}>
                                <svg
                                  viewBox="0 0 24 24"
                                  className={classes.svg1}
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                    d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                                  ></path>
                                </svg>
                                Review Applicants
                              </li>
                              <li className={classes.li}>
                                <svg
                                  viewBox="0 0 24 24"
                                  className={classes.svg1}
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                    d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                                  ></path>
                                </svg>
                                Quick Accept/Reject with Templates
                              </li>
                              <li className={classes.li}>
                                <svg
                                  viewBox="0 0 24 24"
                                  className={classes.svg1}
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                    d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                                  ></path>
                                </svg>
                                Advanced Applicant Filters
                              </li>
                            </ul>
                          </div>
                          <footer className={classes.footer}>
                            {/* {isPending ? (
                          <button
                            className={classes.button1}
                            // onClick={handlePayment}
                          >
                            wait a second...
                          </button>
                        ) : ( */}
                            <button
                              // className={classes.button1}
                              className={`${classes.button1} ${
                                item.numberOfPostLeft === 0
                                  ? classes.disabled
                                  : ""
                              }`}
                              // onClick={() =>handleSelectService(item.serviceResponse)}
                              type="button"
                              onClick={() => {
                                if (item.numberOfPostLeft > 0)
                                  handleSelectService(item.serviceResponse);
                              }}
                              disabled={
                                item.numberOfPostLeft === 0 ? true : false
                              }
                              style={{
                                pointerEvents:
                                  item.numberOfPostLeft === 0 ? "none" : "auto",
                                opacity: item.numberOfPostLeft === 0 ? 0.5 : 1,
                              }}
                            >
                              Select
                            </button>
                            {/* )} */}
                          </footer>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Typography className={classes.noServicesMessage}>
                      No service package yet.
                    </Typography>
                  )}
                  {/* <div className={classes.main7}>
                    <div className={classes.main8}>
                      <div className={classes.main9}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            fontSize: "100%",
                            margin: 0,
                            padding: 0,

                            boxSizing: "border-box",
                            borderWidth: 0,
                            borderStyle: "solid",
                          }}
                        >
                          {" "}
                          Access
                        </Typography>
                        <div className={classes.main10}>
                          Get Started posting Job
                        </div>
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            marginBottom: "24px",
                            fontWeight: 400,
                            boxSizing: "border-box",
                            borderWidth: 0,
                            borderStyle: "solid",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "24px",
                              lineHeight: "30px",
                              boxSizing: "border-box",
                              borderWidth: 0,
                              borderStyle: "solid",
                            }}
                          >
                            $20 / 6 month
                          </span>
                        </Typography>
                        <p className={classes.p1}>Includes:</p>
                        <ul className={classes.ul}>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Post Unlimited Jobs
                          </li>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Review Applicants
                          </li>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Quick Accept/Reject with Templates
                          </li>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Advanced Applicant Filters
                          </li>
                        </ul>
                      </div>
                      <footer className={classes.footer}>
                         {isPending ? (
                          <button
                            className={classes.button1}
                            // onClick={handlePayment}
                          >
                            wait a second...
                          </button>
                        ) : ( 
                        <button
                          className={classes.button1}
                          onClick={handlePayment}
                          type="button"
                        >
                          Upgrade
                        </button>
                         )} 
                      </footer>
                    </div>
                  </div> */}
                  {/* <div className={classes.main7}>
                    <div className={classes.main8}>
                      <div className={classes.main9}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            fontSize: "100%",
                            margin: 0,
                            padding: 0,

                            boxSizing: "border-box",
                            borderWidth: 0,
                            borderStyle: "solid",
                          }}
                        >
                          {" "}
                          Vip
                        </Typography>
                        <div className={classes.main10}>
                          Get Started posting Job
                        </div>
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            marginBottom: "24px",
                            fontWeight: 400,
                            boxSizing: "border-box",
                            borderWidth: 0,
                            borderStyle: "solid",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "24px",
                              lineHeight: "30px",
                              boxSizing: "border-box",
                              borderWidth: 0,
                              borderStyle: "solid",
                            }}
                          >
                            $40/years
                          </span>
                        </Typography>
                        <p className={classes.p1}>Includes:</p>
                        <ul className={classes.ul}>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Post Unlimited Jobs
                          </li>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Review Applicants
                          </li>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Quick Accept/Reject with Templates
                          </li>
                          <li className={classes.li}>
                            <svg viewBox="0 0 24 24" className={classes.svg1}>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5.91 10.496L3.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.493-.09l7-8a1 1 0 10-1.572-1.235L5.91 10.496z"
                              ></path>
                            </svg>
                            Advanced Applicant Filters
                          </li>
                        </ul>
                      </div>
                      <footer className={classes.footer}>
                        {isPendingYears ? (
                          <button
                            className={classes.button1}
                            // onClick={handlePayment}
                          >
                            wait a second...
                          </button>
                        ) : (
                          <button
                            className={classes.button1}
                            onClick={handlePaymentYear}
                            type="button"
                          >
                            Upgrade
                          </button>
                        )}
                      </footer>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.dialog>
    </div>,
    modalRoot
  );
}