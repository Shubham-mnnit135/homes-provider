

import React, { useContext, useState } from "react";
import { loginUser } from "../../utils/api";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"


const Login = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    
    const userInfo = {
      email: credential.email,
      password: credential.password,
    };

    const user = await loginUser(userInfo);
    setUserDetails(user);
    // console.log(userDetails.name);
    localStorage.setItem("userInfo",JSON.stringify(user));
    navigate("/",{replace:true});
  };

  return (
    <div className="wrapper flexColCenter login-container">
      
      <form
        className="wrapper flexColCenter paddings form"
        style={{ gap: "1rem" }}
        onSubmit={handleClick}
      >
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          required
          value={credential.email}
          onChange={(e) =>
            setCredential({ ...credential, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          required
          value={credential.password}
          onChange={(e) =>
            setCredential({ ...credential, password: e.target.value })
          }
        />
        <button type="submit" className="button">
          login
        </button>
      </form>
      
    </div>
  );
};

export default Login;
