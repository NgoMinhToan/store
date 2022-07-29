import React  from 'react'
import { useSelector } from 'react-redux'
import Item from './Item'
import './styles.scss'

const DanhSachSanPham = () => {
    const productList = useSelector(state => state.sanPham.danhSachSanPham)
    console.log(productList)

  return (
    <div className='product-list'>{productList && productList.map((item, index) => {
        return <Item data={item} key={index}/>
    })}</div>
  )
}

export default DanhSachSanPham