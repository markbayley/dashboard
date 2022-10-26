import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { pink } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import Login from "../../pages/login/Login";
import { Badge } from "@mui/material";
import { ShoppingBasket, ShoppingBasketOutlined, ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";

const SignedOut = () => {


  const [ modal, setModal ] = useState(false)

  const handleModal = () => {
    setModal(true)
  }

  return (
    <>
    <div className="navbar">
      <div className="wrapper">


      

          <div className="top">
            {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
            <span className="logo">marcbalieu</span>
            {/* </Link> */}
          </div>

          <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon"/>
        </div>
<div style={{display: "flex"}}>
      
        <Badge badgeContent={4} color="warning" >
              <ShoppingBasketOutlined />
            </Badge>
        <div onClick={handleModal} className="log">Login</div>

        </div>


      </div>
    </div>
    { modal ?
    <Login setModal={setModal} />
    :
    ""
  }
    </>
  );
};

export default SignedOut;
