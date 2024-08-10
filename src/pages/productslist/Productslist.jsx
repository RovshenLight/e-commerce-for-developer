import React, { useState } from 'react'
import './productslist.css'
import Navbar from '../../compounts/navbar/Navbar'
import Ads from '../../compounts/ads/Ads'
import Email from '../../compounts/email/Email'
import Footer from '../../compounts/footer/Footer'
import { useLocation } from 'react-router-dom'
import Products from '../../compounts/products/Products'

const Productslist = () => {

  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('Newest');

  const handleFilter = (event) => {

    const value = event.target.value
    setFilters({
      ...filters,
      [event.target.name]: value,
    });
  };

  return (
    <div className='productslist'>
      <Navbar />
      <Ads />
      <h1>{category}</h1>
      <div className="fillters">
        <div className="left">
          <span>Filter products:</span>
          <select name='color' onChange={handleFilter}>
            <option disabled>Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
          </select>
          <select name='size' onChange={handleFilter}>
            <option disabled>Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="left">
          <span>Filter products:</span>
          <select onChange={(event) => setSort(event.target.value)}>
            <option value="Newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products category={category} filters={filters} sort={sort}/>
      <Email />
      <Footer />
    </div>
  )
}

export default Productslist