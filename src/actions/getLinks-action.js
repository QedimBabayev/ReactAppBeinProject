import { API_BASE } from '../config/env';
import axios from 'axios';
import filterLinks from '../config/filterLinks';

export const FETCH_LINKS = 'FETCH_LINKS'


export default function getLinks(docid,doctype) {
    filterLinks.doctype = doctype
    filterLinks.id = docid
    return dispatch => {
        dispatch({
            type: FETCH_LINKS,
            payload: axios.post(`${API_BASE}/links/get.php`,
            filterLinks
            ).then(result => result.data)
                .then(data => data)
        })
    }
}