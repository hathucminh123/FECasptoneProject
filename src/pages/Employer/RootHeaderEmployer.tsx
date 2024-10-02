import React from "react";
import HeaderNavigationEmployer from "../../components/Employer/HeaderNavigationEmployer";
import { Outlet } from "react-router-dom";
import classes from './RootHeaderEmployer.module.css'
import Footer from "../../components/Footer";
export default function RootHeaderEmployer() {
  return (
    <>
      <HeaderNavigationEmployer />
      <section className={classes.section}>
        <Outlet/>
      </section>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </>
  );
}
