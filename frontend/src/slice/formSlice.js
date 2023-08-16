import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import gridService from "../services/formularioServices";

const initialState = {
    data: {},
    error:false,
    success:false,
    loading:false,
    message:null
}

export const getById = createAsyncThunk('formulario/getById',
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
            state.data = { "activity": {
                "Id": "1",
                "Token": "TKT1"
            },};
        })
    }
});

export const {resetMessage} = formSlice.actions;
export default formSlice.reducer;