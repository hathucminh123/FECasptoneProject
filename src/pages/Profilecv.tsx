import React, { useEffect, useState } from "react";
import classes from "./Profilecv.module.css";
import { Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AnimatePresence, motion } from "framer-motion";
// import { renderButton } from "../components/RenderButton";
import RenderButton from "../components/RenderButton";
// import Image from "./../assets/image/minh.jpg";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CardProfile from "../components/CardProfile";
import ModalChildren from "../components/ModalChildren";
import AboutMe from "../components/AboutMe";
import Education from "../components/Education";
import WorkExperience from "../components/WorkExperience";
import PersonalProject from "../components/PersonalProject";
// import Certificates from "../components/Certificates";
import { useQuery } from "@tanstack/react-query";
import { fetchEducationDetails } from "../Services/EducationDetails/GetEducationDetails";
import CardExperience from "../components/CardExperience";
import { fetchExperienceDetails } from "../Services/ExperienceDetailService/GetExperienceDetail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardSkill from "../components/CardSkill";
// import { GetSkillSets } from "../Services/SkillSet/GetSkillSet";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { useNavigate } from "react-router-dom";
import GradientCircularProgress from "../components/GradientCircularProgress";
// import { useNavigate } from "react-router-dom";
export default function Profilecv() {
  const [more, setMore] = useState<boolean>(false);
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] =
    useState<boolean>(false);
  const [isCreatingNewChallenge1, setIsCreatingNewChallenge1] =
    useState<boolean>(false);
  const [isCreatingNewChallenge2, setIsCreatingNewChallenge2] =
    useState<boolean>(false);
  const [isCreatingNewChallenge3, setIsCreatingNewChallenge3] =
    useState<boolean>(false);

  const [isCreatingNewChallenge4, setIsCreatingNewChallenge4] =
    useState<boolean>(false);
  const userId = localStorage.getItem("userId");

  const [percent,setPercent]=useState<number>(0)

  // const [isCreatingNewChallenge5, setIsCreatingNewChallenge5] =
  // useState<boolean>(false);
  console.log("why", isCreatingNewChallenge);
  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  // function handleStartAddNewChallenge1() {
  //   setIsCreatingNewChallenge1(true);
  // }

  function handleDone1() {
    setIsCreatingNewChallenge1(false);
  }

  function handleStartAddNewChallenge2() {
    setIsCreatingNewChallenge2(true);
  }

  function handleDone2() {
    setIsCreatingNewChallenge2(false);
  }

  function handleStartAddNewChallenge3() {
    setIsCreatingNewChallenge3(true);
  }

  function handleDone3() {
    setIsCreatingNewChallenge3(false);
  }

  function handleStartAddNewChallenge4() {
    setIsCreatingNewChallenge4(true);
  }

  function handleDone4() {
    setIsCreatingNewChallenge4(false);
  }

  // function handleStartAddNewChallenge5() {
  //   setIsCreatingNewChallenge5(true);
  // }

  // function handleDone5() {
  //   setIsCreatingNewChallenge5(false);
  // }

  interface data {
    // icon: JSX.Element,
    icon: React.ElementType;
    text: string | number;
  }

  // const dummydata: data[] = [
  //   { icon: MailOutlinedIcon, text: "Your Email" },
  //   { icon: LocalPhoneOutlinedIcon, text: "Your phone number" },
  //   { icon: CardGiftcardOutlinedIcon, text: "Your date of birth" },
  //   { icon: PersonOutlineOutlinedIcon, text: "Your gender" },
  //   { icon: LocationOnOutlinedIcon, text: "Your current address" },
  //   { icon: LanguageOutlinedIcon, text: "Your personal link" },
  // ];
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/cv-templates");
  };
  const handleonclick = () => {
    setMore((prev) => !prev);
  };

  const { data } = useQuery({
    queryKey: ["EducationDetails"],
    queryFn: ({ signal }) => fetchEducationDetails({ signal: signal }),
    staleTime: 5000,
  });
  const { data: ExperienceData } = useQuery({
    queryKey: ["ExperienceDetails"],
    queryFn: ({ signal }) => fetchExperienceDetails({ signal: signal }),
    staleTime: 5000,
  });
  // const { data: SkillSetData } = useQuery({
  //   queryKey: ["SkillSetDetails"],
  //   queryFn: ({ signal }) => GetSkillSets({ signal: signal }),
  //   staleTime: 1000,
  // });

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;
  const EducationData = data?.EducationDetails;
  // console.log('meme',data?.EducationDetails)
  const ExperienceDatas = ExperienceData?.ExperienceDetails;
  const dummydata: data[] = [
    {
      icon: MailOutlinedIcon,
      text: UserProfileData?.email ? UserProfileData?.email : "Your Email",
    },
    {
      icon: LocalPhoneOutlinedIcon,
      text: UserProfileData?.phoneNumber
        ? UserProfileData?.phoneNumber
        : "Your phone number",
    },
    // { icon: CardGiftcardOutlinedIcon, text: "Your date of birth" },
    // { icon: PersonOutlineOutlinedIcon, text: "Your gender" },
    // { icon: LocationOnOutlinedIcon, text: "Your current address" },
    // { icon: LanguageOutlinedIcon, text: "Your personal link" },
  ];
  // const navigate= useNavigate()

  // const handleNavigate =()=>{
  //   navigate('cv-templates')
  // }
  // const SkillSetDatas = SkillSetData?.SkillSets;

  useEffect(() => {
    let newPercent = 0;
  
    if (UserProfileData) {
      if (UserProfileData.educationDetails.length > 0) {
        newPercent += 33.3;
      }
      if (UserProfileData.experienceDetails.length > 0) {
        newPercent += 33.3;
      }
      if (UserProfileData.skillSets.length > 0) {
        newPercent += 33.3;
      }
      if(UserProfileData.educationDetails.length > 0 && UserProfileData.experienceDetails.length > 0 &&UserProfileData.skillSets.length > 0){
        newPercent=100
      }
    }
  
    setPercent(newPercent);
  }, [UserProfileData]);


  return (
    <div className={classes.icontainer}>
      <div className={classes.container}>
        <div className={classes.containerleft}>
          <div className={classes.containerscroll}>
            <div className={classes.content}>
              <div className={classes.main10}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#121212",
                    lineHeight: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}
                >
                  Profile Strength
                </Typography>

                <GradientCircularProgress percentage={percent}/>
              </div>
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
                  Upgrade profile to "Excellent" to  Download CV
                </Typography>

                <div className={classes.updateprofile}>
                  <div className={classes.updateul}>
                    <div className={classes.button1}>
                      <div className={classes.button2}>
                        <div
                          className={classes.button3}
                          onClick={() => setIsCreatingNewChallenge(true)}
                        >
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
                              fontFamily: "Lexend, sans-serif",
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
                        <div
                          onClick={() => setIsCreatingNewChallenge3(true)}
                          className={classes.button3}
                        >
                          <div className={classes.iconadd}>
                            <AddCircleOutlineOutlinedIcon
                              sx={{
                                width: "16px",
                                fontFamily: "Lexend, sans-serif",
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
                              fontFamily: "Lexend, sans-serif",
                              fontSize: "16px",
                              fontWeight: 400,
                              "&:hover": {
                                color: "#3442c6",
                              },
                            }}
                          >
                            Work Experience
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={classes.button1}>
                      <div className={classes.button2}>
                        <div
                          onClick={() => setIsCreatingNewChallenge2(true)}
                          className={classes.button3}
                        >
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
                              fontFamily: "Lexend, sans-serif",
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
                              <div
                                onClick={() => setIsCreatingNewChallenge4(true)}
                                className={classes.button3}
                              >
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
                                    fontFamily: "Lexend, sans-serif",
                                    "&:hover": {
                                      color: "#3442c6",
                                    },
                                  }}
                                >
                                  SkillsSet
                                </Typography>
                              </div>
                            </div>
                          </div>
                          {/* <div className={classes.button1}>
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
                          </div> */}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      onClick={handleonclick}
                      className={classes.morecontent}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#414042",
                          lineHeight: 1.5,
                          fontSize: "16px",
                          fontWeight: 400,
                          fontFamily: "Lexend, sans-serif",
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
                    fontFamily: "Lexend, sans-serif",
                  }}
                >
                  Explore CV templates and download your CV
                </Typography>
              </div>
              <div className={classes.btnform}>
                <RenderButton
                  text="Preview & Download CV"
                  color="#ed1b2f"
                  variant="contained"
                  sxOverrides={{ minWidth: "300px" }}
                  onClick={handleNavigate}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.containerRight}>
          <div className={classes.main}>
            <div className={classes.main1}>
              <div className={classes.main2}>
                <div className={classes.img}>
                  {/* <img
                    src={Image}
                    alt="profile image"
                    style={{
                      verticalAlign: "middle",
                      width: "120px",
                      height: "120px",
                      aspectRatio: "auto 120/120",
                      borderRadius: "50%",
                    }}
                  /> */}
                </div>
                <div className={classes.main3}>
                  <Typography
                    sx={{
                      textAlign: "start",
                      color: "#121212",
                      lineHeight: 1.5,
                      fontSize: "28px",
                      fontWeight: 700,
                      fontFamily: "Lexend, sans-serif",
                    }}
                  >
                    {UserProfileData?.firstName} {UserProfileData?.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "start",
                      color: "#a6a6a6 ",
                      lineHeight: 1.5,
                      fontSize: "18px",
                      fontWeight: 700,
                      marginTop: ".5rem",
                      fontFamily: "Lexend, sans-serif",
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
                              fontFamily: "Lexend, sans-serif",
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
              <div
                className={classes.mainab}
                onClick={handleStartAddNewChallenge}
              >
                <EditNoteOutlinedIcon />
              </div>
            </div>
          </div>
          {/* <CardProfile
            title="About Me"
            text="Highlight detailed information about your job history"
            icon={<EditNoteOutlinedIcon />}
            img="https://itviec.com/assets/profile/experience_no_info-c25e08f6ba4db4a16e0b948d42a90451c7895790324da6420ffeba9525c9c6eb.svg"
            onClick={handleStartAddNewChallenge1}
          /> */}
          <CardProfile
            title="Education"
            text="Highlight detailed information about your job history"
            icon={<EditNoteOutlinedIcon />}
            icon2={<AddCircleOutlineIcon sx={{ color: "red" }} />}
            img="https://itviec.com/assets/profile/experience_no_info-c25e08f6ba4db4a16e0b948d42a90451c7895790324da6420ffeba9525c9c6eb.svg"
            onClick={handleStartAddNewChallenge2}
            data={EducationData}
          />
          <CardExperience
            title="Work Experience"
            text="Highlight detailed information about your job history"
            icon={<EditNoteOutlinedIcon />}
            icon2={<AddCircleOutlineIcon sx={{ color: "red" }} />}
            img="https://itviec.com/assets/profile/experience_no_info-c25e08f6ba4db4a16e0b948d42a90451c7895790324da6420ffeba9525c9c6eb.svg"
            onClick={handleStartAddNewChallenge3}
            data={ExperienceDatas}
          />
          {/* <CardSkill
            title="Skills"
            text="Highlight detailed information about your job history"
            icon={<EditNoteOutlinedIcon />}
            icon2={<AddCircleOutlineIcon sx={{color:'red'}} />}
            img="https://itviec.com/assets/profile/skill_no_info-02f56fa0a5b0ab2ae7d233ceac098f1102a4f774de22f70b0c81fd8e1fb9efbf.svg"
          /> */}
          <CardSkill
            title="Skills"
            text="Highlight Your skills Set"
            icon2={<AddCircleOutlineIcon sx={{ color: "red" }} />}
            icon={<EditNoteOutlinedIcon />}
            img="https://itviec.com/assets/profile/project_no_info-393d7f7ad578814bcce189f5681ba7e90f6a33343cdb0172eb9761ece4094b5d.svg"
            onClick={handleStartAddNewChallenge4}
            data={UserProfileData?.skillSets}
          />
          {/* <CardProfile
            title="Certificates"
            text="Highlight detailed information about your job history"
            icon={<EditNoteOutlinedIcon />}
            img="https://itviec.com/assets/profile/certificate_no_info-26fedfa95c272adfe65f1136c3c04973002bea978cc21f91d04f7ce81caeda3f.svg"
            onClick={handleStartAddNewChallenge5}
          /> */}
        </div>
      </div>
      <AnimatePresence>
        {isCreatingNewChallenge && <ModalChildren onDone={handleDone} />}
      </AnimatePresence>

      <AnimatePresence>
        {isCreatingNewChallenge1 && <AboutMe onDone={handleDone1} />}
      </AnimatePresence>

      <AnimatePresence>
        {isCreatingNewChallenge2 && <Education onDone={handleDone2} />}
      </AnimatePresence>
      <AnimatePresence>
        {isCreatingNewChallenge3 && <WorkExperience onDone={handleDone3} />}
      </AnimatePresence>

      <AnimatePresence>
        {isCreatingNewChallenge4 && <PersonalProject onDone={handleDone4} />}
      </AnimatePresence>

      {/* <AnimatePresence>
        {isCreatingNewChallenge5 && <Certificates onDone={handleDone5} />}
      </AnimatePresence> */}
    </div>
  );
}
