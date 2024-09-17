import React, { useState } from "react";
import classes from "./Profilecv.module.css";
import { Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { renderButton } from "../components/RenderButton";
import Image from "./../assets/image/minh.jpg";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CardProfile from "../components/CardProfile";
import ModalChildren from "../components/ModalChildren";
export default function Profilecv() {
  const [more, setMore] = useState<boolean>(false);
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState<boolean>(false);
console.log('why',isCreatingNewChallenge)
  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }


  interface data {
    // icon: JSX.Element,
    icon: React.ElementType;
    text: string | number;
  }

  const dummydata: data[] = [
    { icon: MailOutlinedIcon, text: "Your Email" },
    { icon: LocalPhoneOutlinedIcon, text: "Your phone number" },
    { icon: CardGiftcardOutlinedIcon, text: "Your date of birth" },
    { icon: PersonOutlineOutlinedIcon, text: "Your gender" },
    { icon: LocationOnOutlinedIcon, text: "Your current address" },
    { icon: LanguageOutlinedIcon, text: "Your personal link" },
  ];

  const handleonclick = () => {
    setMore((prev) => !prev);
  };

  return (
    <div className={classes.icontainer}>
    <div className={classes.container}>
      <div className={classes.containerleft}>
        <div className={classes.containerscroll}>
          <div className={classes.content}>
            <div style={{ display: "block" }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#121212",
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Upgrade profile to "Excellent" to unlock Download CV
              </Typography>

              <div className={classes.updateprofile}>
                <div className={classes.updateul}>
                  <div className={classes.button1}>
                    <div className={classes.button2}>
                      <div className={classes.button3}>
                        <div className={classes.iconadd}>
                          <AddCircleOutlineOutlinedIcon
                            sx={{
                              width: "16px",
                              height: "16px",
                              color: "#0e2eed",
                              marginRight: "4px",
                            }}
                          />
                        </div>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#0e2eed",
                            lineHeight: 1.5,
                            fontSize: "16px",
                            fontWeight: 400,
                            "&:hover": {
                              color: "#3442c6",
                            },
                          }}
                        >
                          Add Contact Information
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={classes.button1}>
                    <div className={classes.button2}>
                      <div className={classes.button3}>
                        <div className={classes.iconadd}>
                          <AddCircleOutlineOutlinedIcon
                            sx={{
                              width: "16px",
                              height: "16px",
                              color: "#0e2eed",
                              marginRight: "4px",
                            }}
                          />
                        </div>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#0e2eed",
                            lineHeight: 1.5,
                            fontSize: "16px",
                            fontWeight: 400,
                            "&:hover": {
                              color: "#3442c6",
                            },
                          }}
                        >
                          About me
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={classes.button1}>
                    <div className={classes.button2}>
                      <div className={classes.button3}>
                        <div className={classes.iconadd}>
                          <AddCircleOutlineOutlinedIcon
                            sx={{
                              width: "16px",
                              height: "16px",
                              color: "#0e2eed",
                              marginRight: "4px",
                            }}
                          />
                        </div>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#0e2eed",
                            lineHeight: 1.5,
                            fontSize: "16px",
                            fontWeight: 400,
                            "&:hover": {
                              color: "#3442c6",
                            },
                          }}
                        >
                          Education
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {more && (
                      <motion.div
                        style={{ display: "block" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto ", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className={classes.button1}>
                          <div className={classes.button2}>
                            <div className={classes.button3}>
                              <div className={classes.iconadd}>
                                <AddCircleOutlineOutlinedIcon
                                  sx={{
                                    width: "16px",
                                    height: "16px",
                                    color: "#0e2eed",
                                    marginRight: "4px",
                                  }}
                                />
                              </div>
                              <Typography
                                variant="h4"
                                sx={{
                                  color: "#0e2eed",
                                  lineHeight: 1.5,
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  "&:hover": {
                                    color: "#3442c6",
                                  },
                                }}
                              >
                                Add Certificates
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className={classes.button1}>
                          <div className={classes.button2}>
                            <div className={classes.button3}>
                              <div className={classes.iconadd}>
                                <AddCircleOutlineOutlinedIcon
                                  sx={{
                                    width: "16px",
                                    height: "16px",
                                    color: "#0e2eed",
                                    marginRight: "4px",
                                  }}
                                />
                              </div>
                              <Typography
                                variant="h4"
                                sx={{
                                  color: "#0e2eed",
                                  lineHeight: 1.5,
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  "&:hover": {
                                    color: "#3442c6",
                                  },
                                }}
                              >
                                Add Personal Projects
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div onClick={handleonclick} className={classes.morecontent}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#414042",
                        lineHeight: 1.5,
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      {more ? "Show less" : "Add more information"}
                    </Typography>

                    <motion.span
                      className="challenge-item-details-icon"
                      animate={{ rotate: more ? 0 : 180 }}
                    >
                      &#9650;
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.separator}></div>
            <div className={classes.cvform}>
              <img
                src="https://itviec.com/assets/profile/cv-d4db00ef4c885c25e437715236babd64c7cbb960ddf4771e69e55dd8169dd5ba.svg"
                alt="CV image"
                style={{ verticalAlign: "middle" }}
              />
              <Typography
                variant="h4"
                sx={{
                  marginLeft: "12px",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Explore CV templates and download your CV
              </Typography>
            </div>
            <div className={classes.btnform}>
              {renderButton("Preview & Download CV", "#ed1b2f", "contained", {
                minWidth: "300px",
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.containerright}>
        <div className={classes.main}>
          <div className={classes.main1}>
            <div className={classes.main2}>
              <div className={classes.img}>
                <img
                  src={Image}
                  alt="profile image"
                  style={{
                    verticalAlign: "middle",
                    width: "120px",
                    height: "120px",
                    aspectRatio: "auto 120/120",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className={classes.main3}>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#121212",
                    lineHeight: 1.5,
                    fontSize: "28px",
                    fontWeight: 700,
                  }}
                >
                  Ha Thuc Minh
                </Typography>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#a6a6a6 ",
                    lineHeight: 1.5,
                    fontSize: "18px",
                    fontWeight: 700,
                    marginTop: ".5rem",
                  }}
                >
                  Your title
                </Typography>
                <div className={classes.separator}></div>
                <div className={classes.main4}>
                  {dummydata.map((data, index) => {
                    const IconComponent = data.icon; // Lấy component từ dữ liệu
                    return (
                      <div key={index} className={classes.main5}>
                        <div className={classes.main6}>
                          <IconComponent
                            sx={{
                              width: "16px",
                              height: "16px",
                              color: "#a6a6a6",
                            }}
                          />{" "}
                        </div>
                        <Typography
                          variant="h4"
                          sx={{
                            maxWidth: "17vw",
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#a6a6a6",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginLeft: ".5rem",
                          }}
                        >
                          {data.text}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={classes.mainab} onClick={handleStartAddNewChallenge}>
              <EditNoteOutlinedIcon />
            </div>
          </div>
        </div>
        <CardProfile
          title="About Me"
          text="Highlight detailed information about your job history"
          icon={<EditNoteOutlinedIcon />}
        />
        <CardProfile
          title="Education"
          text="Highlight detailed information about your job history"
          icon={<EditNoteOutlinedIcon />}
        />
        <CardProfile
          title="Work Experience"
          text="Highlight detailed information about your job history"
          icon={<EditNoteOutlinedIcon />}
          img="https://itviec.com/assets/profile/experience_no_info-c25e08f6ba4db4a16e0b948d42a90451c7895790324da6420ffeba9525c9c6eb.svg"
        />
        <CardProfile
          title="Skills"
          text="Highlight detailed information about your job history"
          icon={<EditNoteOutlinedIcon />}
          img="https://itviec.com/assets/profile/skill_no_info-02f56fa0a5b0ab2ae7d233ceac098f1102a4f774de22f70b0c81fd8e1fb9efbf.svg"
        />
        <CardProfile
          title="Personal Project"
          text="Highlight detailed information about your job history"
          icon={<EditNoteOutlinedIcon />}
          img="https://itviec.com/assets/profile/project_no_info-393d7f7ad578814bcce189f5681ba7e90f6a33343cdb0172eb9761ece4094b5d.svg"
        />
        <CardProfile
          title="Certificates"
          text="Highlight detailed information about your job history"
          icon={<EditNoteOutlinedIcon />}
          img="https://itviec.com/assets/profile/certificate_no_info-26fedfa95c272adfe65f1136c3c04973002bea978cc21f91d04f7ce81caeda3f.svg"
        />
    
      </div>
      
    </div>
    <AnimatePresence>
        {isCreatingNewChallenge && <ModalChildren onDone={handleDone} />}
      </AnimatePresence>
    </div>
  );
}
