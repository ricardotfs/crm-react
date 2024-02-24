import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import formService from "../services/formServices";

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
        const data = await formService.getById(id,token);

        return data;
    }
)

export const update = createAsyncThunk('form/update',
    async(obj,thunkAPI) =>{

        const data = await formService.update(obj);

        //check for erros
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
);

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
        }).addCase(update.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(update.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.message = action.payload.msg;
        }).addCase(update.rejected,(state,action)=> {
            state.loading  = false;
            state.error = action.payload;
            state.data = null;
        })
    }
});

export const {resetMessage} = formSlice.actions;
export default formSlice.reducer;