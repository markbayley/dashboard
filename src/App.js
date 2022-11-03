import "./style/dark.scss";
import Admin from "./pages/admin/Admin";
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
import SignedOut from "./components/navbar/SignedOut";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorites";
import Cart from "./pages/cart/Cart";
import { Detail } from "./pages/detail/Detail";
import { Search } from "./pages/search/Search";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { Checkout } from "./pages/checkout/Checkout";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const [user, setUser] = useState([]);
  //Get the current users' data
  useEffect(async () => {
    const docRef = doc(db, "users", currentUser?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }, []);


  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const [favorite, setFavorite] = useState([]);
  const [favorited, setFavorited] = useState([]);
  const [counterFavorite, setFavoriteCounter] = useState(0);

  const handleFavorite = (item) => {
    const list = favorite;
    list.push(item);
    const list2 = favorited;
    list2.push(item);
    setFavorite(list);
    setFavorited(list2);
    setFavoriteCounter(counterFavorite + 1);
    setSnackbar({ open: true });
  };

  const [cart, setCart] = useState([]);
  const [counterCart, setCartCounter] = useState(0);

  const handleCart = (item) => {
    const list = cart;
    list.push(item);
    setCart(list);
    setCartCounter(counterCart + 1);
    setSnackbar({ open: true });
  };

  const handleDelete = (e) => {
    const list = favorite;
    const id = e.target.getAttribute("id");
    setFavorite(list.filter((item) => item.id !== id));
    setFavoriteCounter(counterFavorite - 1);
  };

  const [detail, setDetail] = useState([]);

  const handleDetail = (item) => {
    setDetail(item);
  };

  const [category, setCategory] = useState([]);

  const handleCategory = (value) => {
    setCategory(value);
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
  });
  const { open } = snackbar;

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        {currentUser ? (
          <Fragment>
            <Navbar favorite={counterFavorite} cart={counterCart} user={user} />
          </Fragment>
        ) : (
          <Fragment>
            <SignedOut favorite={counterFavorite} cart={counterCart} handleModal={handleModal} modal={modal} />
          </Fragment>
        )}

        <Routes>
          <Route path="/">
            <Route path="login" element={<Login handleModal={handleModal} />} />
            <Route
              path="dashboard"
              element={
                <Home
                  handleFavorite={handleFavorite}
                  handleCart={handleCart}
                  handleDetail={handleDetail}
                  handleCategory={handleCategory}
                  handleDelete={handleDelete}
                />
              }
            />
            <Route
              path="home"
              element={
                <Home
                  handleFavorite={handleFavorite}
                  handleCart={handleCart}
                  handleDetail={handleDetail}
                  handleCategory={handleCategory}
                  handleDelete={handleDelete}
                  favorited={favorited}
                />
              }
            />
                <Route
              path="home/detail"
              element={
                <Detail
                  detail={detail}
                  handleFavorite={handleFavorite}
                  handleCart={handleCart}
                  handleDetail={handleDetail}
                  handleDelete={handleDelete}
                  user={user}
                />
              }
            />
                <Route
              path="home/search"
              element={
                <Search
                  category={category}
                  handleFavorite={handleFavorite}
                  handleCart={handleCart}
                  handleDetail={handleDetail}
                  handleDelete={handleDelete}
                />
              }
            />
            <Route
              path="home/favorites"
              element={
                <Favorites
                  favorite={favorite}
                  handleFavorite={handleFavorite}
                  handleCart={handleCart}
                  handleDetail={handleDetail}
                  handleDelete={handleDelete}
                />
              }
            />
              <Route path="home/cart" element={<Cart cart={cart} user={user} handleModal={handleModal} modal={modal}/>} />
              <Route path="home/checkout" element={<Checkout cart={cart}  user={user}/>} />

            <Route
              index
              element={
                <RequireAuth>
                  <Admin col="" key="0" title="Dashboard" />
                </RequireAuth>
              }
            />

            <Route path="admin/users">
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

            <Route path="admin/products">
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

            <Route path="admin/orders">
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

            <Route path="admin/deliveries">
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
              path="admin/stats"
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
              path="admin/profile"
              index
              element={
                <RequireAuth>
                  <Single
                    col="users"
                    inputs={profileInputs}
                    key="6"
                    uid={currentUser?.uid}
                    user={user}
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
          sx={{ width: "100%", backgroundColor: "#b1cba6", color: "black" }}
        >
          Item has been added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
