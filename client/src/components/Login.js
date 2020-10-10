import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";

export const logOut = () => {
  window.localStorage.removeItem("token");
};

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const { push } = useHistory();

  const handleChanges = (e) => {
    console.log(e.target.name, ":", e.target.value);
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //add login toekn
    axiosWithAuth()
      .post("/login", login)
      .then((res) => {
        console.log(res, "res in Get LOGIN submit");
        window.localStorage.setItem("token", res.data.payload);
        push("/protected");
      })
      .catch((err) => {
        console.log(err, "erro in GET SUBMIT");
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <Link to="/">
        <button onClick={logOut}>LOG OUT</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={login.username}
          onChange={handleChanges}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={login.password}
          onChange={handleChanges}
        />

        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
