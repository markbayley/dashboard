import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FavoriteBorderOutlined,
  ShoppingBasketOutlined,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const Navbar = ({ favorite, cart, user }) => {
  const { dispatch } = useContext(DarkModeContext);

  let location = useLocation();

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}

          <div className="top">
            {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
            <Link to="/home" className="logo">
              marc balieu
            </Link>
            {/* </Link> */}
          </div>
        </div>
        <div className="items">
     
       
          {location.pathname.includes("/admin") ? 
            <>
            <div className="item">
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            </div>
              <div className="item">
                <NotificationsNoneOutlinedIcon className="icon" />
                <div className="counter">1</div>
              </div>
              <div className="item">
                <ChatBubbleOutlineOutlinedIcon className="icon" />
                <div className="counter">2</div>
              </div>
              </>
              :
              <>
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


            </>


              }
              <div className="item">
                <ListOutlinedIcon className="icon" />
              </div>
    
          <Link to="/admin/profile">
            <div className="item">
              <img
                src={
                  user.img
                    ? user.img
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
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
