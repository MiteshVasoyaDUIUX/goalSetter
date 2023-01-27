/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import { getGoals, reset } from "../features/goal/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { goals, isError, isLoading, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    if (user) {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return <>

    <section className="heading">
      <h4>{
        user ? ("User Name : " + user.uname) : ""
      }
      </h4>
    </section>
    <GoalForm />
    <section className="content">
      {goals.length > 0 ? (<div className="goal">
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} />
        ))}
      </div>) : (<h3>Set Goal</h3>)}
    </section>
  </>

}

export default Dashboard