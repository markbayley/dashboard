import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Stats from "./pages/stats/Stats";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  productInputs,
  userInputs,
  orderInputs,
  profileInputs,
  statsInputs,
} from "./formSource";
import { Fragment, useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Sidebar from "./components/sidebar/Sidebar";
import SignedOut from "./components/navbar/SignedOut";
import Client from "./pages/client";
import { Favorite } from "@mui/icons-material";
import Favorites from "./pages/favorites/Favorites";
import Cart from "./pages/cart/Cart";
import { Detail } from "./pages/detail/Detail";
import { Search } from "./pages/search/Search";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Button } from "@mui/material";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const [cart, setCart] = useState([]);
  const [counterCart, setCartCounter] = useState(0);
  const [favorite, setFavorite] = useState([]);
  const [counterFavorite, setFavoriteCounter] = useState(0);

  const [detail, setDetail] = useState([]);
  console.log(detail, 'detail-app')
  const [category, setCategory] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
  });
  const { open } = snackbar;

  const handleFavorite = (item) => {
    const list = favorite;
    list.push(item);
    setFavorite(list);
    setFavoriteCounter(counterFavorite + 1);
    setSnackbar({ open: true });
  };

  const handleCart = (item) => {
    const list = cart;
    list.push(item);
    setCart(list);
    setCartCounter(counterCart + 1);
    setSnackbar({ open: true });
  };

  // const navigate = useNavigate()

  const handleDetail = (item) => {
    setDetail(item);
    // navigate("/detail")

  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        {currentUser ? (
          <Fragment>
            <Navbar favorite={counterFavorite} cart={counterCart} />
          </Fragment>
        ) : (
          <Fragment>
            <SignedOut favorite={counterFavorite} cart={counterCart} />
          </Fragment>
        )}

        <Routes>
          <Route path="/">
            <Route
              path="favorites"
              element={<Favorites favorite={favorite} />}
            />
            <Route path="search" element={<Search category={category} handleFavorite={handleFavorite} handleCart={handleCart} handleDetail={handleDetail}/>} />
            <Route
              path="detail"
              element={
                <Detail
                  detail={detail}
                  handleFavorite={handleFavorite}
                  handleCart={handleCart}
                  handleDetail={handleDetail}
                />
              }
            />
            <Route path="cart" element={<Cart cart={cart} />} />
            <Route path="login" element={<Login />} />
            <Route
              path="client"
              element={
                <Client
                  handleFavorite={handleFavorite}
                  handleCart={handleCart}
                  handleDetail={handleDetail}
                  handleCategory={handleCategory}
                />
              }
            />
            <Route
              index
              element={
                <RequireAuth>
                  <Home col="" key="0" title="Dashboard" />
                </RequireAuth>
              }
            />

            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List col="users" key="1" title="Users" />
                  </RequireAuth>
                }
              />
              <Route
                path=":Id"
                element={
                  <RequireAuth>
                    <Single col="users" inputs={userInputs} title="Edit User" />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New col="users" inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <List col="products" key="2" title="Products" />
                  </RequireAuth>
                }
              />
              <Route
                path=":Id"
                element={
                  <RequireAuth>
                    <Single
                      col="products"
                      inputs={productInputs}
                      title="Edit Product"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New
                      inputs={productInputs}
                      title="Add New Product"
                      col="products"
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="orders">
              <Route
                index
                element={
                  <RequireAuth>
                    <List col="orders" key="3" title="Orders" />
                  </RequireAuth>
                }
              />
              <Route
                path=":Id"
                element={
                  <RequireAuth>
                    <Single
                      col="orders"
                      inputs={orderInputs}
                      title="Edit Order"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New
                      inputs={orderInputs}
                      title="Add New Order"
                      col="orders"
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="deliveries">
              <Route
                index
                element={
                  <RequireAuth>
                    <List col="deliveries" key="4" title="Deliveries" />
                  </RequireAuth>
                }
              />
              <Route
                path=":Id"
                element={
                  <RequireAuth>
                    <Single
                      col="deliveries"
                      inputs={orderInputs}
                      title="Edit Delivery"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New
                      inputs={orderInputs}
                      title="Add New Delivery"
                      col="deliveries"
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route
              path="stats"
              index
              element={
                <RequireAuth>
                  <Stats
                    col="stats"
                    key="5"
                    inputs={statsInputs}
                    title="Stats"
                  />
                </RequireAuth>
              }
            />

            <Route
              path="profile"
              index
              element={
                <RequireAuth>
                  <Single
                    col="users"
                    inputs={profileInputs}
                    key="6"
                    uid={currentUser?.uid}
                    title="My Profile"
                  />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "teal" }}
        >
          Item has been added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
