import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Categoryunit = ({cat}) => {
  return (
    <div className='categoryunit'>
      <div className='cat'>
      <img src={cat.img} alt="" />
      <div className="cat_title">
        <h1>{cat.title}</h1>
        <button><Link to={`/Productslist/${cat.category}`}>Shop now</Link></button>
      </div>
      </div>
    </div>
  )
}

export default Categoryunit