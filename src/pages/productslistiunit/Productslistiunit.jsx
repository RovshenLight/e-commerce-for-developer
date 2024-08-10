import React, { useEffect, useState } from 'react'
import './productslistiunit.css'
import Navbar from '../../compounts/navbar/Navbar'
import Ads from '../../compounts/ads/Ads'
import Email from '../../compounts/email/Email'
import Footer from '../../compounts/footer/Footer'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../basketRedax/basketRedax'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Productslistiunit = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [product, setProduct] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try{
        const res = await axios.get('https://fakestoreapi.com/products/' + id)
        setProduct(res.data);
        if (!res.data.color || !res.data.size) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
      }catch(err) {
        console.log(err)
      }
    }
    getProduct();
  }, [id])

  const handleCounter = (type) => {
    if(type === 'decs'){
     counter > 1 && setCounter( counter - 1 );
    }else {
      setCounter( counter + 1 )
    }
  }

  const handleBasket = () => {
    dispatch(
      addProduct({...product,counter })
    )
  };

  return (
    <div className='productslistiunit'>
      <Navbar />
      <Ads />
      <div className="prolistunit">
        <div className="img">
        <img src={product.image} alt={product.title} />
        </div>
        <div className="cont">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <span>$ {product.price}</span>
          {showAlert && (
            <div className='alert_colors'>
              <p>Color and size options are not available for this product.<br />
            Because does not exist parameters size and color in API 😊</p>
            </div>
          )}
          <div className='pro_unit_select'>
            <div className='pro_unit_colors'>
              <span>Color:
                <span className='pro_unit_color'></span>
              </span>
              <div>
                <span>Size:</span>
                <select>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>
            <div className='pro_unit_counts'>
              <div className="pro_unit_bag">
                <button style={{padding: '4px 10px'}} onClick={() => handleCounter("inc")}>+</button><span>{counter}</span><button onClick={() => handleCounter("decs")} style={{padding: '4px 10px'}} >-</button>
              </div>
              {isAuthenticated ? (
                <button onClick={handleBasket}>Add to bag</button>
              ) : (
              <>
            <button>
              <Link to='/Regist'>Sign Up for Purches</Link>
            </button>
            </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Email />
      <Footer />
    </div>
  )
}

export default Productslistiunit