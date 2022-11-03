import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from "../../responsive";

const Container = styled.div`
flex: 1;
margin: 3px;
height: 70vh;
position: relative;
border: 0px solid white;

`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
${mobile({ height: "25vh"})}
`

const Info = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Title = styled.h1`
color: white;
margin-bottom: 20px;
`

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

const CategoryItem = ({item, handleCategory}) => {
  return (
    <Container>
        <Image src={item.img} />
        <Info>
           <Title>{item.title}</Title>
         <Link to="/home/search"><Button value={item.title} onClick={e => handleCategory(e.target.value)}>SHOP NOW</Button></Link> 
        </Info>


    </Container>
  )
}

export default CategoryItem