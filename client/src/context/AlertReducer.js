import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';
export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                type: action.payload.type,
                    msgs: action.payload.msgs,
            }
            case REMOVE_ALERT:
                return {
                    ...state, type: null, msgs: null
                }
                default:
                    return state;
    }
}