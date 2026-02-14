import  {useContext, useState, useEffect} from 'react'
import { BioContext } from '../contextProvider/contextapi';

const NewTodo = () => {

    const [text, setText] = useState("");
    const [missingPart, setMissingPart] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const {dispatch} = useContext(BioContext); 

    const handleClick = async (e) => {
        e.preventDefault();

        const newTodo = { name: text, status: false};
        // console.log(newTodo);
        // console.log(missingPart);

        const response = await fetch(`/api/todos/addnew`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });

        const json = await response.json();
        console.log(json);

        if(response.ok){
            dispatch({type: 'CREATE_TODO', payload: json.todo});
            setText("");
            
            setSuccess(true);
            setMissingPart(json.missingBodyPart);
            console.log(json.missingBodyPart);
        }else{
            // console.log(JSON.stringify( newTodo ));
            setSuccess(false);
            setMissingPart([]);
            setError(json.error);
        }
    }

    useEffect(() => {
        if(success){
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 10000);

            return () => clearTimeout(timer);
        }

        if(error){
            const timer = setTimeout(() => {
                setError(null);
            }, 9000);

            return () => clearTimeout(timer);
        }

    }, [error, success]);

    return (
        <div className='addnew-todo'>
            <span >Add new todo from here</span>
            <input
                type="text"
                placeholder="Enter work here"
                value={text}
                maxLength={30}

                onChange={(e) => setText(e.target.value)}
                className={missingPart.includes('name') ? "alert error" : ""}
            />
            <button onClick={handleClick}>Add</button>
            {error && <div className='alert error'>{error} !!</div>}
            {success && <div className='alert success'>Task added successful</div>}
        </div>

    )
}

export default NewTodo