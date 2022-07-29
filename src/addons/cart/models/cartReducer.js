import * as Actions from '../../../actionTypes'
const initialState = {
    danhSachGioHang: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.UPDATE_CART: {
            return {
                ...state,
                danhSachGioHang: action.payload
            }
        }
        default: {
            return state
        }
    }
}