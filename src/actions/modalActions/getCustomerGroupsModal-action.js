import { API_BASE } from '../../config/env';
import axios from 'axios';
import { token } from '../../config/token';

export const productModalFilter = {
    token: token
}



export function getCustomerGroupsModal() {

    return dispatch => {

        dispatch({
            type: 'FETCH_CUSTOMER_GROUPS_MODAL',
            payload: axios.post(`${API_BASE}/customergroups/get.php`, {
                token: token,
            }).then(result => result.data)
                .then(data => data.Body)
        })

    }
}

export function getStocksGroupsModal() {

    return dispatch => {

        dispatch({
            type: 'FETCH_STOCKS_GROUPS_MODAL',
            payload: axios.post(`${API_BASE}/stocks/get.php`, {
                token: token,
            }).then(result => result.data)
                .then(data => data.Body)
        })

    }
}





export function getProductsModal() {

    return dispatch => {

        dispatch({
            type: 'FETCH_PRODUCTS_MODAL',
            payload: axios.post(`${API_BASE}/products/get.php`, 
                productModalFilter
            ).then(result => result.data)
                .then(data => data.Body)
        })

    }
}



export function getProductsGroupModal() {

    return dispatch => {

        dispatch({
            type: 'FETCH_PRODUCTS_GROUP_MODAL',
            payload: axios.post(`${API_BASE}/productfolders/get.php`, 
                productModalFilter
            ).then(result => result.data)
                .then(data => data.Body)
        })

    }
}


export function getCustomerGroupsFastModal(value) {

    return dispatch => {

        dispatch({
            type: 'FETCH_CUSTOMER_GROUPS_FMODAL',
            payload: axios.post(`${API_BASE}/customergroups/getFast.php`, {
                token: token,
                fast: value
            }).then(result => result.data)
                .then(data => data.Body)
        })

    }
}
