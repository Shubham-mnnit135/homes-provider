import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import useProperty from "../../hooks/useProperty";
import { useQuery } from "react-query";
import { getResidency } from "../../utils/api";
import { ThreeCircles } from "react-loader-spinner";
import { AiFillHeart } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";

import "./Property.css";
import Map from "../../components/Map/Map";
import BookingModal from "../../components/BookingModal/BookingModal";
import { UserDetailContext } from "../../context/UserDetailContext";
import Heart from "../../components/Heart/Heart";
import useProperty from "../../hooks/useProperty";
const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { userDetails } = useContext(UserDetailContext);
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();
  const { data, isError, isLoading } = useProperty(id);
  // const { data, isError, isLoading } = useQuery(["residency", id], () =>
  //   getResidency(id)
  // );

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#eb5f34"
            innerCircleColor="#eb5f34"
            middleCircleColor="#eb5f34"
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart propertyId={id}/>
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ₹ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}{",  "}
                {data?.city}{",  "}
                {data?.country}
              </span>
            </div>

            {/* booking button */}

            <button
              className="button"
              onClick={() => {
                if (userDetails) {
                  setModalOpened(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              book your visit
            </button>

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
            />
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
