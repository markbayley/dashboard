import React, { useState } from "react";
import Heading from "../client/Heading";
import Product from "../client/Product";
import styled from "styled-components";
import { CheckBox, FavoriteBorderOutlined, NoBackpackSharp, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import Announcement from "../client/Announcement";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import Products from "../client/Products";
import { Reviews } from "./Reviews";


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fcf5f5;
`;

const Item = styled.div`
  flex: 1;
  margin: 5px;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: white;
  position: relative;
  flex-wrap: wrap;
  font-size: 20px;
  border: 1px solid lightgray;
  padding: 20px;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fbf0f4;
  position: absolute;
`;

const MainImage = styled.img`
  height: 95%;
  z-index: 2;
  width: 500px;
  height: 470px;
  margin-right: 10px;
`;

const Image = styled.img`
  height: 95%;
  z-index: 2;
  max-width: 90px;
  max-height: 90px;
  margin-right: 10px;
  margin-top: 10px;
  transition: all 0.5s ease;
  &:hover {
  opacity: 0.8;
  transform: scale(1.02);
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: orange;
  border-radius: 5px;
  margin-top: 0px;
  color: white;
  border: none;
  font-size: 18px;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
      cursor: pointer;
    }
`;

  
const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`;



const Title = styled.div`
height: 5%;

`

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: lightgray;
 color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: orange;
    transform: scale(1.02);
    cursor: pointer;
    color: white;
    opacity: 0.9;
  }
`;

export const Detail = ({ detail, handleCart, handleFavorite, handleDetail }) => {
  console.log(detail, "detail");

  const [ main, setMain] = useState(detail.img)

 

  const item = detail;
  return (
    <>
      <Announcement />
 
      <Container>
        {/* <Product item={detail} /> */}
        <Item>
          <MainImage
            src={
              main
                ? main
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            width="95%"
          />
          <div>
            <Image
            onClick={(e) => setMain(e.target.src)}
              src={
                detail.img
                  ? detail.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
             onClick={(e) => setMain(e.target.src)}
              src={
                detail.img2
                  ? detail.img2
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
              onClick={(e) => setMain(e.target.src)}
              src={
                detail.img3
                  ? detail.img3
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
             onClick={(e) => setMain(e.target.src)}
              src={
                detail.img4
                  ? detail.img4
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
             onClick={(e) => setMain(e.target.src)}
              src={
                detail.img5
                  ? detail.img5
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
          </div>
        </Item>

        <Item>
      
          <Heading
            title={detail.title}
            subtitle={detail.description}
          
          />

          <h2 style={{ fontWeight: "300", paddingRight: "30px" }}>${detail.price}.95 </h2>

          <Button  onClick={(e) => handleCart(item)}>
           ADD ITEM
          </Button>
          <Container>
           &nbsp;   &nbsp;   &nbsp;   &nbsp;
          <Icon  onClick={(e) => handleCart(item)}>
            <ShoppingCartOutlined />
          </Icon>
          <Link to={"/detail"}>
          <Icon  onClick={(e) => handleDetail(item)}>
            <SearchOutlined  />
          </Icon>
          </Link >
          <Icon    onClick={(e) => handleFavorite(item)}>
            <FavoriteBorderOutlined/>
          </Icon>
         
       
          </Container>
          <Container>

</Container>
          <Container>
            <Item>
              <CheckBox></CheckBox>&nbsp;This item is {(detail.status)}. {detail.units} available.
            </Item>
            {/* <Item>{detail.category}</Item>  */}
          </Container>
        </Item>

        <Item  style={{height: "76vh", overflow: "scroll"}}>  
      
        <Reviews detail={detail} />
          </Item>
      </Container>
    
    </>
  );
};
