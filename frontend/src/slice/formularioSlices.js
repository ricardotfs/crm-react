import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import gridService from "../services/formularioServices";

const initialState = {
    columns:[],
    rows:[],
    totalCount:0,
    error:false,
    success:false,
    loading:false,
    message:null
}

export const formularioData = createAsyncThunk('formulario/getById',
    async(id,thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token;
        const data = await gridService.getById(id,token);

        return data;
    }
)

export const formularioSlice = createSlice({
    name:'formulario',
    initialState,
    reducers:{
        resetMessage: (state) =>{
            state.message = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(formularioData.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(formularioData.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.data = action.payload;
        })
    }
});

export const {resetMessage} = formularioData.actions;
export default formularioSlice.reducer;