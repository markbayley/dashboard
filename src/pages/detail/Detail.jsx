import React, { useState } from "react";
import Heading from "../home/Heading";
import Product from "../home/Product";
import styled from "styled-components";
import {
    Check,
  CheckBox,
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  DetailsTwoTone,
  DiscountOutlined,
  EnergySavingsLeaf,
  FavoriteBorderOutlined,
  HealthAndSafety,
  NightShelterOutlined,
  NumbersOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Announcement from "../home/Announcement";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import Products from "../home/Products";
import { Reviews } from "./Reviews";
import { mobile } from "../../responsive";
  


const Container = styled.div`
  padding: auto;
  display: flex;
  flex-wrap: wrap;
  //   justify-content: center;
  background-color: #fcf5f5;
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

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fbf0f4;
  position: absolute;
`;




const MainImage = styled.img`
  z-index: 2;
  width: 100%;
  border: 3px solid white;
  //   margin-right: 10px;
`;

const Image = styled.img`
  //   height: 95%;
  width: 17.5%;
  border: 3px solid white;
  z-index: 2;
  //   max-width: 90px;
  //   max-height: 90px;
  margin: auto;

  transition: all 0.5s ease;
  &:hover {
    opacity: 0.8;
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const Button = styled.button`
border: none;
padding: 15px;
background-color: orange;
color: white;
cursor: pointer;
font-weight: 600;
border-radius: 5px;
transition: all 0.5s ease;
&:hover {
  opacity: 0.9;
  transform: scale(1.02);
    cursor: pointer;
  }

`

const Title = styled.h1`
font-size: 32px;
text-transform: capitalize !mportant;

`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 300;


   padding: 20px 50px;
//   ${mobile({ textAlign: "center" })}
`;


const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #b1cba6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    color: black;
    opacity: 0.9;
  }
`;

export const Detail = ({
  detail,
  handleCart,
  handleFavorite,
  handleDetail,
  handleDelete,
  user
}) => {
  console.log(detail, "detail");

  const [main, setMain] = useState(detail.img);

  const item = detail;
  return (
    <>
      <Announcement />

      <Container >
        {/* <Product item={detail} /> */}
        <Item style={{ display: "flex", alignItems: "flex-start", padding: "5px"}}>
        <div style={{ display: "" }}>
          <MainImage
            src={
              main
                ? main
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            // width="80%"
          />
         <div style={{ display: "flex", marginTop: "10px" }}>
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
          </div>
        </Item>

        <Item style={{  borderRight: "3px solid white"}}>
        <div>
          <Title style={{ padding: "15px", borderRadius: "5px", fontWeight: "500", textAlign: "center"}}> {detail.title ? detail.title : "Oops, Something Broke"} </Title>
          
          <Desc >{detail.description ? detail.description :  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem doloribus veritatis magnam illum, corporis cumque tenetur. Maiores, laborum cumque? Aperiam similique sunt nostrum labore accusantium? Tenetur facere eum aperiam ut!</p>  }</Desc>
          </div>
         
          <Container style={{width: "100%", margin: "20px"}}>
      
            <Item >
           
          <h2 style={{ fontWeight: "500", paddingRight: "30px" }}>
            ${detail.price ? detail.price : "0.00"}{" "}
          </h2>

          <Button onClick={(e) => handleCart(item)}>ADD TO CART</Button>
       
          </Item>
          
          </Container>
        
          <Container>
            <Item>
            {/* &nbsp;   &nbsp;   &nbsp;   &nbsp; */}
            <Icon onClick={(e) => handleCart(item)}>
              <ShoppingCartOutlined />
            </Icon>
            <Link to={"/detail"}>
              <Icon onClick={(e) => handleDetail(item)}>
                <SearchOutlined />
              </Icon>
            </Link>
            <Icon onClick={(e) => handleFavorite(item)}>
              <FavoriteBorderOutlined />
            </Icon>
            </Item>
          </Container>
          <Desc >This item {parseInt(detail.sold) > 300 ? " is a best seller!" : parseInt(detail.price) <= 30 ? " is on sale right now!" : " includes free shipping!"}</Desc>
          <Container style={{marginBottom: "30px"}}>
            <Item>
              <CheckBoxRounded/>&nbsp;
             
                Item {detail.status} &nbsp;&nbsp;&nbsp;&nbsp;
               
          <DiscountOutlined />&nbsp; {detail.units} Available &nbsp;&nbsp;&nbsp;&nbsp;
             
           { detail.category === "Health Care" ? <HealthAndSafety /> : detail.category === "Eco Friendly" ? <EnergySavingsLeaf /> : detail.category === "Home Decor" ?  <NightShelterOutlined />  : ""   }&nbsp;{detail.category}
         
           </Item> 
        
          </Container>
        </Item>

        <Item style={{ height: "88vh", overflow: "scroll"}}>
          <Reviews detail={detail} user={user} />
        </Item>
      </Container>
    </>
  );
};
