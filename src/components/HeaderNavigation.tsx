import {
  Link,
  NavLink,
  // redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import classes from "./HeaderNavigation.module.css";
import React, { useEffect, useState } from "react";
// import { List, Menu, Divider, Typography, MenuItem } from "@mui/material";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
// import Image from "./../assets/image/minh.jpg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import Imagee from "./../assets/image/logo.jpg.webp";

// import { set } from "lodash";

interface props {
  token: unknown;
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
}
interface JobType {
  id: number;
  name: string;
  description: string;
}

export default function HeaderNavigation({ token }: props) {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSignup = searchParams.get("mode") === "signup";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(88);
  const [hovered, setHovered] = useState<null | string>(null);
  const [selectedMenu, setSelectedMenu] = useState<null | string>(null);
  const name = localStorage.getItem("name");
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const handleSavePath = () => {
    localStorage.setItem("redirectPath", location.pathname);
  };

  console.log("name", name);
  //profile
  const [anchorElProflie, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const [hoveredProflie, setHoveredProfile] = useState<null | string>(null);
  const [selectedMenuProfile, setSelectedMenuProflie] = useState<null | string>(
    null
  );
  //Company
  const [anchorElCompany, setAnchorElCompany] =
    React.useState<null | HTMLElement>(null);
  const [hoveredCompany, setHoveredCompany] = useState<null | string>(null);
  const [selectedMenuCompany, setSelectedMenuCompany] = useState<null | string>(
    null
  );

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
    setHovered(event.currentTarget.textContent || null);
    setSelectedMenu(event.currentTarget.textContent || null);
  };
  // const handleMouseEnterCompany = (
  //   event: React.MouseEvent<HTMLAnchorElement>
  // ) => {
  //   setAnchorElCompany(event.currentTarget);
  //   setHoveredCompany(event.currentTarget.textContent || null);
  //   setSelectedMenuCompany(event.currentTarget.textContent || null);
  // };

  const handleMouseLeaveCompany = () => {
    setTimeout(() => {
      setAnchorElCompany(null);
      setHoveredCompany(null);
      setSelectedMenuCompany(null);
    }, 200); // Delay to prevent accidental closing of the menu
  };

  const handleMouseEnterProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElProfile(event.currentTarget);
    setHoveredProfile(event.currentTarget.textContent || null);
    setSelectedMenuProflie(event.currentTarget.textContent || null);
  };
  const handleMouseLeaveProfile = () => {
    setTimeout(() => {
      setAnchorElProfile(null);
      setHoveredProfile(null);
      setSelectedMenuProflie(null);
    }, 200); // Delay to prevent accidental closing of the menu
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setAnchorEl(null);
      setHovered(null);
      setSelectedMenu(null);
    }, 200); // Delay to prevent accidental closing of the menu
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderHeight(60);
      } else {
        setHeaderHeight(88);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  // const auth = localStorage.getItem("auth");

  return (
    <header
      className={classes.header}
      style={{ height: `${headerHeight}px`, transition: "height 0.3s ease" }}
    >
      <nav
        className={`${classes.nav} ${classes.fixedTop}`}
        style={{ height: `${headerHeight}px`, transition: "height 0.3s ease" }}
      >
        <div className={classes.container}>
          <div className={classes.containerleft}>
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              {/* <img
                src={Imagee}
                alt="logo"
                style={{
                  width: "108px",
                  height: "70px",
                  aspectRatio: "auto 108/40",
                  overflowClipMargin: "content-box",
                  overflow: "clip",
                  cursor: "pointer",
                  verticalAlign: "middle",
                  borderRadius: "50%",
                }}
              /> */}
              <Typography
                variant="h2"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "22px",
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: 0,
                  boxSizing: "border-box",
                  display: "block",
                  color: "#fff",
                }}
              >
                Amazing Job
              </Typography>
            </Link>
          </div>
          <div className={classes.containerright}>
            <ul className={classes.list}>
              <li className={classes.li}>
                <NavLink
                  onMouseEnter={handleMouseEnter}
                  className={classes.link}
                  to="#"
                >
                  All Jobs
                  <ArrowDropDownIcon
                    sx={{
                      width: "20px",
                      height: "20px",
                      stroke: "currentcolor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      verticalAlign: "baseline",
                      fill: "none",
                    }}
                  />
                </NavLink>
              </li>
              {/* <li className={classes.li}>
                <NavLink
                  onMouseEnter={handleMouseEnterCompany}
                  className={classes.link}
                  to="/about"
                >
                  IT Companies
                  <ArrowDropDownIcon
                    sx={{
                      width: "20px",
                      height: "20px",
                      stroke: "currentcolor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      verticalAlign: "baseline",
                      fill: "none",
                    }}
                  />
                </NavLink>
              </li> */}
              {/* <li className={classes.li}>
                <NavLink className={classes.link} to="/contact">
                  Blog
                </NavLink>
              </li> */}
            </ul>

            <ul className={classes.listright}>
              <li className={classes.link1}>
                <NavLink className={classes.linkk} to="/employers/login">
                  For Employers
                </NavLink>
              </li>
              <li className={classes.liprofile}>
                {token ? (
                  <div
                    className={classes.profile}
                    onMouseEnter={handleMouseEnterProfile}
                  >
                    <div className={classes.profileleft}>
                      {/* <img
                        src={Image}
                        alt="profile image"
                        style={{
                          border: "1px solid #dedede",
                          borderRadius: "50%",
                          objectFit: "cover",
                          verticalAlign: "middle",
                          width: "32px",
                          height: "32px",
                          aspectRatio: "auto 32/32",
                          cursor: "pointer",
                          color: "#a6a6a6",
                        }}
                      /> */}
                    </div>
                    <div className={classes.profileRight}>
                      <Typography
                        variant="body1"
                        sx={{
                          marginLeft: "12px",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {/* {name} */}
                        {UserProfileData?.firstName} {UserProfileData?.lastName}
                      </Typography>
                      <ArrowDropDownIcon
                        sx={{
                          width: "20px",
                          height: "20px",
                          stroke: "currentcolor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          verticalAlign: "baseline",
                          fill: "none",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  // !isLogin &&
                  // !isSignup && (
                  //   <NavLink
                  //     className={classes.linkk}
                  //     to="/auth?mode=login"
                  //     onClick={handleSavePath}
                  //   >
                  //     Sign in/Sign up
                  //   </NavLink>
                  // )
                  !isLogin &&
                  !isSignup && (
                    <NavLink
                      className={classes.linkk}
                      to="/JobSeekers/login"
                      onClick={handleSavePath}
                    >
                      Sign in/Sign up
                    </NavLink>
                  )
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <CompanyMenu
        anchorEl={anchorElCompany}
        handleClose={handleMouseLeaveCompany}
        setHovered={setHoveredCompany}
        hovered={hoveredCompany}
        selectedMenu={selectedMenuCompany}
        setSelectedMenu={setSelectedMenuCompany}
      />

      <ProfileMenu
        anchorEl={anchorElProflie}
        handleClose={handleMouseLeaveProfile}
        setHovered={setHoveredProfile}
        hovered={hoveredProflie}
        selectedMenu={selectedMenuProfile}
        setSelectedMenu={setSelectedMenuProflie}
      />

      <SkillsMenu
        anchorEl={anchorEl}
        handleClose={handleMouseLeave}
        setHovered={setHovered}
        hovered={hovered}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
    </header>
  );
}

const SkillsMenu = ({
  anchorEl,
  handleClose,
  setHovered,
  hovered,
  selectedMenu,
  setSelectedMenu,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  setHovered: (item: string | null) => void;
  hovered: string | null;
  selectedMenu: string | null;
  setSelectedMenu: (item: string | null) => void;
}) => {
  const leftMenuItems = [
    "Jobs by Skill",
    "Jobs by Title",

    "Jobs by Company",
    "Jobs by City",
    "Jobs by JobType",
  ];

  const {
    data: JobPosts,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });

  const JobPostsdata = JobPosts?.JobPosts;

  const skills = JobPostsdata?.map((skill) => skill.skillSets);
  const flattenedArray = skills?.flat();
  const uniqueArray = [...new Set(flattenedArray)];
  console.log("realy", uniqueArray);

  const skillsColumns = uniqueArray;

  const JobTitle = JobPostsdata?.map((name) => name.jobTitle);

  const flattenedArrayJobTitle = JobTitle?.flat();
  const uniqueArrayJobTitle = [...new Set(flattenedArrayJobTitle)];

  const JobTitleColums = uniqueArrayJobTitle;

  const CompanyName = JobPostsdata?.map((name) => name.companyName);

  const flattenedArrayCompanyName = CompanyName?.flat();
  const uniqueArrayCompanyName = [...new Set(flattenedArrayCompanyName)];
  console.log("realy1", CompanyName);

  const CompanyColums = uniqueArrayCompanyName;

  // const titlejobColumns = [
  //   "Java Developer",
  //   "PHP Developer",
  //   "Javascript Developer",
  //   "HTML5 Developer",
  //   "SQL Developer",
  //   "Mobile Developer",
  //   "NodeJS Developer",
  //   ".NET Developer",
  //   "Project Manager",
  //   "Project Manager",
  //   "Project Manager",
  // ];

  const city = JobPostsdata?.map((city) => city.jobLocationCities);
  const flattenedArrayCity = city?.flat();
  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumnn = uniqueArrayCity;
  const cityColumn = [...cityColumnn, "All"];

  const jobType = JobPostsdata?.map((type) => type.jobType.name);
  const flattenedArrayJobType = jobType?.flat();
  const uniqueArrayJobType = [...new Set(flattenedArrayJobType)];
  console.log("realy2", uniqueArrayJobType);

  const JobTypeColumn = uniqueArrayJobType;
  // const [jobSearch, setJobSearch] = useState<JobPost[]>([]);

  const [text, setText] = useState<string>("");
  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        // setJobSearch(data.result.items);

        navigate("/it_jobs", {
          state: { jobSearch: jobSearchResults, textt: text },
        });
      } else {
        navigate("/it_obs", { state: { textt: text } });
      }

      queryClient.invalidateQueries({
        queryKey: ["JobSearch"],
        refetchType: "active",
      });

      // navigate("/it-jobs",{state : text});
    },
    onError: () => {
      message.error("Failed to Search");
    },
  });
  // const { mutateAsync } = useMutation({
  //   mutationFn: GetJobSearch,
  //   onSuccess: (data) => {
  //     console.log("Search result:", data);

  //     if (data && data.result && data.result.items.length > 0) {
  //       const jobSearchResults = data.result.items;
  //       // setJobSearch(data.result.items);
  //       navigate("/it-jobs", {
  //         state: {
  //           jobSearch: jobSearchResults,
  //           text: text,
  //           location: location,
  //         },
  //       });
  //     } else {
  //       navigate("/it-jobs", { state: { text: text, location: location } });
  //     }

  //     queryClient.invalidateQueries({
  //       queryKey: ["JobSearch"],
  //       refetchType: "active",
  //     });

  //     // navigate("/it-jobs",{state : text});
  //   },
  //   onError: () => {
  //     message.error("Failed to Search");
  //   },
  // });
  const content =
    selectedMenu === "Jobs by Skill"
      ? skillsColumns
      : selectedMenu === "Jobs by City"
      ? cityColumn
      : selectedMenu === "Jobs by Company"
      ? CompanyColums
      : selectedMenu === "Jobs by JobType"
      ? JobTypeColumn
      : selectedMenu === "Jobs by Title"
      ? JobTitleColums
      : undefined;
  const navigate = useNavigate();
  const handleOnclick = async (column: string) => {
    setText(column);
    interface JobSearchResponse {
      result: {
        items: JobPost[];
      };
    }
    interface SearchData {
      jobTitle?: string;
      companyName?: string;
      skillSet?: string;
      city?: string;
      location?: string;
      // experience?: number;
      jobType?: string;
      pageSize: number;
    }
    // let searchDataArray: SearchData[];
    // if (column === "All") {
    //   searchDataArray = [
    //     { companyName: column, pageSize: 9 },
    //     { skillSet: column, pageSize: 9 },
    //     { city: column, pageSize: 9 },
    //     { location: column, pageSize: 9 },
    //     // { experience: Number(text), pageSize: 9 },
    //     { jobType: column, pageSize: 9 },
    //   ];
    // } else if (cityColumn.some((city) => city === column)) {
    //   searchDataArray = [{ city: column, pageSize: 9 }];
    // } else if (column !== "All") {
    //   searchDataArray = [
    //     { companyName: column, pageSize: 9 },
    //     { skillSet: column, pageSize: 9 },
    //     { city: column, pageSize: 9 },
    //     { location: column, pageSize: 9 },
    //     // { experience: Number(text), pageSize: 9 },
    //     { jobType: column, pageSize: 9 },
    //   ];
    // } else {
    //   searchDataArray = [];
    // }

    let searchDataArray: SearchData[];

    if (column === "All") {
      searchDataArray = [
        { jobTitle: "", pageSize: 9 },
        { companyName: "", pageSize: 9 },
        { skillSet: "", pageSize: 9 },
        { city: "", pageSize: 9 },
        { location: "", pageSize: 9 },
        { jobType: "", pageSize: 9 },
      ];
    } else if (cityColumn.includes(column)) {
      searchDataArray = [
        { city: column, pageSize: 9 },
        { location: column, pageSize: 9 },
      ];
    } else {
      searchDataArray = [
        { jobTitle: column, pageSize: 9 },
        { companyName: column, pageSize: 9 },
        { skillSet: column, pageSize: 9 },
        { city: column, pageSize: 9 },
        { location: column, pageSize: 9 },
        { jobType: column, pageSize: 9 },
      ];
    }
    // const searchDataArray: SearchData[] = [
    //   { companyName: column, pageSize: 9 },
    //   { skillSet: column, pageSize: 9 },
    //   { location: column, pageSize: 9 },
    //   { city: column, pageSize: 9 },
    //   // { experience: column, pageSize: 9 },
    //   { jobType: column, pageSize: 9 },
    // ];

    for (let i = 0; i < searchDataArray.length; i++) {
      try {
        console.log("Searching with:", searchDataArray[i]);

        const result: JobSearchResponse = await mutateAsync({
          data: searchDataArray[i],
        });
        console.log("chan", result.result.items);

        if (result && result.result && result.result.items.length > 0) {
          // setJobSearch(result.result.items);

          break;
        }
      } catch (error) {
        console.error("Error during job search:", error);
      }
    }
    // navigate("/it-jobs", { state: column });
  };
  return (
    <Menu
      id="skills-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: "#2c2f33",
          color: "white",
          width: "900px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
      MenuListProps={{
        onMouseLeave: handleClose,
      }}
    >
      <div style={{ display: "flex", padding: "10px" }}>
        {/* Left Side Menu */}
        <div
          style={{
            width: "25%",
            paddingRight: "20px",
            borderRight: "1px solid gray",
          }}
        >
          <List>
            {leftMenuItems.map((item) => (
              <MenuItem
                key={item}
                style={{
                  color: hovered === item ? "white" : "#b0bec5",
                  transition: "color 0.3s ease",
                  fontWeight: hovered === item ? "bold" : "normal",
                }}
                onMouseEnter={() => {
                  setHovered(item);
                  setSelectedMenu(item);
                }}
                onMouseLeave={() => setHovered(null)}
              >
                {item}
              </MenuItem>
            ))}
          </List>
        </div>

        {/* Right Side Multi-Column Skills Menu */}
        {content && (
          <div
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              paddingLeft: "10px",
            }}
          >
            {content.map((column, colIdx) => (
              <div
                key={colIdx}
                style={{ width: "33%" }}
                onClick={() => handleOnclick(column)}
              >
                <MenuItem
                  style={{
                    padding: "8px 16px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onClick={handleClose}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#3c3f44")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {column}
                </MenuItem>
              </div>
            ))}
          </div>
        )}
      </div>

      <Divider />

      {selectedMenu && (
        <div style={{ padding: "10px", textAlign: "center" }}>
          <Typography
            variant="body2"
            style={{ color: "lightgray", cursor: "pointer" }}
          >
            View all {selectedMenu}
          </Typography>
        </div>
      )}
    </Menu>
  );
};

