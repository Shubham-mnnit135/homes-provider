
import React from "react";
import "./Contact.css";
import { MdCall, MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const Contact = () => {
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="primaryText">Contact Us</span>
          <span className="secondaryText" style={{textAlign:"justify"}}>
            We understand that finding the perfect home is a significant
            decision, and we're here to provide you with the information and
            support you need. Feel free to reach out to us anytime – we're here
            to make your journey towards your new home a seamless and enjoyable
            experience.
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Call</span>
                    <span className="secondaryText">012 123 123 12</span>
                  </div>
                </div>
                <div className="flexCenter button">Call now</div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsWhatsapp size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Whatsapp</span>
                    <span className="secondaryText">012 123 123 12</span>
                  </div>
                </div>
                <div className="flexCenter button">whatspp now</div>
              </div>
            </div>

            {/* second row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdEmail size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Gmail</span>
                    <span className="secondaryText">family@gmail.com</span>
                  </div>
                </div>
                <div className="flexCenter button">send a gmail</div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Message</span>
                    <span className="secondaryText">012 123 123 12</span>
                  </div>
                </div>
                <div className="flexCenter button">Message now</div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <img src="./contact1.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
