import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import logo from '../../assets/Logo.gif' 
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { BsYoutube } from 'react-icons/bs'
import { BsTiktok } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_left">
        <Link to='/'><img src={logo} alt="logo" />The Light.</Link>
        <p>"Illuminate Your Style with The Light Company of Clothes – Where Elegance Meets Innovation."</p>
      </div>
      <div className="footer_right">
        <ul>Basic links
          <Link to='/'>About company</Link>
          <Link to='/'>Catalog</Link>
          <Link to='/'>Delivery</Link>
          <Link to='/'>Payment</Link>
        </ul>
        <ul>Categories
          <Link to='/'>Men's clothing</Link>
          <Link to='/'>Women's clothing</Link>
          <Link to='/'>Baby clothes</Link>
          <Link to='/'>For animals</Link>
        </ul>
        <ul>USEFUL LINKS
          <Link to='/'>Size table</Link>
          <Link to='/'>Fashion blog</Link>
          <Link to='/'>Our mission</Link>
        </ul>
        <ul>SOCIAL NETWORK
          <Link to='/'><BsInstagram /><span>Instagram</span></Link>
          <Link to='/'><BsFacebook /><span>Facebook</span></Link>
          <Link to='/'><BsYoutube /><span>YouTube</span></Link>
          <Link to='/'><BsTiktok /><span>TikTok</span></Link>
        </ul>
      </div>
    </div>
  )
}

export default Footer