const Menuitem = ({
  text,
  icon: Icon,
  isHovered,
  onHover,
  onClick,
}: {
  text: string;
  icon: React.ElementType;
  isHovered: boolean;
  onHover: () => void;
  onClick: () => void;
}) => (
  <li
    onMouseEnter={onHover}
    onClick={onClick}
    style={{
      padding: "10px",
      listStyle: "none",
      lineHeight: "45px",
      width: "250px",
      borderBottom: "1px solid #ffffff1a",
      color: "#a6a6a6",
      paddingLeft: "16px",
      paddingRight: "16px",
      fontSize: "14px",
      fontWeight: 400,
      backgroundColor: isHovered ? "#3c3f44" : "transparent",
      cursor: "pointer",
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ color: isHovered ? "white" : "#a6a6a6" }} />
      <Typography
        variant="body1"
        sx={{
          marginLeft: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 400,
          color: isHovered ? "white" : "#a6a6a6",
        }}
      >
        {text}
      </Typography>
    </div>
  </li>
);

const ProfileMenu = ({
  anchorEl,
  handleClose,
  setHovered,
  hovered,
  // selectedMenu,
  setSelectedMenu,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  setHovered: (item: string | null) => void;
  hovered: string | null;
  selectedMenu: string | null;
  setSelectedMenu: (item: string | null) => void;
}) => {
  const menuItems = [
    {
      text: "Profile & CV",
      icon: PermIdentityOutlinedIcon,
      itemKey: "Item 1",
    },
    {
      text: "My jobs",
      icon: WorkOutlineOutlinedIcon,
      itemKey: "Item 2",
    },
    {
      text: "Job invitation",
      icon: InboxIcon,
      itemKey: "Item 3",
    },
    {
      text: "Email Subscriptions",
      icon: MailOutlineIcon,
      itemKey: "Item 5",
    },
    {
      text: "Sign out",
      icon: LogoutOutlinedIcon,
      itemKey: "Item 4",
    },
  ];

  const navigate = useNavigate();

  const handleSignout = (item: string) => {
    if (item === "Item 4") {
      localStorage.clear();

      //   localStorage.removeItem('token');
      // localStorage.removeItem('expiration');
      // navigate('/');
      window.location.reload();
    } else if (item === "Item 1") {
      navigate("/profile-cv");
    } else if (item === "Item 2") {
      navigate("/my-jobs");
    } else if (item === "Item 3") {
      navigate("/Job-invitation");
    } else if (item === "Item 5") {
      navigate("/subscription");
    }

    setSelectedMenu(item);
  };

  return (
    <Menu
      id="Profile-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#2c2f33",
          color: "white",
          width: "250px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          mt: 2.5,
        },
      }}
      MenuListProps={{
        onMouseLeave: handleClose,
      }}
    >
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyleType: "none",
          backgroundColor: "#121212",
          color: "#a6a6a6",
        }}
      >
        {menuItems.map((menuItem) => (
          <Menuitem
            key={menuItem.itemKey}
            text={menuItem.text}
            icon={menuItem.icon}
            isHovered={hovered === menuItem.itemKey}
            onHover={() => setHovered(menuItem.itemKey)}
            onClick={() => handleSignout(menuItem.itemKey)}
          />
        ))}
      </ul>
    </Menu>
  );
};

