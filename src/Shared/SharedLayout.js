import React from "react";
import Header from "../Pages/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";

function SharedLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default SharedLayout;
