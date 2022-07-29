import * as Actions from '../../../actionTypes';
const initialState = {
    danhSachDonHang: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.UPDATE_ORDER: {
            return {
                ...state,
                danhSachDonHang: {...action.payload}
            }
        }
        case Actions.ADD_ORDER: {
            return {
                ...state,
                danhSachDonHang: {...state.danhSachDonHang, ...action.payload}
            }
        }
        default: {
            return state;
        }
    }
}