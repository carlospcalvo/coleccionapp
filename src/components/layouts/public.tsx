import React from "react";
// import NavBar from "../navbar";
// import Footer from "../footer";
import type { LayoutProps } from "~/types/next";

export default function PublicLayout({ children }: LayoutProps) {
  return (
    <>
      {/* <NavBar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
