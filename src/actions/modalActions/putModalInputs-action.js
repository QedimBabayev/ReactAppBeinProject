


import { API_BASE } from '../../config/env';
import { token } from '../../config/token';
import axios from 'axios';

export function putLocalStates(values,newproduct){
	return {
		type: 'UPDATE_LOCAL_STATES',
		payload: {
			formvalues :values,
            newProduct: newproduct,
		}
	}
}
export  function putDataCustomer(dataObject) {
    return dispatch => {
        dataObject.token = token
        dispatch({
            type: 'PUT_DATA_CUSTOMER',
            payload: axios.post(`${API_BASE}/customers/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}


export  function putDataProduct(dataObject) {
    return dispatch => {
        dataObject.token = token
        dispatch({
            type: 'PUT_DATA_PRODUCT',
            payload: axios.post(`${API_BASE}/products/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}
export  function putDataStock(dataObject) {
    return dispatch => {
        dataObject.token = token
        dispatch({
            type: 'PUT_DATA_STOCK',
            payload: axios.post(`${API_BASE}/stocks/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}

