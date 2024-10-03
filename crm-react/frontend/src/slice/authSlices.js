import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../services/authServices'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    error:false,
    success:false,
    loading:false
};

export const login = createAsyncThunk('auth/login',
    async(user,thunkAPI) =>{

        const data = await authService.login(user);

        //check for erros
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
);
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state) =>{
            state.loading = false;
            state.error = false;
            state.success = false;
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(login.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(login.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.user = action.payload;
        }).addCase(login.rejected,(state,action)=> {
            state.loading  = false;
            state.error = action.payload;
            state.user = null;
        }).addCase(logOut.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.user = null;
        })
    }
})
export const logOut = createAsyncThunk('auth/logout', async ()=> {
    await authService.logOut();
});
export const {reset} = authSlice.actions
export default authSlice.reducer