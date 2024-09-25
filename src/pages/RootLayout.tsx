import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderNavigation from "../components/HeaderNavigation";
import Footer from "../components/Footer";
import classes from "./RootLayout.module.css";
import useScrollToTop from "../hook/useScrollToTop";

export default function RootLayout() {
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
      <HeaderNavigation />
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
