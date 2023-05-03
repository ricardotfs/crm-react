import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import gridService from "../services/gridServices";

const initialState = {
    columns:[],
    rows:[],
    totalCount:0,
    error:false,
    success:false,
    loading:false,
    message:null
}

export const gridData = createAsyncThunk('grid/getAll',
    async(filter,thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token;
        const data = await gridService.getData(filter,token);

        return data;
    }
)

export const gridSlice = createSlice({
    name:'grid',
    initialState,
    reducers:{
        resetMessage: (state) =>{
            state.message = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(gridData.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(gridData.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.columns = action.payload.columns.map(column=> {
                column.name = column.Nome;
                column.title = column.Title;
                return column;
            });
            state.rows = action.payload.rows;
            state.totalCount = action.payload.totalCount;
        })
    }
});

export const {resetMessage} = gridSlice.actions;
export default gridSlice.reducer;