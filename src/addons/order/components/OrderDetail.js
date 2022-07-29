import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from '../../../actionTypes'

const OrderDetail = () => {
    const dispatch = useDispatch()
    const [productList, setProductList] = useState({});
    const { maDonHang } = useParams()
    const order = useSelector(state => state.order.danhSachDonHang[maDonHang])
    const [price, setPrice] = useState({tongThue: order.tongThue, tongTruocThue: order.tongruocThue});
    const chiTietDonHang = useSelector(state => state.dongDonHang.filter(f => f.maDonHang === maDonHang))
    // console.log(order)
    // console.log(chiTietDonHang)

    const timeString = (time) => {
        const date = new Date(time)
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`
    }
    const numberWithCommas = (x) => {
        return x != undefined ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0;
    }
    const handleSave = () => {
        console.log(maDonHang)
        dispatch({ type: Actions.MODIFY_ORDER, payload: { maDonHang: maDonHang, productList: productList } })
        window.location.href = '/order'
    }

    useEffect(() => {
        let tongThue = Object.values(productList).reduce((a,b) => a+b.tongThue, 0)
        let tongTruocThue = Object.values(productList).reduce((a,b) => a+b.tongTienTruocThue, 0)
        setPrice({tongThue, tongTruocThue})
    }, [productList])

    return (
        <div className='order-detail'>
            <div className="fixed-data">
                <p className="id-detail">{order.maDonHang}</p>
                <p className="date-detail">{timeString(order.ngayDatHang)}</p>
            </div>
            <div className="modify-data">
                {chiTietDonHang.map((item, index) => (
                    <ProductItem data={item} index={index} key={index} setProductList={setProductList} numberWithCommas={numberWithCommas} />
                ))}
            </div>
            <div className="total-price">
                <p className="price-1">Tổng trươc thuế: <span>{numberWithCommas(price.tongTruocThue)} đ</span></p>
                <p className="tax-price">Tổng thuế: <span>{numberWithCommas(price.tongThue)} đ</span></p>
                <p className="price-2">Thành tiền: <span>{numberWithCommas(price.tongThue + price.tongTruocThue)} đ</span></p>
            </div>
            <div className="btn-action">
                <button onClick={handleSave} className='save-btn'>Save</button>
                <Link to='/order'><button className='cancel-btn'>Cancel</button></Link>
            </div>
        </div>
    )
}

export default OrderDetail


const ProductItem = ({ data, setProductList, numberWithCommas, index }) => {
    const { donGia, maDonHang, maDongDonHang, maSanPham, soLuong, tenSanPham, tongThue, tongTienTruocThue } = data
    const { price, rating, title, tax } = useSelector(state => state.sanPham.danhSachSanPham.find(f => f.id == data.maSanPham))
 
    const [totalPrice, setTotalPrice] = useState({tongThue, tongTienTruocThue});

    const quantityChange = e => {
        let value = e.target.value
        setTotalPrice({tongThue: value * tax, tongTienTruocThue: value * price})
        setProductList(productList => {
            let newProductList = {...productList, [maSanPham]: {soLuong: value, tongThue: value * tax, tongTienTruocThue: value * price}}
            return newProductList
        })
    }

    useEffect(() => {
        setProductList(productList => {
            let newProductList = {...productList, [maSanPham]: {soLuong: soLuong, tongThue: tongThue, tongTienTruocThue: tongTienTruocThue}}
            return newProductList
        })
    }, [])
    return (
        <div className="item-detail">
            <p className="name-product">{title}</p>
            <label htmlFor="quantity">Số lượng: </label>
            <input min={1} onChange={quantityChange} defaultValue={soLuong} type="number" className='quantity' name="quantity" id="" />
            <p className="price">{numberWithCommas(totalPrice.tongTienTruocThue)} đ</p>
            <p className="tax">{numberWithCommas(totalPrice.tongThue)} đ</p>
            <p className="total-price-product">{numberWithCommas(totalPrice.tongThue + totalPrice.tongTienTruocThue)} đ</p>
        </div>
    )
}



