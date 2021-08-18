import { createStore } from 'redux';
import rootReducer from './modules/root-reducer';

const initialState = {};

export default createStore( 
    rootReducer,
    initialState,
);
