import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  // useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import HeaderNavigation from "../components/HeaderNavigation";
import Footer from "../components/Footer";
import classes from "./RootLayout.module.css";
import useScrollToTop from "../hook/useScrollToTop";
import { getTokenDuration } from "../utils/Auth";

export default function RootLayout() {
  const token = useRouteLoaderData("root");
  const userRole = localStorage.getItem('role')
  console.log('rolene',userRole)
  console.log("tokenne", token);
  // const navigate =useNavigate()
  const submit = useSubmit();

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
    </>
  );
}
