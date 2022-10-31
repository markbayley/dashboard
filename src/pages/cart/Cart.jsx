import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Announcement from '../home/Announcement';
import Heading from '../home/Heading';
import Product from '../home/Product';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fbf0f4;
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

`

const Cart = ({cart}) => {
   

    let total = 0;
    cart.forEach((item) => {
      total = total + item.price;
    });

    console.log(total, 'total-cart')

  return (
    <>
    <Announcement  />
    <Heading cart={cart} total={total} title="Cart" subtitle="Nice haul! Ready to checkout?"/>
   <div style={{display: "flex", justifyContent: "center", backgroundColor: "#fbf0f4" }}> <Link to="/admin/checkout" style={{textDecoration: "none"}}><Button>CHECKOUT &nbsp;<ShoppingCartCheckoutOutlinedIcon /></Button></Link></div>
    <Container>
   
    {cart.map((item) => (
      <Product item={item} key={item.id} />
    ))}


  </Container>
  </>
  )
}

export default Cart