
import React from 'react'
import "./home.scss"
import Navbar from '../../components/navbar/Navbar'
import SignedOut from '../../components/navbar/SignedOut'
import Announcement from './Announcement'
import Categories from './Categories'
import Slider from './Slider'
import Products from './Products'
import Newsletter from './Newsletter'
import Footer from './Footer'
import Heading from './Heading'

function Client({handleFavorite, handleCart, handleDetail, handleCategory, handleDelete}) {
  return (
   <>
   
   <Announcement />
    <Slider handleCategory={handleCategory} />
 <Heading title="Categories" subtitle="Get 30% OFF On Our Summer SALE!"/>
    <Categories handleCategory={handleCategory} />
    <Heading title="Popular Products" subtitle="Eco Friendly and Responsibly Sourced"/>
    <Products handleFavorite={handleFavorite} handleCart={handleCart} handleDetail={handleDetail} handleDelete={handleDelete} />
    <Newsletter />
    <Footer />
   
   
   </>
  )
}

export default Client