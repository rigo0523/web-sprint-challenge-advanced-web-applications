import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import { logOut } from "./Login";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        console.log(res.data, "res inside get colors axios");
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(err, "error in get colors axios");
      });
  }, []);

  return (
    <>
      <Link to="/">
        <button onClick={logOut}>LOG OUT</button>
      </Link>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
