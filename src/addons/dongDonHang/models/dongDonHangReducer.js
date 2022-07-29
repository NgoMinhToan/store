import * as Actions from '../../../actionTypes'
const initialState = [];

export default ( state = initialState, action ) => {
    switch (action.type) {
        case Actions.UPDATE_DONGDONHANG: {
            return action.payload;
        }

        case Actions.ADD_DONGDONHANG: {
            return [...state, ...action.payload];
        }

        default: {
            return state;
        }
    }
}