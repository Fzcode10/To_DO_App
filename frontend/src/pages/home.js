import {useState, useEffect, useContext} from 'react'
import NewTodo from '../components/newTodoForm'
import FullDetials from '../components/todoListFullDetials';
import { BioContext } from '../contextProvider/contextapi';



 
const Home =  () => {

    // const [todos, setTodos] = useState([]);
    
    const {todos , dispatch} = useContext(BioContext)

    useEffect(() => { 
        const fetchTodos = async () => {
            const responce = await fetch('/todos');
            const json = await responce.json();
            if(responce.ok){
                // console.log(json); 
                // setTodos(json.todo);

                dispatch({type:'SET_TODO', payload: json.todo});
            }
        }
        fetchTodos();
    }, [dispatch]) 

    return ( 
        <>
          <div className='container-home'>

            <div className='todo-part'>

                {
                    todos && todos.map((todo) =>(
                        <FullDetials key={todo._id} todo={todo}/>
                    ))
                }
            </div>

            <div className='newform-part'>
                <NewTodo/>
            </div>



          </div>
        </>
    )
}

export default Home