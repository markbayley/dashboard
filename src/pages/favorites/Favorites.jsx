import React from 'react'
import styled from "styled-components";
import Announcement from '../home/Announcement';
import Heading from '../home/Heading';
import Product from '../home/Product';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #fbf0f4;
`;

const Favorites = ({favorite, 
    handleFavorite,
    handleCart,
    handleDetail,
    handleDelete}) => {
    console.log(favorite, 'favorite-fav')
  return (
    <>
    <Announcement />
    <Heading title="Favorites" subtitle={ favorite.length > 0 ? "We love your taste!  Add these items to your cart?" : "No items have been favorited yet" } />
    <Container>
     
    {favorite.map((item) => (
      <Product 
      item={item} 
      key={item.id}  
      handleFavorite={handleFavorite}
      handleCart={handleCart}
      handleDetail={handleDetail}
      handleDelete={handleDelete}/>
    ))}


  </Container>
  </>
  )
}

export default Favorites