import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import logo from '../../assets/Logo.gif'
import { BiSearch } from 'react-icons/bi'
import { BiBasket } from 'react-icons/bi'
import { IoClose, IoMenu } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../basketRedax/userRedux'
import axios from 'axios'
import Cookies from 'js-cookie';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [openBar, setOpenBar] = useState(false);
  const [openSearch, setOpenSearch] = useState(true);
  const counter = useSelector(state => state.basket.counter);
  const [product, setProduct] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredPro, setFilteredPro] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch(); 

  useEffect(() => {
   const getProduct = async () => {
      try{
       const res = await axios.get('https://fakestoreapi.com/products')
        setProduct(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    getProduct();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchInput(query);
    
    const filtered = product.filter(pro => 
      pro.title.toLowerCase().includes(query)
    );
    setFilteredPro(filtered);
  };

  const handleLogout = () => {
    Cookies.remove('authToken'); 
    dispatch(logout());
    history.push('/');
  };

  
  const BadgeIcon = ({ icon: Icon, badgeContent, ...props }) => (
    <div className="badge-icon-container" {...props}>
      {isAuthenticated ? (
      <>
      <Icon className="badge-icon" />
      {badgeContent > 0 && (
        <span className="badge">{badgeContent}</span>
      )} </> ) : ''}
    </div>
  );

  return (
    <div className='navbar'>
      <nav>
      {!isAuthenticated ? (
          <>
            {openBar ? (
              <IoClose className='mob_icone' onClick={() => setOpenBar(false)} />
            ) : (
              <IoMenu className='mob_icone' onClick={() => setOpenBar(true)} />
            )}
            {openBar && (
              <div className="mobile_user scale-up-hor-left">
                <Link to='/Regist'>Sign Up</Link>
                <Link to='/Login'>Sign In</Link>
              </div>
            )}
            <div className="user">
              <Link to='/Regist'>Sign Up</Link>
              <Link to='/Login'>Sign In</Link>
            </div>
          </>
        ) : (
          <button className='logout_btn' onClick={handleLogout}>Log Out</button>
        )}
        <Link to='/'>
          <img className='logo' src={logo} alt="logo" />
          <span>The Light.</span>
        </Link>
        <div className='right'>
          <div className="search">
          <input type="search" value={searchInput} onChange={handleSearch} />
          <button onClick={() => setOpenSearch(!openSearch)}>
         <BiSearch/>
         </button>
          {openSearch && filteredPro.length > 0 && (
              <div className="search-results">
                <ul>
                  {filteredPro.map((result) => (
                    <li key={result.id}>
                      <Link to={`/Productslistiunit/${result.id}`}>{result.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>  
            )}
          </div>
          <div className="basket">
            <Link to='/Basket'><BadgeIcon icon={BiBasket} badgeContent={counter} /></Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar