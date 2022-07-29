import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  { useParams } from 'react-router-dom'
import * as Actions from '../../../actionTypes'

const SanPham = () => {
  const { id } = useParams();
  const count_in_cart = useSelector(state => state.cart.danhSachGioHang[id])
  const product = useSelector(state => state.sanPham.danhSachSanPham.find(sp => sp.id === Number(id)));
  const quantityRef = useRef(null);
  const dispatch = useDispatch();
  const add_to_cart = (e) => {
    e.preventDefault()
    console.log('add to cart')
    dispatch({type: Actions.ADD_TO_CART, payload: {id: id, quantity: quantityRef?.current?.value-0 || 1}})
  }
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className='page-product'>
      <div className="top-product-info">
        <p className="category">{product?.category}</p>
      </div>
      <div className="body-product-info">
        <div className="picture"><img src={product?.image} alt="" /></div>
        <div className="product-info">
          <p className="title">{product?.title.slice(0, 80)}{product?.title.length > 80 && '...'}</p>
          <p className="description">{product?.description.slice(0, 250)}{product?.description.length > 250 && '...'}</p>
          <p className="price">{numberWithCommas(product?.price)} đ</p>
          <div className="bottom-product-info">
            <div className="add-to-cart">
              <label htmlFor="count-product">Số lượng: </label>
              <input type="number" name='count-product' ref={quantityRef} min={1} defaultValue={1}/>
              <button onClick={add_to_cart} className='btn-add-to-cart'>
                Add to cart

                <div className="added-count"><span className={count_in_cart && 'orange'}>{count_in_cart && count_in_cart || 1}</span></div>
              </button>
            </div>
            <p className="rating">{`Rate: ${product?.rating?.rate} - ${product?.rating.count} lượt đánh giá`}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

// const getParam

export default SanPham