import React from "react";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

const MainLayout = ({ cartCount, children }) => {
  return (
    <>
      <Header cartCount={cartCount} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
