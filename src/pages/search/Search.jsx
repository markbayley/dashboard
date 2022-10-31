import React from 'react'
import "./search.scss"
import Announcement from '../home/Announcement'
import Heading from '../home/Heading'
import Products from '../home/Products'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const Search = ({category, handleFavorite, handleCart, handleDetail}) => {
  return (
<>
    <Announcement />
    <Heading title={category} subtitle={ category === "SUMMER SALE" ? "All items below under $30!" : category === "BEST SELLERS" ? "Our most popular products" : "A range to make you smile"} />
    <div className='wrapper'>
    <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon"/>
        </div>
        </div>
    <Products category={category} handleFavorite={handleFavorite} handleCart={handleCart} handleDetail={handleDetail}/>
    </>
  )
}

