import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { PutUser } from "../Services/UserJobPostActivity/PutUser";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import { AnimatePresence } from "framer-motion";
import ModalOff from "../components/ModalOff";
import classes from "./Settings.module.css";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [pendingUpdate, setPendingUpdate] = useState<boolean | null>(null); // Trạng thái cần cập nhật sau khi modal đóng

  const userId = localStorage.getItem("userId");

  const { data: UserProfile, isLoading } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  useEffect(() => {
    if (UserProfileData) {
      setNotificationsEnabled(UserProfileData.isLookingForJob || false);
    }
  }, [UserProfileData]);

  const { mutate } = useMutation({
    mutationFn: PutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile"], refetchType: "active" });
      queryClient.invalidateQueries({ queryKey: ["JobSeekerRole"], refetchType: "active" });
      queryClient.invalidateQueries({ queryKey: ["UserProfile"], refetchType: "active" });
      message.success("Notification settings updated successfully");
    },
    onError: () => {
      message.error("You need to update Your full Profile");
    },
  });

  const handleCheckboxChange = () => {
    const updatedValue = !notificationsEnabled;

    if (!updatedValue) {
     
      setPendingUpdate(updatedValue); 
      setOpenModal(true); 
    } else {
   
      setNotificationsEnabled(updatedValue);
      mutate({
        data: {
          firstName: UserProfileData?.firstName,
          lastName: UserProfileData?.lastName,
          email: UserProfileData?.email || "",
          phoneNumber: UserProfileData?.phoneNumber || null,
          isLookingForJob: updatedValue,
        },
      });
    }
  };

  const handleConfirmModal = () => {
    
    setNotificationsEnabled(pendingUpdate as boolean); 
    setOpenModal(false);

  
    mutate({
      data: {
        firstName: UserProfileData?.firstName,
        lastName: UserProfileData?.lastName,
        email: UserProfileData?.email || "",
        phoneNumber: UserProfileData?.phoneNumber || null,
        isLookingForJob: pendingUpdate,
      },
    });
    setPendingUpdate(null); 
  };

  const handleCloseModal = () => {
   
    setOpenModal(false);
    setPendingUpdate(null); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!UserProfileData) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className={classes.main}>
      <AnimatePresence>
        {openModal && (
          <ModalOff
            onClose={handleCloseModal} // Đóng modal
            onConfirm={handleConfirmModal} // Xác nhận trong modal
          />
        )}
      </AnimatePresence>

      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <Typography
                variant="h2"
                sx={{
                  marginBottom: ".5rem",
                  lineHeight: 1.5,
                  fontSize: "22px",
                  fontWeight: 700,
                  boxSizing: "border-box",
                }}
              >
                My Account
              </Typography>
              <hr className={classes.hr} />
              <div className={classes.main5}>
                <Typography
                  variant="h3"
                  sx={{
                    marginBottom: "1rem",
                    lineHeight: 1.5,
                    fontSize: "18px",
                    fontWeight: 700,
                    boxSizing: "border-box",
                  }}
                >
                  General Information
                </Typography>
                <div className={classes.main6}>
                  <div className={classes.main7}>Email:</div>
                  <div className={classes.main8}>
                    <div className={classes.main9}>
                      <span className={classes.span}>
                        {UserProfileData?.email || "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.main10}>
                  <div className={classes.main11}>Your Name:</div>
                  <div className={classes.main12}>
                    <div className={classes.main9}>
                      <span className={classes.span}>
                        {`${UserProfileData?.firstName || ""} ${
                          UserProfileData?.lastName || ""
                        }`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.main10}>
                  <div className={classes.main11}>Your Phone Number:</div>
                  <div className={classes.main12}>
                    <div className={classes.main9}>
                      <span className={classes.span}>
                        {UserProfileData?.phoneNumber || "No Phone Number Yet"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.main13}>
              <div className={classes.main14}>
                <div className={classes.main15}>
                  <Typography
                    variant="h2"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "22px",
                      fontWeight: 700,
                      marginTop: 0,
                      marginBottom: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    Job Invitation Notifications
                  </Typography>
                </div>
                <hr className={classes.hr} />
                <div className={classes.main16}>
                  <div className={classes.main17}>
                    <p className={classes.p}>
                      Allow to receive job invitations from employers:
                    </p>
                    <small className={classes.small}>By text emails</small>
                  </div>
                  <div className={classes.main18}>
                    <label className={classes.label}>
                      <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={handleCheckboxChange}
                        className={classes.input}
                      />
                      <div
                        className={
                          notificationsEnabled
                            ? classes.main19
                            : classes.main20
                        }
                      ></div>
                    </label>
                    <label className={classes.label1}>
                      {notificationsEnabled ? "Yes" : "No"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
