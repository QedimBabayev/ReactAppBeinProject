import { API_BASE } from '../../config/env';
import { token } from '../../config/token';
import axios from 'axios';


export default function putData(controllerName, dataObject) {
    return dispatch => {
        dataObject.token = token
        dispatch({
            type: 'PUT_DATA',
            payload: axios.post(`${API_BASE}/` + controllerName + `/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}




