import { takeLeading, select, put } from 'redux-saga/effects';
import * as Actions from '../../../actionTypes';


export function* watcherOrder() {
    yield takeLeading(Actions.CREATE_ORDER, workerAddOrder);
    yield takeLeading(Actions.MODIFY_ORDER, workerModifyOrder);
    yield takeLeading(Actions.REMOVE_ORDER, workerRemoveOrder);
}

// Thêm đơn hàng
function* workerAddOrder(action) {
    console.log('workerAddOrder');
    try {
        const maDonHang = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        
        const dongDonhang = Object.values(action.payload).filter(f => f.quantity > 0).map(item => {
            return {
                maDonHang: maDonHang,
                maSanPham: item.id,
                tenSanPham: item.title,
                soLuong: item.quantity,
                donGia: item.price,
                tongTienTruocThue: item.price * item.quantity,
                tongThue: item.tax * item.quantity,
            }
        })
        yield put({type: Actions.CREATE_DONGDONHANG, payload: dongDonhang })
        
        const tongTruocThue = dongDonhang.reduce((a, b) => a + b.tongTienTruocThue, 0) || 0;
        const tongThue = dongDonhang.reduce((a, b) => a + b.tongThue, 0) || 0;
        const tongTien = tongTruocThue + tongThue;
        
        const newOrder = {
            maDonHang: maDonHang,
            ngayDatHang: new Date(),
            tongTruocThue: tongTruocThue,
            tongThue: tongThue,
            tongTien: tongTien,
            trangThai: 'Chưa xử lý',
        }
        console.log(newOrder);

        yield put({ type: Actions.ADD_ORDER, payload: {[maDonHang]: newOrder} });

        yield put({ type: Actions.REMOVE_FROM_CART, payload: {id: dongDonhang.map(item => item.maSanPham) } });
    } catch (error) {
        console.log(error);        
    }
}

function* workerModifyOrder(action) {
    console.log('workerModifyOrder');
    try {
        console.log(action)

        let dongDonHang = yield select(state => state.dongDonHang);

        let chitietDonHang = dongDonHang.filter(f => f.maDonHang === action.payload.maDonHang)
        
        chitietDonHang = chitietDonHang.map(item => {
            const newData = action.payload.productList[item.maSanPham+'']
            return {...item, soLuong: newData.soLuong, tongThue: newData.tongThue, tongTienTruocThue: newData.tongTienTruocThue}
        })
        console.log('chi tiet don hang', chitietDonHang)
        dongDonHang = dongDonHang.filter(f => f.maDonHang !== action.payload.maDonHang)
        console.log('dong don hang', dongDonHang)

        dongDonHang.push(...chitietDonHang)
        
        yield put({type: Actions.UPDATE_DONGDONHANG, payload: dongDonHang })
        
        console.log(chitietDonHang)

        let order = yield select(state => state.order.danhSachDonHang[action.payload.maDonHang]);

        order = {
            ...order,
            maDonHang: action.payload.maDonHang,
            tongThue: chitietDonHang.reduce((a, b) => a + b.tongThue, 0) || 0,
            tongTruocThue: chitietDonHang.reduce((a, b) => a + b.tongTienTruocThue, 0) || 0,
            tongTien: chitietDonHang.reduce((a, b) => a + b.tongTienTruocThue + b.tongThue, 0) || 0,
        }

        yield put({ type: Actions.ADD_ORDER, payload: {[action.payload.maDonHang]: order} });

    } catch (error) {
        console.log(error);
    }
}
function* workerRemoveOrder(action) {
    console.log('workerRemoveOrder');
    try {
        let orders = yield select(state => state.order.danhSachDonHang);
        delete orders[action.payload.maDonHang];
        const newObj = {};
        Object.assign(newObj, orders);
        yield put({ type: Actions.UPDATE_ORDER, payload: newObj });
    } catch (error) {
        console.log(error);
    }
}