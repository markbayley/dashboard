import React from "react";
import Heading from "../client/Heading";
import Product from "../client/Product";
import styled from "styled-components";
import { CheckBox, NoBackpackSharp } from "@mui/icons-material";
import Announcement from "../client/Announcement";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fcf5f5;
`;

const Item = styled.div`
  flex: 1;
  margin: 5px;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // background-color: white;
  position: relative;
  flex-wrap: wrap;
  font-size: 24px;
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
`;

const Button = styled.button`
  padding: 15px;
  background-color: teal;
  border-radius: 5px;
  margin-top: 0px;
  color: white;
  border: none;

  font-size: 22px;
`;

export const Detail = ({ detail, handleCart }) => {
  console.log(detail, "detail");
  const item = detail;
  return (
    <>
      <Announcement />
      <Container>
        {/* <Product item={detail} /> */}
        <Item>
          <MainImage
            src={
              detail.img
                ? detail.img
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            width="95%"
          />
          <div>
            <Image
              src={
                detail.img2
                  ? detail.img2
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
              src={
                detail.img3
                  ? detail.img3
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
              src={
                detail.img4
                  ? detail.img4
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
              src={
                detail.img5
                  ? detail.img5
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
            <Image
              src={
                detail.img6
                  ? detail.img6
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="95%"
            />
          </div>
        </Item>

        <Item>
          <Heading title={detail.title} subtitle={detail.description} price={detail.price}/>
    
          <h1>${detail.price}.95 </h1>
          
      
     
              <Button key={item.id} onClick={(e) => handleCart(item)}>
                Buy Item
              </Button>
           
            
<Container>
             <Item><CheckBox></CheckBox>{detail.status}</Item> 
             <Item>{detail.category}</Item> 
             </Container>
          
        </Item>
        
        <Item>

        </Item>
      </Container>
    </>
  );
};
