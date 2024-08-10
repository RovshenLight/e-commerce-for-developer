import React, { useState, useEffect } from 'react';
import './card.css';
import { useDispatch } from 'react-redux'
import {  clearBasket } from '../../basketRedax/basketRedax';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

function Card() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('Your Name Here');
  const [validity, setValidity] = useState('06/28');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDecrement = (e) => {
    e.preventDefault(); 
    dispatch(clearBasket());
    Cookies.set('paymentCompleted', 'true', { expires: 1 });
    setShowConfetti(true);
    setTimeout(() => {
      history.push('/');
    }, 3000);
  };
  const handleCardNumberChange = (e) => {
    const inputNumber = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(inputNumber);
  };

  const handleReset = () => {
    Cookies.remove('paymentCompleted');
    history.push('/');
  };


  const handleCardHolderChange = (e) => {
    const name = e.target.value.slice(0, 30);
    setCardHolderName(name || '');
  };

  const handleValidityChange = (e) => {
    const inputString = e.target.value;
    if (inputString.length < 1) {
      setValidity('06/28');
      return;
    }
    const parts = inputString.split('/');
    const year = parts[1];
    const month = parts[0];
  setValidity(`${month}/${year}`);
  };

  const handleCvvChange = (e) => {
    const userInput = e.target.value.slice(0, 3).replace(/\D/g, '');
    setCvv(userInput);
    console.log('CVV Changed, flipping card');
    setIsFlipped(true);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#card') && isFlipped) {
        setIsFlipped(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFlipped]);

  return (
    <div className="layer">
          {showConfetti && (
          <div className="container">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}
              ></div>
            ))}
          </div>
        )}
    <div className="wrapper">
      <div className={`credit-card ${isFlipped ? 'flipped' : ''}`} id="card">
        <div className="card-front">
          <div className="branding">
            <img src="https://static.vecteezy.com/system/resources/previews/009/400/645/large_2x/sim-card-clipart-design-illustration-free-png.png" className="chip-img" alt="Chip" />
            <img src="https://static.vecteezy.com/system/resources/previews/020/975/570/non_2x/visa-logo-visa-icon-transparent-free-png.png" className="visa-logo" alt="Visa" />
          </div>
          <div className="card-number">
            <div>{cardNumber.padEnd(16, '_').match(/.{4}/g).map((chunk, i) => (
              <div key={i}>{chunk.split('').map((char, j) => (
                <span key={j} className="card-number-display">{char}</span>
              ))}</div>
            ))}</div>
          </div>
          <div className="details">
            <div>
              <span>Card Holder</span>
              <span id="card-holder-name">{cardHolderName}</span>
            </div>
            <div>
              <span>Expires</span>
              <span id="validity">{validity}</span>
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="black-strip"></div>
          <div className="white-strip">
            <span>CVV</span>
            <div id="cvv-display">{cvv}</div>
          </div>
          <img src="https://static.vecteezy.com/system/resources/previews/020/975/570/non_2x/visa-logo-visa-icon-transparent-free-png.png" className="visa-logo" alt="Visa" />
        </div>
      </div>
      <form>
        <label htmlFor="card-number">Card Number</label>
        <input
          type="text"
          id="card-number"
          placeholder="1234123412341234"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        <label htmlFor="card-name-input">Card Holder:</label>
        <input
          type="text"
          id="card-name-input"
          placeholder="Your Name"
          value={cardHolderName}
          onChange={handleCardHolderChange}
        />
        <div className="date-cvv">
          <div>
            <label htmlFor="validity-input">Expires On:</label>
            <input
              type="month"
              id="validity-input"
              value={validity}
              onChange={handleValidityChange}
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              placeholder="***"
              value={cvv}
              onChange={handleCvvChange}
              onClick={() => setIsFlipped(true)}
            />
          </div>
        </div>
        {handleReset ? <button onClick={handleDecrement}>Pay</button>
        :
        <button onClick={handleReset}>Continuer to Shopping</button>}
      </form>
    </div>
    </div>
  );
}

export default Card;
