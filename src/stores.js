//@flow


import thunk from 'redux-thunk';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {
    PersistGate
} from 'redux-persist/lib/integration/react';
import {
    persistStore,
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

const logger = store => next => action => {
    if (typeof action === 'function') {console.log('dispatching a function');}
    else {console.log('dispatching', action);}
    const result = next(action);
    console.log('next state', store.getState());
    return result;
}

const middlewares = [
    logger,
    thunk
];

const createAppStore = applyMiddleware(...middlewares)(createStore);
const persistConfig = {
    key: 'root',
    storage: storage,
    transform: [],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore(onComplete: () => void) {
    const store = createAppStore(reducers);
    persistStore(store, null, onComplete);
    return store;
}