import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ toggleModal }) => {
  return (
    <div className='header'>
      <div className="navigation">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/cart'>Giỏ hàng</NavLink>
        <NavLink to='/order'>Hóa đơn</NavLink>
        {/* <NavLink to='/them-san-pham'>Thêm sản phẩm</NavLink> */}
        <a onClick={toggleModal} href='#'>Thêm sản phẩm</a>
      </div>

    </div>
  )
}

export default Header