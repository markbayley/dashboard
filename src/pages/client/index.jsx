
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import SignedOut from '../../components/navbar/SignedOut'
import Announcement from './Announcement'
import Categories from './Categories'
import Slider from './Slider'
import Products from './Products'
import Newsletter from './Newsletter'
import Footer from './Footer'

function Client() {
  return (
   <>
   
   <Announcement />
    <Slider />
 
    <Categories />
    <Products />
    <Newsletter />
    <Footer />
   
   
   </>
  )
}

export default Client