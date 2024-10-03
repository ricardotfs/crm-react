import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlices';
import gridReducer from './slice/gridSlices';
import gridFormulario from './slice/formSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        grid:gridReducer,
        form:gridFormulario
    },
})