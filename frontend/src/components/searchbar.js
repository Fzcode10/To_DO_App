import  { useState, useEffect, useContext } from 'react'
import { BioContext } from '../contextProvider/contextapi';


const SearchBar = () => {

    const [todoId, setTodoId] = useState("");
    const [error, setError] = useState(null);
    const [defaultId, setDefaultId] = useState("");
    const [success, setSuccess] = useState(false);

    const { dispatch } = useContext(BioContext);

    const BACKEND_URL = process.env.BACKEND_URL;

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            if (todoId === "") {
                setError("Invaild Id");
                return
            }
            const responce = await fetch(`${BACKEND_URL}/api/todos/${todoId}`);

            if (!responce.ok) {
                setError("Data not found");
                setTodoId("");
                return;
            }

            const json = await responce.json();
            dispatch({ type: 'SINGLE_TODO', payload: json.todo });
            setSuccess(true);

        } catch (err) {
            setError("Data not found or invalid Id");
        } finally {
            setTodoId("");
        }
    };

    useEffect(() => {
        const fetchIds = async () => {
            const responce = await fetch(`${BACKEND_URL}/api/todos`, {
                method: 'get'
            })

            if (responce) {
                const json = await responce.json();
                // const todos = ;
                const todoId = json.todo[0]._id;
                setDefaultId(todoId);

            }
        }
        fetchIds();
    })


    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 2000);

            return () => clearTimeout(timer);
        }

        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 2000)
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    return (
        <>
            <div className='searchbar'>
                <span className='search-text'>
                    Search Todo with their id's "Check with default id's" like - <b>{defaultId} </b> first todo's id
                </span>

                <div className='search-row'>
                    <input
                        type="text"
                        placeholder="Enter todo id"
                        value={todoId}
                        maxLength={40}
                        onChange={(e) => setTodoId(e.target.value)}
                    />
                    <button onClick={handleClick}>Enter</button>
                </div>

                {error && <div className='alert error'>{error} !!</div>}
                {success && <div className='alert success'>Task found</div>}
            </div>

        </>
    )
}

export default SearchBar