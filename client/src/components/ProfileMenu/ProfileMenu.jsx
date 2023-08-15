


import React, { useContext } from "react";
import { Avatar, Menu } from "@mantine/core";
import { FiLogOut } from "react-icons/fi";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user}) => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const navigate = useNavigate();
  return (
    <Menu >
      <Menu.Target>
        {/* <Avatar src={user?.image} alt="user image" radius={"xl"} /> */}
        <Avatar src={null} alt="no image here" color="blue" />
      </Menu.Target>
      <Menu.Dropdown >
        <Menu.Item color="blue"  onClick={()=>{ navigate("/favourites",{replace:true}) }}>Favourite List</Menu.Item>

        <Menu.Item color="blue" onClick={()=>{ navigate("/bookings",{replace:true}) }}>Booking List</Menu.Item>

        <Menu.Item color="blue" onClick={()=>{ navigate("/myproperties",{replace:true}) }}>My Properties</Menu.Item>
        

        <Menu.Item
          onClick={() => {
            localStorage.clear();
            setUserDetails(null);
            navigate("/");
          }}
          style={{backgroundColor:"black", color:"white", scale:""}}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

            }}
          >
            <span>Logout</span>
            <FiLogOut size={19}  />
          
          </div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
