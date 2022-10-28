import React from 'react'
import "./search.scss"
import Announcement from '../client/Announcement'
import Heading from '../client/Heading'
import Products from '../client/Products'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const Search = ({category}) => {
  return (
<>
    <Announcement />
    <Heading title={category} subtitle="A range to make you smile" />
    <div className='wrapper'>
    <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon"/>
        </div>
        </div>
    <Products category={category}/>
    </>
  )
}

