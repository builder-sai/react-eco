import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todos } from './todos/reducers';
//importing redux presist to ensure our state is kept in case of browser refresh
import { persistReducer } from 'redux-persist';
//storage defaults to webstorage on the web
import storage from 'redux-persist/lib/storage';
//autoMergeLevel2 tells redux-persist how to reconcile our 
//initial and stored state of our application, lvl2 = how deep should it go
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers = {
    todos
};

//persistConfig is an obj that tells redux-persist how save and
//where to store our application
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () =>
    createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        ));