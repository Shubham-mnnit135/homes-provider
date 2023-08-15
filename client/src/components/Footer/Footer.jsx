

import React from "react";
import "./Footer.css";
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
        <span className="primaryText">About Us</span>
          <span className="secondaryText" style={{textAlign:"justify"}}>
            We understand that every property is a significant investment.
            That's why we carefully curate a portfolio of high-quality
            properties that meet stringent standards for design, functionality,
            and value. When you explore our listings, you can be confident that
            you're viewing properties that are worth your consideration.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Follow Us</span>
          <div className="socialMedia">
              <AiFillFacebook size={50} className="Icon" color="#4287f5"/>
              <AiFillTwitterSquare size={50} className="Icon" color="#4287f5"/>
              <AiFillLinkedin size={50} className="Icon" color="#4287f5"/>
          </div>
          <span className="secondaryText">New Delhi, India</span>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
