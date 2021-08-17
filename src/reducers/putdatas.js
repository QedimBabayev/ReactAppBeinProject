import { PUT_DATA_FULFILLED, PUT_DATA_REJECTED, PUT_DATA_PENDING, PUT_DATA_CUSTOMER_PENDING, PUT_DATA_CUSTOMER_FULFILLED, PUT_DATA_CUSTOMER_REJECTED, PUT_DATA_STOCK_PENDING, PUT_DATA_STOCK_FULFILLED, PUT_DATA_STOCK_REJECTED,PUT_DATA_PRODUCT_PENDING,PUT_DATA_PRODUCT_FULFILLED,PUT_DATA_PRODUCT_REJECTED } from '../config/fetching';
import { initialState } from '../reducers/datas';

function putdatas(state = initialState, action) {

    switch (action.type) {

        case PUT_DATA_PENDING:
            return {
                ...state,
                fetching: true,
                send: false,
            };
        case PUT_DATA_CUSTOMER_PENDING:
            return {
                ...state,
                fetching: true,
                send: false,
            };


            case PUT_DATA_PRODUCT_PENDING:
                return {
                    ...state,
                    fetching: true,
                    send: false,
                };
        case PUT_DATA_STOCK_PENDING:
            return {
                ...state,
                fetching: true,
                send: false,
            };




        case PUT_DATA_FULFILLED:
            return {
                ...state,
                responseId: action.payload.Body,
                send: true,

            };

            case PUT_DATA_STOCK_FULFILLED:
                return {
                    ...state,
                    responseStockId: action.payload.Body,
                    send: true,
                };
    

                case PUT_DATA_PRODUCT_FULFILLED:
                    return {
                        ...state,
                        responseProductId: action.payload.Body,
                        send: true,
                    };
        
        case PUT_DATA_CUSTOMER_FULFILLED:
            return {
                ...state,
                responseCustomerId: action.payload.Body,
                send: true,

            };
        case 'DELETE_RESPONSE':
            return {
                ...state,
                responseId: action.payload.responseId,
                send: false,

            };
        case PUT_DATA_REJECTED:
            return {

                ...state,
                send: false,
                error: action.payload
            };

        default:
            return state;
    }

}

export default putdatas