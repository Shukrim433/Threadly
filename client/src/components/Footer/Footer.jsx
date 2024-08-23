import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer footer-center border-t-2 text-black p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by THREADLY
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
