import { all } from 'redux-saga/effects';
import { watcherDanhSachSanPham } from '../../danhSachSanPham/controllers/watcherDanhSachSanPham';
import { watcherCart } from '../../cart/controllers/watcherCart';
import { watcherOrder } from '../../order/controllers/watcherOrder';
import { watcherDongDonHang } from '../../dongDonHang/controllers/watcherDongDonHang';

export default function* rootSaga() {
    yield all([
        watcherDanhSachSanPham(),
        watcherCart(),
        watcherOrder(),
        watcherDongDonHang(),
    ]);
}