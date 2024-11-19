import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  // useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import HeaderNavigation from "../components/HeaderNavigation";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../components/Footer";
import classes from "./RootLayout.module.css";
import useScrollToTop from "../hook/useScrollToTop";
import { getTokenDuration } from "../utils/Auth";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { JobSearchQuery } from "../Services/JobSearchService/JobSearchQuery";
import { message } from "antd";
// import { queryClient } from "../Services/mainService";

export default function RootLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => setSearchOpen((prev) => !prev);
  const token = useRouteLoaderData("root");
  const userRole = localStorage.getItem("role");
  console.log("rolene", userRole);
  console.log("tokenne", token);
  // const navigate =useNavigate()
  const submit = useSubmit();

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: JobSearchQuery,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.length > 0) {
        const jobSearchResults = data.result;
        // setJobSearch(data.result.items);

        navigate("/it_jobs", {
          // state: { jobSearch: jobSearchResults, textt: searchTerm },
          state: { jobSearch: jobSearchResults },
        });
      } else {
        // navigate("/it_jobs", { state: { textt: searchTerm } });
        navigate("/it_jobs");
      }
      setSearchOpen(false);

      // navigate("/it-jobs",{state : text});
    },
    onError: () => {
      message.error("Failed to Search.");
    },
  });

  const handleSearch = () => {
    mutate({
      data: {
        query: searchTerm,
      },
    });
  };

  const tokenDuration = getTokenDuration();

  //  useEffect(()=>{
  //     if(userRole ==="jobseeker"){
  //       navigate('/')
  //     }else if(userRole ==="employer"){
  //       navigate('/employer-verify/jobs')
  //     }
  //  },[userRole,navigate])

  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, tokenDuration, submit]);
  const { pathname } = useLocation();
  useScrollToTop();
  const [scroll, setScroll] = useState<boolean>(false);
  console.log("scroll", scroll);

  const handelScroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component unmounts or on dependency change
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  return (
    <>
      <HeaderNavigation token={token} />
      <main className={classes.main}>
        <div className={classes.main1}>
          <Outlet />
        </div>
      </main>
      <footer className={classes.footer}>
        <Footer onClick={handelScroll} scroll={scroll} />
      </footer>

      <div className={classes.main3}>
        {searchOpen ? (
          <div className={classes.modal}>
            <div className={classes.modal1}>
              <div className={classes.modal2}>
                <div className={classes.modal3}>
                  <div style={{ boxSizing: "border-box", display: "block" }}>
                    <div className={classes.modal4}>Amazing Jobs</div>
                    <div className={classes.modal5}>Advanced Search</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={classes.modal6}>
            <div className={classes.modal7}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                  <div className={classes.main5}>
                    <SearchIcon />
                    <TextField
                      id="keyword-input"
                      // label="Enter keyword"
                      placeholder="Enter Your description"
                      variant="outlined"
                      type="text"
                      sx={{
                        width: "300px",
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div> */}
            {/* <Modal
            open={searchOpen}
            onClose={toggleModal}
            aria-labelledby="search-modal"
            aria-describedby="advanced-search-modal"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          > */}
            <Box className={classes.modalne}>
              <div className={classes.modalContent}>
                <TextField
                  id="search-keyword"
                  placeholder="Enter your description"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ marginBottom: "16px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  fullWidth
                  sx={{
                    backgroundColor: "#FF6F61",
                    "&:hover": {
                      backgroundColor: "#D9584F",
                    },
                  }}
                >
                  Search
                </Button>
              </div>
            </Box>
            {/* </Modal> */}
          </div>
        ) : undefined}

        <div className={classes.main2} onClick={toggleModal}>
          {/* <img
            src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/support-ticket/customer.png"
            className={classes.img}
            alt=""
          /> */}
          {searchOpen ? (
            <CloseIcon
              sx={{
                height: "27.77px",
                width: "33.58px",
                verticalAlign: "middle",
                border: 0,
                boxSizing: "border-box",
                overflowClipMargin: "content-box",
                overflow: "clip",
                color: "#fff",
                cursor: "pointer",
                fontSize: "27px",
                textAlign: "center",
              }}
            />
          ) : (
            <SearchIcon
              sx={{
                height: "27.77px",
                width: "33.58px",
                verticalAlign: "middle",
                border: 0,
                boxSizing: "border-box",
                overflowClipMargin: "content-box",
                overflow: "clip",
                color: "#fff",
                cursor: "pointer",
                fontSize: "27px",
                textAlign: "center",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
