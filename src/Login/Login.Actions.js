import actionTypes from './Login.Constants';

// fake user data
const testUser = {
    'name': 'juju',
    'age': '24',
};


// login
export function logIn(opt, callBack) {
    return (dispatch) => {
        dispatch({
            'type': actionTypes.LOGGED_DOING
        });
        setTimeout(function () {
            fetch('https://github.com/', {
                mode: 'no-cors'
            })
                .then((res) => {
                    dispatch({
                        'type': actionTypes.LOGGED_IN,
                        user: testUser
                    });
                    if (typeof callBack === 'function') {
                        callBack();
                    }
                }).catch((err) => {
                    dispatch({
                        'type': actionTypes.LOGGED_ERROR,
                        error: err
                    });
                });
        }, 3000);

    }
}


export function logOut() {
    return {
        type: actionTypes.LOGGED_OUT
    }
}
