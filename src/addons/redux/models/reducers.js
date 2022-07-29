import { combineReducers } from "redux";
import danhSachSanPhamReducer from '../../danhSachSanPham/models/danhSachSanPhamReducer';
import cartReducer from '../../cart/models/cartReducer';
import orderReducer from '../../order/models/orderReducer';
import dongDonHangReducer from "../../dongDonHang/models/dongDonHangReducer";

const reducer = combineReducers( {
    sanPham: danhSachSanPhamReducer,
    cart: cartReducer,
    order: orderReducer,
    dongDonHang: dongDonHangReducer
})

export default reducer