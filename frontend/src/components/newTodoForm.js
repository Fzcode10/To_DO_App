import  {useContext, useState} from 'react'
import { BioContext } from '../contextProvider/contextapi';

const NewTodo = () => {

    const [text, setText] = useState("");
    

    const {dispatch} = useContext(BioContext); 

    const handleClick = async (e) => {
        e.preventDefault();

        const newTodo = { name: text, status: false};
        // console.log(newTodo);

        const response = await fetch(`/todos/addnew`, {
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
        }else{
            console.log(JSON.stringify( newTodo ));
        }
    }

    return (
        <div className='addnew-todo'>
            <span >Add new todo from here</span>
            <input
                type="text"
                placeholder="Enter work here"
                value={text}
                maxLength={30}

                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleClick}>Add</button>
        </div>

    )
}

export default NewTodo