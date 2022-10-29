import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { Delete, DeleteOutlineOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
  import styled from "styled-components";
  
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
  
  const Container = styled.div`
  
    flex: 1;
    margin: 5px;
    min-width: 280px;
    max-width: 280px;
    height: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #fbf0f4;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 80%;
    z-index: 2;
    max-width: 280px;
    padding-top: 7px;
  `;

  const Title = styled.div`
   padding-top: 20px;
   display: flex;
   font-size: auto;
   color: gray;

  
  `
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    z-index: 10;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  
  `;
  
  const Product = ({ item, handleFavorite, handleCart, handleDetail, handleDelete }) => {

    return (  
      <Container >
        <Circle />
        <Image src={item.img} width="95%"/>
       
        <Info>

          <Icon>
            <ShoppingCartOutlined id={item.id} onClick={(e) => handleCart(item)}/>
          </Icon>

          <Icon>
            
          <Link to={"/detail"} >
            <SearchOutlined id={item.id} onClick={(e) => handleDetail(item)} style={{color: "black", paddingTop: "5px"}} />
            </Link>
          </Icon>
        

          <Icon>
            <FavoriteBorderOutlined id={item.id} onClick={(e) => handleFavorite(item)}/>
          </Icon>

          <Icon >
            <DeleteOutlineOutlined id={item.id} onClick={(id) => handleDelete(id)}  />
          </Icon>
         
        </Info>
       <Title><div>{item.title}</div>&nbsp;&nbsp;&nbsp;&nbsp;<div>${item.price}</div></Title> 
     
      </Container>
    );
  };
  
  export default Product;