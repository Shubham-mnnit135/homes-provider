

import React, { useContext, useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { UserDetailContext } from "../../context/UserDetailContext";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import { toast } from "react-toastify";


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [ modalOpened, setModalOpened ] = useState(false);
  const headerColor = useHeaderColor();
  const navigate = useNavigate();
  const handleAddPropertyClick = () => {
    if (userDetails) {
       setModalOpened(true);
    }
    else{
      toast.error("you are not logged in");
      navigate("/login");
      
    }
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          
          <span className="orangeText">Family</span>
        </Link>
        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink style={{color:"#3f7dd9"}} to="/properties">Properties</NavLink>
            <a href="mailto:shubham@gmail.com" style={{color:"#3f7dd9"}} >Contact</a>
            <div onClick={handleAddPropertyClick} style={{color:"#3f7dd9"}} >Add Property</div>
            <AddPropertyModal
              opened={modalOpened}
              setOpened={setModalOpened}
            />
            {/* longin button */}
            {userDetails === null ? (
              <>
                <NavLink className="button" to="/login">
                  Login
                </NavLink>
                <NavLink className="button" to="/register">
                  register
                </NavLink>
              </>
            ) : (
              <ProfileMenu user={userDetails} />
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
