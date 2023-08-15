import React from "react";
import "../PropertyCard/PropertyCard.css"
import {AiFillHeart} from 'react-icons/ai'
import {truncate} from 'lodash';
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";


const MyBookingCard = ({card}) => {
  const navigate = useNavigate();

  return (
    <div className="flexColStart r-card"
      onClick ={() => navigate(`../bookings/${card.id}`)}
    >
     {/* <AiFillHeart size={24} color="white"/> */}
      <Heart  propertyId={card?.id}/>
      <img src={card?.image} alt="home" />
      
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>₹ </span>
        <span>{card?.price}</span>
      </span>
      <span className="primaryText">{truncate(card.title,{length:15})}</span>
      <span className="secondaryText">{truncate(card.description,{length:80})}</span>
    </div>
  );
};

export default MyBookingCard;