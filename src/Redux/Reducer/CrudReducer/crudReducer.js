import * as types from '../../Type/type';

const initialState = {
    item: [],
    editItem: null,
    obj: null,
}

const crudReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GET_ALL_REQ:
            return {
                ...state,
            };
        case types.GET_ALL_SUC:
            return {
                ...state,
                item: action.payload,
            };
        case types.GET_ALL_FAIL:
            return {
                ...state,
            };
        case types.POST_REQ:
            return {
                ...state,
            };
        case types.POST_SUC:
            return {
                ...state,
                item: [...state.item, action.payload],
                obj: action.payload,
            };
        case types.POST_FAIL:
            return {
                ...state,
            };
        case types.DELETE_REQ:
            return {
                ...state,

            };
        case types.DELETE_SUC:
            return {
                ...state,
                item: state.item.filter((item) => item.id !== action.id),
            };



        case types.UPDATE_REQ:
            return {
                ...state,
                editItem:action.payload,
            };
        case types.UPDATE_SUC:
            return {
                ...state,
                item: state.item.map((item) =>
                    item.id === action.payload.id ?{...action.payload }: item
                ),
    
            };
        case types.UPDATE_FAIL:
            return {
                ...state,
                // error: action.payload,
                editItem:null,
            };
            case types.GET_ID_REQ:
                return {
                    ...state,
                    editItem:null,
                    obj:null,
                };
            case types.GET_ID_SUC:
                return {
                    ...state,
                    item:action.payload,
                    obj:null,
                };

            case types.GET_ID_FAIL:
                return {
                    ...state,
                    obj:action.payload,
                };


        default:
            return state;
    }
}

export default crudReducer;
