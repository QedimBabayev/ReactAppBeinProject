import { API_BASE } from '../config/env';
import axios from 'axios';
import filterAttributes from '../config/filterAttributes'
import filterRefList from '../config/filterRefList'

export function fetchRefList(refid) {
    filterRefList.refid = refid
    return dispatch => {
        dispatch({
            type: 'FETCH_REFLIST',
            payload: axios.post(`${API_BASE}/attributes/getreflist.php`,
                filterRefList
            ).then(result => result.data)
                .then(data => data)
        })

    }
}




export function fetchAttributes(controllerName, entityType) {
    filterAttributes.entitytype = entityType
    return dispatch => {
        dispatch({
            type: 'FETCH_ATTRIBUTES',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                filterAttributes
            ).then(result => result.data)
                .then(data => data)
        })

    }
}
