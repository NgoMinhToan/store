import { takeLeading, put, select } from 'redux-saga/effects';
import * as Actions from '../../../actionTypes';

export function* watcherCart() {
    yield takeLeading(Actions.ADD_TO_CART, workerAddToCart);
    yield takeLeading(Actions.REMOVE_FROM_CART, workerRemoveFromCart);
}

// Thêm vào giỏ hàng
function* workerAddToCart(action) {
    console.log('workerAddToCart');
    try {
        let products = yield select(state => state.cart.danhSachGioHang);
        products[action.payload.id] = Number( products[action.payload.id] || 0 ) + Number(action.payload.quantity);
        yield put({ type: Actions.UPDATE_CART, payload: products });
    } catch (error) {
        console.log(error);
    }
}

// Xóa khỏi giỏ hàng
function* workerRemoveFromCart(action) {
    console.log('workerRemoveFromCart');
    try {
        let products = yield select(state => state.cart.danhSachGioHang);

        // xóa sản phẩm khỏi giỏ hàng, theo danh sách id 
        for (let index in action.payload.id) {
            delete products[action.payload.id[index]];
        }
        const newObject = {};
        Object.assign(newObject, products);
        yield put({ type: Actions.UPDATE_CART, payload: newObject });
    } catch (error) {
        console.log(error);
    }
}
