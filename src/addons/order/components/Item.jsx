import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../../../actionTypes'
import { Link } from 'react-router-dom'

const Item = ({ data: { maDonHang, ngayDatHang, tongTien, trangThai, tongThue, tongTruocThue } }) => {
    const chiTietDonHang = useSelector(state => state.dongDonHang.filter(item => item.maDonHang === maDonHang))
    // console.log(chiTietDonHang)
    // console.log(maDonHang)
    const dispatch = useDispatch()
    const onDelete = () => {
        dispatch({
            type: Actions.REMOVE_ORDER,
            payload: {
                maDonHang: maDonHang
            }
        })
    }
    const numberWithCommas = (x) => {
        return x!=undefined ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
    }
    const timeString = (time) => {
        const date = new Date(time)
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`
    }
    return (
        <div className='order-item'>
            <div className="top-item">
                <p className="id-detail">ID: {maDonHang}</p>
                <p className="date-detail">{timeString(ngayDatHang)}</p>
            </div>
            <div className="center-item">
                <p className="price-detail"><span className='total-price'> {numberWithCommas(tongTien)} đ</span> </p>
                <button onClick={onDelete} className='delete-purchase'>Xóa</button>
                <Link to={`/order-detail/${maDonHang}`}> <button className='modify-purchase'>Sửa</button> </Link>
                <p className="status-detail">{trangThai}</p>
                <div className="purchase-detail">
                    {chiTietDonHang.map((item, index) => (
                        <div key={index} className="item-detail">
                            <p className="name-product">{item.tenSanPham}</p>
                            <p className="price-product">{numberWithCommas(item.donGia)} đ</p>
                            <p className="quantity-product">x{item.soLuong}</p>
                            <p className="total-price-product">{numberWithCommas(item.tongTienTruocThue)} đ</p>
                            <p className="total-tax-product">{numberWithCommas(item.tongThue)} đ</p>
                        </ div>
                    ))}
                    <div className="total"><span>Tổng: </span><span className='price-value'>{numberWithCommas(tongTruocThue)} đ</span> <span className='tax-value'>{numberWithCommas(tongThue)} đ</span></div>
                </div>
            </div>
        </div>
    )
}

export default Item