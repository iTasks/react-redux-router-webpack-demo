'use strict';
import actionTypes from './Login.Constants';
import { AlertIOS } from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';


export function logOut(){
    return {
        'type': actionTypes.LOGGED_OUT
    }
}