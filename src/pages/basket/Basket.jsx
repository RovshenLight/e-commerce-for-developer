import React from 'react'
import './basket.css'
import Navbar from '../../compounts/navbar/Navbar'
import Ads from '../../compounts/ads/Ads'
import Email from '../../compounts/email/Email'
import Footer from '../../compounts/footer/Footer'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { addProduct, clearBasket, removeProduct } from '../../basketRedax/basketRedax';

const Basket = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const basket = useSelector(state => state.basket);

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };
  const handleIncrement = (product) => {
    dispatch(addProduct({
      id: product.id,
      title: product.title,
      price: product.price,
      counter: 1,
      image: product.image,
      size: product.size,
    }));
  };
  const handleDecrement = () => {
    dispatch(clearBasket());
  };

  return (
    <div className='basket'>
      <Navbar />
      <Ads />
      <div className="basket_inner">
        {isAuthenticated ? 
        <h1>Your Bag</h1> : 
          <h1>Sign Up for Will not be empty</h1>
        }
        {isAuthenticated ? 
        <div className="top">
          <>
          {basket.total === 0 ? <button><Link to='/'>Go To Shop</Link></button>
          :
          <button><Link to='/'>Continue Shopping</Link></button>
        }
        </>
          <div className="top_center">
          </div>
          <button onClick={handleDecrement}>Remove All</button>
        </div> : ''
        }
        <div className="bas_cont">
        {basket.products.length === 0 ? (
            <p></p>
          ) : (
            basket.products.map((product) => (
              <div className="bas_left" key={product.id}>
                <div className="img">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="bas_left_center">
                  <div className="left_info">
                    <span><span className='span'>Product:</span>{product.title}</span>
                    <span><span className='span'>ID:</span>{product.id}</span>
                    <span className='color'></span>
                    <span><span className='span'>Size:</span>{product.size || 'N/A'}</span>
                  </div>
                  <div className="bas_left_count">
                    <span className='count'>
                      <button onClick={() => handleIncrement(product)}>+</button>
                       <span className='blya'>{product.counter}</span>
                      <button onClick={() => handleRemoveProduct(product.id)}>-</button>
                    </span>
                    <span className='count'>$ {product.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
          {isAuthenticated ? 
          <div className="bas_right">
            <div className="bas_right_cont">
              <h1>Order Summery</h1>
              <div className="bas_right_texts">
                <span>Subtotal <span>$ {basket.total}</span></span>
                <span>Estimated Shipping <span>$5.90</span></span>
                <span>Shipping Discount<span>-$5.90</span></span>
                <span>Total<span>$ {basket.total}</span></span>
              </div>
              {basket.total === 0 ? 
              <button><Link to='/'>Purschase Something</Link></button>
              :
              <button><Link to='/Card'>Checkout Now</Link></button>
            }
            </div>
          </div> : ''
          }
        </div>
      </div>
      <Email />
      <Footer />
    </div>
  )
}

export default Basket