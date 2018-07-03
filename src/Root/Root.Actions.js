import actionTypes from './Root.Constants';
import { browserHistory } from 'react-router'
export function goToRouter(key) {
    browserHistory.push(key);
    return {
        type: actionTypes.TO_ROUTER,
        value:key
    };
}

