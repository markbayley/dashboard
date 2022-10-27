import React from 'react'
import styled from "styled-components";
import Heading from '../client/Heading';
import Product from '../client/Product';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #fbf0f4;
`;

const Cart = ({cart}) => {
  return (
    <>
    <Heading title="Cart" subtitle="Nice haul! Ready to checkout?"/>
    <Container>
     
    {cart.map((item) => (
      <Product item={item} key={item.id} />
    ))}


  </Container>
  </>
  )
}

export default Cart