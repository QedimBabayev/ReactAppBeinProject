import {
    FETCH_DATA_FULFILLED,
    FETCH_DATA_REJECTED,
    FETCH_DATA_PENDING,
    FETCH_SPENDITEMS_PENDING,
    FETCH_SPENDITEMS_FULFILLED,
    FETCH_SPENDITEMS_REJECTED,
    FETCH_DATAFAST_PENDING,
    FETCH_DATAFAST_FULFILLED,
    FETCH_DATAFAST_REJECTED,
    FETCH_SECONDARYDATA_PENDING,
    FETCH_SECONDARYDATA_FULFILLED,


} from '../config/fetching';
import { UPDATE_CHANGEPAGE } from '../actions/getData-action'

const FETCH_PAGE_FULFILLED = 'FETCH_PAGE_FULFILLED'
const FETCH_PAGE_PENDING = 'FETCH_PAGE_PENDING'
const UPDATE_POSITIONS = 'UPDATE_POSITIONS'
const UPDATE_POSITIONS_BARCODE = 'UPDATE_POSITIONS_BARCODE'
export const initialState = {
    fetching: false,
    fetchingEdit: false,
    send: false,
    datas: [],
    headerDatas: [],
    responseId:'',
    responseCustomerId:'',
    responseProductId : '',
    responseStockId:'',
    error: {},
    columns: [],
    changePage: false,
    loading: true,
    lang: 'eng',
    barcode: false,
    pagePositions: [],
    additionalInfo: [],
    secondaryDatas: []




};
function datas(state = initialState, action) {

    switch (action.type) {

        case FETCH_DATA_PENDING:
            return {
                ...state,
                fetching: true,
                changePage: true,
                loading: true
            };

        case FETCH_SECONDARYDATA_PENDING:
            return {
                ...state,
                fetching: true,
                changePage: true,
                loading: true
            };
        case FETCH_DATAFAST_PENDING:
            return {
                ...state,
                fetching: true,
                changePage: true,
                loading: true
            };



        case FETCH_SPENDITEMS_PENDING:
            return {
                ...state,
            };


        case FETCH_SPENDITEMS_FULFILLED:
            return {
                ...state,
                spenditems: action.payload.Body.List
            };

        case FETCH_SPENDITEMS_REJECTED:
            return {
                ...state,
                error: action.payload

            };

        case FETCH_DATA_FULFILLED:
            return {
                ...state,
                headerDatas: action.payload.Body.List[0],
                datas: action.payload.Body.List,
                additionalInfo: action.payload.Body,
                totalDatas: action.payload.Body.Count,
                totalLimit: action.payload.Body.Limit,
                fetching: false,
                changePage: false,
                loading: false



            };


        case FETCH_SECONDARYDATA_FULFILLED:
            return {
                ...state,
                secondaryDatas: action.payload.Body.List,
                fetching: false,
                changePage: false,
                loading: false
            };

        case FETCH_DATAFAST_FULFILLED:
            return {
                ...state,
                headerDatas: action.payload.Body.List[0],
                datas: action.payload.Body.List,
                totalDatas: action.payload.Body.Count,
                totalLimit: action.payload.Body.Limit,
                fetching: false,
                changePage: false,
                loading: false



            };
        case FETCH_PAGE_PENDING:
            return {
                ...state,
               fetchingEdit:true,
            };

        case FETCH_PAGE_FULFILLED:
            return {
                ...state,
                fetchingEdit:false,
                pagePositions: action.payload.Body.List,
            };
        case FETCH_DATA_REJECTED:
            return {
                ...state,
                fetchingEdit:true,
                error: action.payload
            };

        case UPDATE_POSITIONS:
            return {
                ...state,
                dataSource: action.payload.positions,
            };
        case UPDATE_POSITIONS_BARCODE:
            return {
                ...state,
                barcode: action.payload,
            };
        case UPDATE_CHANGEPAGE:
            return {

                ...state,
                changePage: true,
            };
        default:
            return state;
    }

}

export default datas