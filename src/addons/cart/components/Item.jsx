import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../../actionTypes'

const Item = ({ id_product, quantity, setPurchase }) => {
    const product = useSelector(state => state.sanPham.danhSachSanPham.find(item => item.id === Number(id_product)))
    console.log(product)
    
    const dispatch = useDispatch()
    const handleRemove = () => {
        dispatch({
            type: Actions.REMOVE_FROM_CART,
            payload: {
                id: [ id_product ]
            }
        })
    }
    const handleToggleChange = (e) => {
        setPurchase(purchase => ({
            ...purchase,
            [id_product]: {
                id: id_product,
                price: product?.price,
                quantity: e.target.checked ? quantity : 0,
                title: product?.title || '',
                tax: product?.tax || 0
            }
        }))
    }
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    return (
        <div className='cart-item'>
            <div className="left-item">
                <img src={product?.image} alt="" />
            </div>
            <div className="center-item">
                <p className="title">{product?.title}</p>
                <p className="price">{numberWithCommas(product?.price)} đ</p>
                <p className="tax">{numberWithCommas(product?.tax)} đ</p>
                <p className="quantity">x{quantity}</p>
            </div>
            <div className="right-item">
                <button onClick={handleRemove} className="remove-item">Remove</button>
                <div className="checkbox">
                    <label htmlFor={`item-${product.id}`} className="toggle">
                        <input type="checkbox" defaultChecked={false} id={`item-${product.id}`} name='checkbox' onChange={handleToggleChange} />
                        <div className="slider"></div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Item