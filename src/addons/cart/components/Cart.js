import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../../actionTypes'
import Item from './Item'
import './styles.scss'

const Cart = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart.danhSachGioHang)

    const [purchase, setPurchase] = useState({});
    const [totalPurchase, setTotalPurchase] = useState({tongTien: 0, tongThue: 0});
    
    useEffect(() => {

        let totalPrice = purchase && Object.keys(purchase).length > 0 && Object.values(purchase).reduce((a, b) => a + b.price * b.quantity, 0) || 0;
        let totalTax = purchase && Object.keys(purchase).length > 0 && Object.values(purchase).reduce((a, b) => a + b.tax * b.quantity, 0) || 0;
        setTotalPurchase({tongTien: totalPrice, tongThue: totalTax});

    }, [purchase] )

    const confirmPurchase = () => {
        console.log('click')
        dispatch({
            type: Actions.CREATE_ORDER,
            payload: purchase
        })
        setPurchase({})
    }
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return (
      <div className='cart'>
        <div className="cart-list">
          {cart && Object.keys(cart).map((key, index) => {
              return <Item key={`${index}_${key}`} id_product={key} quantity={cart[key]} setPurchase={setPurchase} />
          })}
        </div>
        <div className="purchase-info">
          <p className="total-price">
            Tổng tiền: <span className='total-price-value'>{numberWithCommas(totalPurchase.tongTien)} đ</span>
          </p>
          <p className="total-tax">
            Tổng thuế: <span className='total-tax-value'>{numberWithCommas(totalPurchase.tongThue)} đ</span>
          </p>
          <p className="total-price-with-tax">
            Thành tiền: <span className='total-price-tax-value'>{numberWithCommas(totalPurchase.tongTien + totalPurchase.tongThue)} đ</span>
          </p>
          <div className="purchase-confirm">
            <button onClick={confirmPurchase} disabled={totalPurchase.tongTien <= 0 && true}>Thanh toán</button>
          </div>
        </div>
      </div>
    )
}

export default Cart