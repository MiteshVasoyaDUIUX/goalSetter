import { deleteGoal } from "../features/goal/goalSlice";
import { useDispatch } from "react-redux";
// import { getGoals } from "../features/goal/goalSlice";

function GoalItem({ goal }) {

    const dispatch = useDispatch();

    const onDelete = () =>{
        dispatch(deleteGoal(goal._id));
    }

    return (
        <div className="goal">
            <div>
                {new Date(goal.createdAt).toLocaleTimeString('en-IN')};
            </div>
            <h1>{goal.goal}</h1>
            <button className="btn btn-block" onClick={onDelete}>X</button>
        </div >

    )
}

export default GoalItem