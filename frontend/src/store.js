import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlices';
import gridReducer from './slice/gridSlices';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        grid:gridReducer
    },
})