import React from 'react'
import './category.css'
import Categoryunit from './Categoryunit'
import {category} from '../../data/data'

const Category = () => {
  return (
    <div className='category'>
      {category.map((cat) => <Categoryunit cat={cat} key={cat.id} />)}
    </div>
  )
}

export default Category