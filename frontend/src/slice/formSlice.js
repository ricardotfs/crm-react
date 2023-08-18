import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import gridService from "../services/formServices";

const initialState = {
    data: {},
    error:false,
    success:false,
    loading:false,
    message:null
}

export const getById = createAsyncThunk('form/getById',
    async(id,thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token;
        const data = await gridService.getById(id,token);

        return data;
    }
)

export const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        resetMessage: (state) =>{
            state.message = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getById.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(getById.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.data = action.payload;
        })
    }
});

export const {resetMessage} = formSlice.actions;
export default formSlice.reducer;