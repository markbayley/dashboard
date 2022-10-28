import React from 'react'
import styled from 'styled-components'
import { categories } from './data'
import CategoryItem from './CategoryItem'
import { mobile } from "../../responsive";

const Container = styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
background-color: #fbf0f4;
${mobile({ flexDirection: "column"})}

`

const Categories = ({handleCategory}) => {
  return (
    <Container>
        {categories.map(item => (
          <CategoryItem item={item} key={item.id} handleCategory={handleCategory} />
        ))}
    </Container>
  )
}

export default Categories