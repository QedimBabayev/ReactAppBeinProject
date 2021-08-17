import { API_BASE } from '../config/env';
import axios from 'axios';
import { token } from '../config/token';



export  function getCustomers() {

    return dispatch => {
     
            dispatch({
                type: 'FETCH_CUSTOMERS',
                payload: axios.post(`${API_BASE}/customers/get.php`, {
                    token : token,
                }).then(result => result.data)
                    .then(data => data.Body)
            })

    }
}




export  function getCustomersFast(fastValue) {

    return dispatch => {
     
            dispatch({
                type: 'FETCH_CUSTOMERS_FAST',
                payload: axios.post(`${API_BASE}/customers/getfast.php`, {
                    token : token,
                    fast:fastValue
                }).then(result => result.data)
                    .then(data => data.Body)
            })

    }
}

