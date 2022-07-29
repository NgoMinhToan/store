import * as Actions from '../../../actionTypes';
import { takeLeading, put } from 'redux-saga/effects';

export function* watcherDongDonHang() {
    yield takeLeading(Actions.CREATE_DONGDONHANG, workerCreateDongDonHang);
}

// Tạo dòng đơn hàng
function* workerCreateDongDonHang(action) {
    try {
        console.log('workerCreateDongDonHang');

        // Tạo danh sách dòng đơn hàng
        const dongDonhang = []

        for(let i = 0; i < action.payload.length; i++) {
            const maDongDonHang = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            dongDonhang.push({...action.payload[i], maDongDonHang: maDongDonHang})
        }
        
        // console.log(dongDonhang);
        // Thêm vào reducer
        yield put({ type: Actions.ADD_DONGDONHANG, payload: dongDonhang });

    } catch (error) {
        console.log(error)
    }

}