const CompanyMenu = ({
  anchorEl,
  handleClose,
  setHovered,
  hovered,
  // selectedMenu,
  setSelectedMenu,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  setHovered: (item: string | null) => void;
  hovered: string | null;
  selectedMenu: string | null;
  setSelectedMenu: (item: string | null) => void;
}) => {
  const leftMenuItems = ["VietNam best IT company", "Company Reviews"];

  // const skillsColumns = [
  //   "Java",
  //   "PHP",
  //   "JavaScript",
  //   "HTML5",
  //   "Manager",
  //   "SQL",
  //   "Android",
  //   "iOS",
  // ];
  // const CompanyColums = [
  //   "MB Bank",
  //   "Viet Tin Bank",
  //   "Fsoft",
  //   "Công ty 4 thành viên",
  //   "VNG Corporation",
  //   "PV COMbank",
  //   "Android",
  //   "iOS",
  // ];
  // const titlejobColumns = [
  //   "Java Developer",
  //   "PHP Developer",
  //   "Javascript Developer",
  //   "HTML5 Developer",
  //   "SQL Developer",
  //   "Mobile Developer",
  //   "NodeJS Developer",
  //   ".NET Developer",
  //   "Project Manager",
  //   "Project Manager",
  //   "Project Manager",
  // ];

  const navigate = useNavigate();

  const handleNavigate = (item: string) => {
    if (item === "VietNam best IT company")
      navigate("/vietnam-best-it-companies");
    else {
      navigate("/all/company");
    }
  };

  return (
    <Menu
      id="skills-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        style: {
          marginTop: "10px",
          backgroundColor: "#2c2f33",
          color: "white",
          width: "fit-content",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
      MenuListProps={{
        onMouseLeave: handleClose,
      }}
    >
      <div style={{ display: "flex", padding: "10px" }}>
        {/* Left Side Menu */}
        <div>
          <List>
            {leftMenuItems.map((item) => (
              <MenuItem
                onClick={() => handleNavigate(item)}
                key={item}
                style={{
                  color: hovered === item ? "white" : "#b0bec5",
                  transition: "color 0.3s ease",
                  fontWeight: hovered === item ? "bold" : "normal",
                }}
                onMouseEnter={() => {
                  setHovered(item);
                  setSelectedMenu(item);
                }}
                onMouseLeave={() => setHovered(null)}
              >
                {item}
              </MenuItem>
            ))}
          </List>
        </div>
      </div>
    </Menu>
  );
};
