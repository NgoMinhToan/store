import * as Actions from '../../../actionTypes'
const initialState = {
    danhSachSanPham: [],
}

export default (state = initialState, action) => {

    switch (action.type) {

        case Actions.UPDATE_DANH_SACH_SAN_PHAM: {
            return {
                ...state,
                danhSachSanPham: action.payload
            }
        }
        case Actions.ADD_PRODUCT: {
            return {
                ...state,
                danhSachSanPham: [action.payload, ...state.danhSachSanPham ]
            }
        }

        default: {
            return state
        }
    }
}