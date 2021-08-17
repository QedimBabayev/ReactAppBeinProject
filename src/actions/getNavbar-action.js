import { API_BASE } from '../config/env';
import axios from 'axios';
import { token } from '../config/token';
export const UPDATE_SUBHEADER = 'UPDATE_SUBHEADER';
export const UPDATE_UPPERHEADER = 'UPDATE_UPPERHEADER';

export function updateSubheader(activeItemId, activeItem) {
    return {
        type: UPDATE_SUBHEADER,
        payload: {
            id: activeItemId,
            name: activeItem
        }
    }
}


export function updateUpperheader(activeItem) {
    return {
        type: UPDATE_UPPERHEADER,
        payload: {
            nameupper: activeItem
        }
    }
}
export default function getNavbar() {

    return dispatch => {
        dispatch({
            type: 'FETCH_MENU',
            payload: axios.post(`${API_BASE}/menu/get.php`, {
                token: token
            })
                .then(result => result.data)
                .then(data => data.Body)
        })


    }
}

