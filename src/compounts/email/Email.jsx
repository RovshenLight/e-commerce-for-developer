import React from 'react'
import './email.css'
import { BiSend } from 'react-icons/bi'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Email = () => {
  return (
    <div className='email'>
        <div className="email_title">
        <h1>RECEIVE DISCOUNTS AND GIFTS</h1>
        </div>
        <div className="email_input">
        <input type='email' />
        <button><Link to='/'><BiSend /></Link></button>
        </div>
    </div>
  )
}

export default Email