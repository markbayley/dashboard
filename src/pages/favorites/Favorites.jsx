import React from 'react'
import styled from "styled-components";
import Announcement from '../client/Announcement';
import Heading from '../client/Heading';
import Product from '../client/Product';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #fbf0f4;
`;

const Favorites = ({favorite}) => {
  return (
    <>
    <Announcement />
    <Heading title="Favorites" subtitle="We love your taste!  Add these items to your cart?"/>
    <Container>
     
    {favorite.map((item) => (
      <Product item={item} key={item.id} />
    ))}


  </Container>
  </>
  )
}

export default Favorites