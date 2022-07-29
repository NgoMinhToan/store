import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Item from './Item'
import './styles.scss'
import * as Actions from '../../../actionTypes'
import { useDispatch } from 'react-redux'

const Order = () => {
    const dispatch = useDispatch()
    
    const order = useSelector(state => state.order.danhSachDonHang)
    // console.log(order)
    return (
        <div className='order'>
            {order && Object.values(order).map((item, index) => {
                return <Item key={index} data={item} />
            })}
        </div>
    )
}

export default Order