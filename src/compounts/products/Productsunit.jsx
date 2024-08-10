import React, { useState, useRef } from 'react';
import './products.css';
import { BiHeart } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { BsBasket2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../basketRedax/basketRedax';
import { Link } from 'react-router-dom';

const Productsunit = ({ prod }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [showAd, setShowAd] = useState(false);
  const [adPosition, setAdPosition] = useState({ x: 0, y: 0 });
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState([]);

  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch(addProduct({ ...prod, counter: 1 }));
  };

  const Alerting = () => (
    <div className="alert_logout" style={{ left: adPosition.x, top: adPosition.y }}>
      <h2>Special Offer!</h2>
      <p>Sign Up and Get 20% off for first purchase!</p>
      <Link to='/Regist'>Sign Up</Link>
    </div>
  );

  const handleShowAd = (e) => {
    const { clientX, clientY } = e;
    setAdPosition({ x: clientX, y: clientY });
    setShowAd(true);
    setTimeout(() => setShowAd(false), 3000);
  };

  const handleLikeClick = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setLiked(true);

    const newHearts = [];
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * 360;
      const radius = Math.random() * 50;
      const heartX = x + radius * Math.cos(angle);
      const heartY = y + radius * Math.sin(angle);
      newHearts.push({ x: heartX, y: heartY, id: Date.now() + i });
    }
    setHearts(newHearts);

    setTimeout(() => setLiked(false), 600);
    setTimeout(() => setHearts([]), 1000);
  };

  return (
    <div className='productsunit' ref={containerRef}>
      <img src={prod.image} alt={prod.title} />
      <div className="bg"></div>
      <div className="pro_icons">
        {isAuthenticated ? (
          <button onClick={handleAddToBasket}>
            <BsBasket2 />
          </button>
        ) : (
          <>
            <button onClick={handleShowAd}>
              <BsBasket2 />
            </button>
            {showAd && <Alerting />}
          </>
        )}
        <button><Link to={`/Productslistiunit/${prod.id}`}><BiSearch /></Link></button>
        <button className={`heart-icon ${liked ? 'animate' : ''}`} onClick={handleLikeClick}>
          <BiHeart />
        </button>
        <div className="heart-burst">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="heart"
              style={{ left: heart.x, top: heart.y }}
            >
              <BiHeart />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productsunit;
