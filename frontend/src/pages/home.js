import { useEffect, useContext, useState } from 'react'
import NewTodo from '../components/newTodoForm'
import FullDetials from '../components/todoListFullDetials';
import { BioContext } from '../contextProvider/contextapi';




const Home = () => {

    // const [todos, setTodos] = useState([]);

    const { todos, dispatch, notification } = useContext(BioContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const BACKEND_URL = process.env.BACKEND_URL;

    useEffect(() => {

        const fetchTodos = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://todoapp-production-5580.up.railway.app/api/todos`);

                if (!response.ok) {
                    setError("Faild to fetch data");
                    throw new Error("Failed to fetch todos");
                }

                const json = await response.json();

                dispatch({ type: "SET_TODO", payload: json.todo });

            } catch (err) {
                console.error(err.message);
                if (!navigator.onLine) {
                    setError("No internet connection ");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }



        }
        fetchTodos();
    }, [dispatch])

      useEffect(() => {
        // console.log(notification);
        if(notification){
            const timer = setTimeout(() => {
                dispatch({type: 'NOTIFICATION_CLEAR'})
            }, 1000);

            return () => clearTimeout(timer);
        }

    }, [notification, dispatch])


    if(loading){
        return (
            <div className='loading'>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return (
            <div className='fullpageerror'>
                <h1>{error}</h1>
            </div>
        )
    }

    return (
        <>
            <div className='container-home'>

             
                <div className='todo-part'>

                    {
                        todos && todos.map((todo) => (
                            <FullDetials key={todo._id} todo={todo} />
                        ))
                    }
                </div>
                    {notification && <div className='deleted'>{notification}</div>}
                <div className='newform-part'>
                    <NewTodo />
                </div>

                {error && <div> {error} </div>}

            </div>
        </>
    )
}

export default Home