import {
    FETCH_GROUPS_FULFILLED,
    FETCH_GROUPS_REJECTED,
    FETCH_GROUPS_PENDING,
    FETCH_FAST_GROUPS_FULFILLED,
    FETCH_FAST_GROUPS_REJECTED,
    FETCH_FAST_GROUPS_PENDING,
    FETCH_CUSTOMERS_FULFILLED,
    FETCH_CUSTOMERS_REJECTED,
    FETCH_CUSTOMERS_PENDING,
    FETCH_CUSTOMERS_FAST_PENDING,
    FETCH_CUSTOMERS_FAST_FULFILLED,
    FETCH_CUSTOMERS_FAST_REJECTED,
} from '../config/fetching';

const initialState = {
    fetching: false,
    fastFetching:false,
    groups: [],
    changePage: false,
    customers: [],
    loading: true,
    lang: 'eng'


};
function groups(state = initialState, action) {

    switch (action.type) {

        case FETCH_GROUPS_PENDING:
            return {
                ...state,
                fetching: true,
            };
        case FETCH_GROUPS_FULFILLED:
            return {
                ...state,
                groups: action.payload.List,
                fetching: false,


            };
        case FETCH_GROUPS_REJECTED:
            return {

                ...state,
                error: action.payload
            };
        case FETCH_FAST_GROUPS_PENDING:
            return {
                ...state,
                fetching: true,
            };
        case FETCH_FAST_GROUPS_FULFILLED:
            return {
                ...state,
                customergroups: action.payload.List,
                fetching: false,


            };
        case FETCH_FAST_GROUPS_REJECTED:
            return {

                ...state,
                error: action.payload
            };
        case FETCH_CUSTOMERS_PENDING:
            return {
                ...state,
                fetching: true,
            };
        case FETCH_CUSTOMERS_FULFILLED:
            return {
                ...state,
                customers: action.payload.List,
                fetching: false,


            };
        case FETCH_CUSTOMERS_REJECTED:
            return {

                ...state,
                error: action.payload
            };

            case FETCH_CUSTOMERS_FAST_PENDING:
                return {
                    ...state,
                    fastFetching: true,
                };
            case FETCH_CUSTOMERS_FAST_FULFILLED:
                return {
                    ...state,
                    customers: action.payload.List,
                    fastFetching: false,
    
    
                };
            case FETCH_CUSTOMERS_FAST_REJECTED:
                return {
    
                    ...state,
                    error: action.payload
                };
        default:
            return state;
    }

}

export default groups