import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateFavList } from "../../utils/api";
import { checkFavourite } from "../../utils/common";

const Heart = ({ propertyId }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  useEffect ( () => {
     setHeartColor(() => checkFavourite(propertyId));
  },[userDetails]);
  const navigate = useNavigate();
  return (
    <AiFillHeart
        size={24}
        color={heartColor}
        onClick={async () => {
          if (userDetails) {
            heartColor === "white"
              ? setHeartColor("red")
              : setHeartColor("white");
            const updateUser = await updateFavList(userDetails, propertyId);
            if (updateUser) {
              const token = userDetails.token;
              localStorage.setItem(
                "userInfo",
                JSON.stringify({ token: token, user: updateUser })
              );
              setUserDetails(JSON.parse(localStorage.getItem("userInfo")));
            }
          } else {
            toast.error("your are not logged in");
            navigate("/login");
          }
        }}
      />
  );
};

export default Heart;
