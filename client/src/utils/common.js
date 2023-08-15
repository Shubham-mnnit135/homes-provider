import { useContext } from "react";
import { UserDetailContext } from "../context/UserDetailContext";

export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2
    },
    750: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 4,
    },
  },

};


export const checkFavourite = (propertyId) => {
  const { userDetails} = useContext(UserDetailContext);
  console.log("fac res : ",userDetails?.user?.favResidenciesID);
  return userDetails?.user?.favResidenciesID?.includes(propertyId) ?"red" :"white" ;
}

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};