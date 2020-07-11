// import { v4 as uuid } from 'uuid';

 // eslint-disable-next-line.
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }    
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }  
        case EDIT_ITEM:
            // return {
            //     ...state,
            //     items: [action.payload, ...state.items]
            // }    
            const index = state.items.findIndex(item=> item._id === action.payload.id);
            if (index > -1) {
                return {
                    ...state,
                    items: {
                        ...state.items.slice(0, index),
                        ...action.payload,
                        ...state.items.slice(index + 1)

                    }
                }
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    ...action.payload
                }
            }
        case ITEMS_LOADING:    
            return {
                ...state,
                loading: true
            }
        default:
            return state;    
    }
}
