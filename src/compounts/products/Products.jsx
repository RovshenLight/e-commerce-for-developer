import React, { useEffect, useState } from 'react'
import './products.css'
import Productsunit from './Productsunit.jsx'
import axios from 'axios'

const Products = ({category, filters, sort}) => {

  
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try{
        const res = await axios.get(category ? `https://fakestoreapi.com/products/category/${category}` 
          : 'https://fakestoreapi.com/products')
            setProduct(res.data);
      }catch(err){
        console.error(err);
      }
    };
    getProduct();
  }, [category])
  
  useEffect(() => {
    if (category) {
      const filtered = filters && Object.keys(filters).length
        ? product.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key] ? item[key].includes(value) : false
            )
          )
        : product;

      setFilteredProducts(filtered);
      if (filtered.length === 0 && product.length > 0) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }
  }, [product, category, filters]);


  useEffect(() => {
    if(sort === 'Newest') {
      setFilteredProducts(prev => 
      [...prev].sort((a, b) => a.selected - b.selected)
      )
    } else if(sort === 'asc') {
      setFilteredProducts(prev => 
      [...prev].sort((a, b) => a.price - b.price)
      )
    } else {
      setFilteredProducts(prev => 
      [...prev].sort((a, b) => a.price - b.price)
      )
    }
  }, [sort])


  return (
    <div className='products'>
      {showAlert && <div className='alert'>No products match your filters.</div>}
      {category ?
        filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <Productsunit key={prod.id} prod={prod} />
          ))
        ) : (
          <p>Not fetching or Does not Exist in API</p>
        )
        :
        product.slice(14, 21).map((prod) => (
          <Productsunit key={prod.id} prod={prod} />
        ))
      }
    </div>
  )
}

export default Products