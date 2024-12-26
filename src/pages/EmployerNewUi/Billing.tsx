import React from "react";
import classes from "./Billing.module.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
// import { GetPaymentSubsciption } from "../../Services/PaymentSubscription/PaymentSubscription";
// import moment from "moment";
const Billing: React.FC = () => {
  const userId = localStorage.getItem("userId");

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  // const { data: GetSubscriptions } = useQuery({
  //   queryKey: ["Payment"],
  //   queryFn: ({ signal }) =>
  //     GetPaymentSubsciption({ id: Number(userId), signal: signal }),
  //   staleTime: 1000,
  // });

  // const PaymentSubscription = GetSubscriptions?.Subscriptions;

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <Link to="" className={classes.link}></Link>
      </div>

      <div className={classes.main2}>
        <div className={classes.main3}>
          <div className={classes.main4}>
            <Typography
              variant="h1"
              sx={{
                display: "inline-block",
                color: "#050c26",
                margin: 0,
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "30px",
                padding: 0,
              }}
            >
              Billing
            </Typography>
          </div>
        </div>
        <div className={classes.main5}>
          <div className={classes.main6}>
            <div className={classes.main7}>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: ".75rem",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
              >
                Transactions
              </Typography>
              <div className={classes.main8}>
                {UserProfileData?.userAccountServices?.map((item, index) => {
                  // const subscriptionDate = moment(item.subscriptionDate);
                  // const expiredDate = moment(item.expiredDate);
                  // const remainingDays = expiredDate.diff(
                  //   subscriptionDate,
                  //   "days"
                  // );
                  return (
                    <div
                      key={index}
                      className={classes.table}
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                    >
                      <div className={classes.dateInfo}>
                        <span className={classes.label}>{item.serviceResponse.name}:</span>
                        <span className={classes.date}>
                          {/* {moment(item.subscriptionDate).format("DD-MM-YYYY")} */}
                        </span>
                        {/* <span className={classes.separator}> - </span>
                        <span className={classes.label}>ExpiredDate:</span>
                        <span className={classes.date}>
                          {moment(item.expiredDate).format("DD-MM-YYYY")}
                        </span> */}
                        <span className={classes.days}>
                          ({item.numberOfPostLeft} Post Lefts)
                        </span>
                      </div>
                      <div className={classes.tablee}>
                        <div className={classes.header}>
                          <div className={classes.serviceTitle}>Name User</div>
                          <div className={classes.quantity}>PaymentAmount</div>
                          {/* <div className={classes.duration}>Thời gian</div>
                        <div className={classes.activated}>Đã kích hoạt</div>
                        <div className={classes.notActivated}>
                          Chưa kích hoạt
                        </div> */}
                        </div>
                        <div className={classes.row}>
                          <div className={classes.serviceTitle}>
                            {UserProfileData?.firstName}{" "}
                            {UserProfileData?.lastName}
                          </div>
                          <div className={classes.quantity}>
                            {item.serviceResponse.price} VND
                          </div>
                          {/* <div className={classes.duration}>4 Tuần</div>
                        <div className={classes.activated}>2 Tin</div>
                        <div className={classes.notActivated}>8 Tin</div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Billing;
