// import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { createGoal } from "../features/goal/goalSlice";
import { useState } from "react";


function GoalForm() {

    const [goal, setGoal] = useState('');

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const onSubmit = (e)=>{
        e.preventDefault();

        //Testing...
        // console.log("In Goal Form : \n" + goal);
        dispatch(createGoal({goal}))
        setGoal('');
    }

    return (
        <section className="form">
            <form className="form-group" onSubmit={onSubmit}>
                <input type="text" className="goal" placeholder="Enter Goal" value={goal} id="goal" name="goal" onChange={(e) => {setGoal(e.target.value)}}/>
                <button className="btn btn-block">Add</button>
            </form>
        </section>  
    )
}

export default GoalForm