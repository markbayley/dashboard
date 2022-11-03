import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Login from "../../pages/login/Login";
import { Badge } from "@mui/material";
import {
  Favorite,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShoppingBasket,
  ShoppingBasketOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const SignedOut = ({ favorite, cart, modal, handleModal }) => {


  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="top">
            <Link to="/home" className="logo">
              marc balieu
            </Link>
          </div>

          {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon"/>
        </div> */}
          <div className="items">
            <Link to="/home/favorites">
              <div className="item">
                <FavoriteBorderOutlined />
                <div className="counter">{favorite}</div>
              </div>
            </Link>
            <Link to="/home/cart">
              <div className="item">
                <ShoppingBasketOutlined />
                <div className="counter">{cart}</div>
              </div>
            </Link>

            <div onClick={handleModal} className="log">
              Login
            </div>
          </div>
        </div>
      </div>
      {modal ? <Login handleModal={handleModal} /> : ""}
    </>
  );
};

export default SignedOut;
