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
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FavoriteBorderOutlined, ShoppingBasketOutlined } from "@mui/icons-material";



const Navbar = ({favorite, cart}) => {
  const { dispatch } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const [ data, setData ] = useState([])
  //Get the current users' data
  useEffect(async() => {
  
      const docRef = doc(db, "users", currentUser?.uid );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
    
  
  }, []);




  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}

<div className="top">
            {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
            <Link to="/client" className="logo">marcbalieu</Link>
            {/* </Link> */}
          </div>
   
          
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
               <Link to="/favorites">
        <div className="item">
              <FavoriteBorderOutlined />
              <div className="counter">{favorite}</div>
              </div>
              </Link>
              <Link to="/cart">
        <div className="item">
              <ShoppingBasketOutlined />
              <div className="counter">{cart}</div>
              </div>
              </Link>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
            
          </div>
          <Link to="/profile">
          <div className="item">
            <img
              src={data.img ? data.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="avatar"
              className="avatar"
            />
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
