import { Outlet } from "react-router-dom";
import HeaderSystemEmployer from "../../components/Employer/HeaderSystemEmployer";

import React from 'react'

export default function RootSystem() {
  return (
    <>
    <HeaderSystemEmployer/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}
