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
import { mobile } from "../../responsive";

const Container = styled.div`
  // padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fbf0f4;
  ${mobile({ flexDirection: "column" })}
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
  padding: 10px;
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
        <div style={{ height: "35vh" }}>
          <Heading
            cart={cart}
            total={total}
            title="Checkout"
            subtitle={ 
              <Container>
               
              <div className="cartDetails">
                <h4 className="itemTitle">Shipping Address</h4>
                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{user.displayName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Payment:</span>
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
           
                    <div className="cartDetails">
                    <h4 className="itemTitle">Payment Details</h4>
                    <div className="detailItem">
                      <span className="itemKey">Customer:</span>
                      <span className="itemValue">{user.displayName}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Date:</span>
                      <span className="itemValue">{date}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Payment:</span>
                      <span className="itemValue">Visa (Test)</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Amount:</span>
                      <span className="itemValue">${total.toFixed(2)}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Card:</span>
                      <span className="itemValue">**************679</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">Pending</span>
                    </div>
                  </div>
                  </Container>
         
    }
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
                ? "Nice haul! Ready to checkout?" + total ? "Your total is $" + total.toFixed(2) + "." : "" 
                : "No items in your cart"
            }
          />
        </div>
      )}

      <div className="cart">
        <div className="cartContainer">
 

          <div className="datatable" style={{ height: "320px", backgroundColor: "#fcf5f5"}}>
            <DataGrid
              className="datagrid"
              rows={cart}
              columns={productColumns.concat(actionColumn)}
              pageSize={4}
              rowsPerPageOptions={[4]}
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
                      <div >
                        <form onSubmit={handleAdd} >
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
                            <Link to="/home/checkout" style={{  textDecoration: "none"}}>
                            <Button type="submit">
                              BUY NOW &nbsp;
                              <ShoppingCartCheckoutOutlinedIcon />
                            </Button>
                            </Link>
                          </div>
                        </form>
                      </div>
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
