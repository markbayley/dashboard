import React, { useState } from "react";
import "./cart.scss";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../home/Announcement";
import Heading from "../home/Heading";
import Product from "../home/Product";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns, productColumns } from "../../datatablesource";
import { DeleteForever, Edit } from "@mui/icons-material";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { orderInputs } from "../../formSource";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fbf0f4;
`;

const Item = styled.div`
  flex: 1;
  //   margin: 10px;
  //   background-color: #fcf5f5;
  background-color: #ffd5b144;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: white;
  position: relative;
  flex-wrap: wrap;
  //   font-size: 20px;
  //   border: 1px solid lightgray;
  //   padding: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: orange;
  display: flex;
  align-items: center;
  padding: 15px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: rgba(3, 92, 92, 0.322);
    cursor: not-allowed;
  }
`;

const Cart = ({ cart, user, handleModal, modal }) => {
  let total = 0;
  cart.forEach((item) => {
    total = total + item.price;
  });

  console.log(user, "user-cart");

  const [purchasing, setPurchasing] = useState(false);

  console.log(cart, "cart-cart");

  const date = new Date().toLocaleDateString();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      await setDoc(doc(db, "orders", res.user.uid), {
        ...cart[0],
        date: date,
        amount: total,
        customer: user.displayName,
        status: "Pending",
        product: cart[0].title,
        payment: "Test",

        timeStamp: serverTimestamp(),
      });
      // navigate(-1);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              // to={"/admin/" + col + "/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">
                <Edit className="icon" />
              </div>
            </Link>

            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              <DeleteForever className="icon" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Announcement />

      {purchasing ? (
        <div style={{ height: "20vh" }}>
          <Heading
            cart={cart}
            total={total}
            title="Checkout"
            subtitle=""
          />
        </div>
      ) : (
        <div style={{ height: "20vh" }}>
          <Heading
            cart={cart}
            total={total}
            title="Cart"
            subtitle={
              cart.length > 0
                ? "Nice haul! Ready to checkout?"
                : "No items in your cart"
            }
          />
        </div>
      )}

      <div className="cart">
        <div className="cartContainer">
          { purchasing ? 
          <div className="cartDetails">
            {/* <h2 className="itemTitle">{user.displayName}</h2> */}
            <div className="detailItem">
              <span className="itemKey">Name:</span>
              <span className="itemValue">{user.displayName}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Email:</span>
              <span className="itemValue">{user.email}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Phone:</span>
              <span className="itemValue">{user.phone}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Address:</span>
              <span className="itemValue">{user.address}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Country:</span>
              <span className="itemValue">{user.country}</span>
            </div>
          </div>
          : 

          ""
}

          <div className="datatable" style={{ height: "250px" }}>
            <DataGrid
              className="datagrid"
              rows={cart}
              columns={productColumns.concat(actionColumn)}
              pageSize={2}
              rowsPerPageOptions={[2]}
              checkboxSelection
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#fbf0f4",
            }}
          >
            {user ? (
              <>
                <div className="cart">
                  <div className="cartContainer">
                    {purchasing ? (
                      <>
                        <form onSubmit={handleAdd}>
                          {orderInputs.map((input) => (
                            <div className="formInput" key={input.id}>
                              {/* <label>{input.label}</label> */}
                              <input id={input.id} type="hidden" />
                            </div>
                          ))}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              width: "98%",
                            }}
                          >
                            <Button type="submit">
                              BUY NOW &nbsp;
                              <ShoppingCartCheckoutOutlinedIcon />
                            </Button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "98%",
                        }}
                      >
                        <Button
                          onClick={() => setPurchasing(true)}
                          disabled={cart.length === 0}
                        >
                          CHECKOUT &nbsp;
                          <ShoppingCartCheckoutOutlinedIcon />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
 
        </div>
      </div>
    </>
  );
};

export default Cart;
