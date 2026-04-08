

import React from "react";
import { Outlet } from "react-router-dom";
import HeaderMain from "../components/layoutComponents/HeaderMain";
import Footer from "../components/layoutComponents/Footer";

function PublicLayout() {
  return (
    <>
      <HeaderMain />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;