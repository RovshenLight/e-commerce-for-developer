import React from 'react'
import './home.css'
import Navbar from '../../compounts/navbar/Navbar'
import Category from '../../compounts/category/Category'
import Products from '../../compounts/products/Products'
import Footer from '../../compounts/footer/Footer'
import Ads from '../../compounts/ads/Ads'
import Header from '../../compounts/header/Header' 
import Email from '../../compounts/email/Email'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Header />
      <Ads />
      <Category />
      <Products />
      <Email />
      <Footer />
    </div>
  )
}

export default Home