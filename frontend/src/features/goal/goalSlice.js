import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";


const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        //Checking for GoalData is passing or not...
        // console.log("In Goal Slice \n", "Goal : ", goalData, "Token : ", token, "Initial State : ", initialState);

        return await goalService.createGoal(goalData, token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/getGoals', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        //Checking for GoalData is passing or not...
        // console.log("In Goal Slice \n", "Goal : ", goalData, "Token : ", token, "Initial State : ", initialState);

        return await goalService.getGoals(token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('get/deleteGoals', async(id, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoals(id, token);
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
    return thunkAPI.rejectWithValue(message)
    }
})

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals.push(action.payload);
            // console.log("New State : ", initialState.goals);
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals = action.payload;
            // console.log("New State : ", initialState.goals);
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals = state.goals.filter((goal) => goal._id !== action.payload._id);
            // console.log("New State : ", state.goals);
            // console.log("Action Payload : ", action.payload._id);
            // console.log("Goal Id : ", goal._id);
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isError = true;
            state.isError = false;
            state.isLoading = false;
            state.message = action.payload;
        })
    }
})


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;