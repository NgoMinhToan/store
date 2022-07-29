import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Item = ({data: {id, title, image, price}}) => {
  const count_in_cart = useSelector(state => state.cart.danhSachGioHang[+id])
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Link to={`/san-pham/${id}`} className='item-san-pham'>
        <div className='added-count'>
          <span className={count_in_cart && 'orange'}>{count_in_cart && count_in_cart || 1}</span>
        </div>
        <div className="image-product">
            <img src={image} alt=""/>
        </div>
        <div className="info-product">
            <div className="title-product"><p>{title.slice(0,60)}{title.length>60 && '...'}</p></div>
            <div className="price-product"><p>{numberWithCommas(price)} đ</p></div>
        </div>
    </Link>
  )
}

export default Item