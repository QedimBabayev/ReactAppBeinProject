import { API_BASE } from '../config/env';
import axios from 'axios';
import { token } from '../config/token';



export default function getSpendItems() {
    return dispatch => {
        dispatch({
            type: 'FETCH_SPENDITEMS',
            payload: axios.post(`${API_BASE}/spenditems/get.php`,{
                token: token
            }
            ).then(result => result.data)
                .then(data => data)
        })
    }
}