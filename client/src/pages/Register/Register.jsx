import React, { useEffect, useState } from "react";
import {  useQuery } from "react-query";

import { registerUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";



const Register = () => {

  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  

  const handleClick = async (e) => {
    e.preventDefault();
    const userInfo = {
         name: credential.name,
         email: credential.email,
         password: credential.password
    }
    registerUser(userInfo);
    navigate("/login",{replace: true});
  };

  return (
    <div className="wrapper flexColCenter">
      <form
        className="wrapper flexColCenter paddings form"
        style={{ gap: "1rem" }}
        onSubmit={handleClick}
      >
        <label>name</label>
        <input
          type="text"
          placeholder="name"
          value={credential.name}
          onChange={(e) => setCredential({ ...credential, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          value={credential.email}
          onChange={(e) => setCredential({ ...credential, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={credential.password}
          onChange={(e) => setCredential({ ...credential, password: e.target.value })}
        />
        <button type="submit" className="button">
          submit
        </button>
      </form>
    </div>
  );
};

export default Register;

