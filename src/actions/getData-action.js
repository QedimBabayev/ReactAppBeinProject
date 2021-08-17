import { API_BASE } from '../config/env';
import axios from 'axios';
import filterObject from '../config/filterObject'
export const UPDATE_CHANGEPAGE = 'UPDATE_CHANGEPAGE'

export  function fetchData(controllerName) {
    return dispatch => {

      
            dispatch({
                type: 'FETCH_DATA',
                payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                    filterObject
                ).then(result => result.data)
                    .then(data => data)
            })
  
    }
}
export  function fetchSecondaryData(controllerName) {

    return dispatch => {

      
            dispatch({
                type: 'FETCH_SECONDARYDATA',
                payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                    filterObject
                ).then(result => result.data)
                    .then(data => data)
            })
  
    }
}

export  function fetchDataFast(controllerName) {

    return dispatch => {

      
            dispatch({
                type: 'FETCH_DATAFAST',
                payload: axios.post(`${API_BASE}/` + controllerName + `/getfast.php`,
                    filterObject
                ).then(result => result.data)
                    .then(data => data)
            })
  
    }
}



export  function fetchPage(controllerName) {

    return dispatch => {

        dispatch({
            type: 'FETCH_PAGE',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                filterObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}



export function updateChangePage(bool) {
    return {
        type: UPDATE_CHANGEPAGE,
        payload: {
            changePage: bool
        }
    }
}

