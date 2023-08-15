
import React from "react";
import "./GetStarted.css";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate =  useNavigate();
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Family</span>
          <span
            className="secondaryText"
            style={{ textAlign: "justify-center", width: "60%" }}
          >
            Ready to embark on your journey to find your dream home? Explore our
            listings, connect with our team, and let us assist you in
            discovering the place that resonates with your heart and lifestyle.
          </span>
          <button className="button" onClick={() => navigate("/properties")}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;