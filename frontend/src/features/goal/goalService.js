import axios from "axios";

const API_URL = "/goals/goal";
const API_URL_FOR_DELETE = "/goals/";

//* Create Goal...
const createGoal = async(goalData, token) =>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }


    // console.log("In Goal Service \n", "Goal : ", goalData, "Token : ", token);

    const response = await axios.post(API_URL, goalData, config);
    
    // console.log("In Goal Service \n", "Response : ", response);

    
    return response.data;
}

//* Get All Goals...
const getGoals = async(token) =>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    // console.log("In Goal Service \n", "Goal : ", goalData, "Token : ", token);

    const response = await axios.get(API_URL, config);
    
    // console.log("In Goal Service \n", "Response : ", response);

    
    return response.data;
}

//* Delete Goal...
const deleteGoals = async(goalId, token) =>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }


    // console.log("In Goal Service \n", "Goal : ", goalId, "Token : ", token);

    const response = await axios.delete(API_URL_FOR_DELETE + goalId, config);
    
    // console.log("In Goal Service \n", "Response : ", response);

    return response.data;
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoals
};

export default goalService;