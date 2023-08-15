import React, { useContext } from "react";
import "./ListItemWithCancel.css";
import dayjs from "dayjs";
import { UserDetailContext } from "../../context/UserDetailContext";
import { cancelBooking } from "../../utils/api";
const ListItemWithCancel = ({ date, propertyId }) => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  return (
    <div className="flexColCenter item">
      <span>{dayjs(date).format("DD/MM/YYYY")}</span>
      <span
        className="button"
        onClick={async () => {
          const detailsToCancel = {
            date: date,
            token: userDetails.token,
            user: userDetails.user,
          };

          const updateUser = await cancelBooking(detailsToCancel, propertyId);
          if (updateUser) {
            const token = userDetails.token;
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ token: token, user: updateUser })
            );
            setUserDetails(JSON.parse(localStorage.getItem("userInfo")));
          }
        }}
      >
        cancel
      </span>
    </div>
  );
};

export default ListItemWithCancel;
