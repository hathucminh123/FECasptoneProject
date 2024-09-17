// import React from 'react'

import { Outlet } from "react-router-dom";
import HeaderNavigation from "../components/HeaderNavigation";
import Footer from "../components/Footer";
// import { useRedirectAfterLogin } from "../hook/useRedirectAfterLogin";

export default function RootLayout() {

  // useRedirectAfterLogin()
  return (
    <>
      <HeaderNavigation />
      <main style={{ paddingTop: "90px" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
