import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import Spinner from "./Spinner";
import { useSpin } from "../providers/SpinnerProvider";

function Layout() {
  const { loading } = useSpin();
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <Navbar />
      <main className="flex-grow relative">
        <Spinner loading={loading} />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
