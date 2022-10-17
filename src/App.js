import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, orderInputs, profileInputs, statsInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Stats from "./pages/stats/Stats";

function App() {

  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home col=""/>
                </RequireAuth>
              }
            />

            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List col="users" key="1" />
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
                    <New inputs={userInputs} title="Add New User" col="users" />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <List col="products" key="2" />
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
                    <List col="orders" key="3" />
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
                    <List col="deliveries" key="4" />
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

            <Route path="stats">
              <Route
                index
                element={
                  <RequireAuth>
                    <Stats col="stats" key="5"  inputs={statsInputs} />
                  </RequireAuth>
                }
              />
             
             
            </Route>
            
            <Route path="profile">
              <Route
                index
                element={
                  <RequireAuth>
                    {/* <List col="profile" key="6" /> */}
                    <Single col="users" inputs={profileInputs} title="My Profile" key="6" uid={currentUser.uid}/>
                  </RequireAuth>
                }
              />
            
            </Route>
         
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
