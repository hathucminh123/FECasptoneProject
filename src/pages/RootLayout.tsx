import React from "react";
import { Outlet } from "react-router-dom";
import HeaderNavigation from "../components/HeaderNavigation";
import Footer from "../components/Footer";
import classes from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <>
      <HeaderNavigation />
      <main className={classes.main}>
        <div className={classes.main1}>
          <Outlet />
        </div>
      </main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </>
  );
}
