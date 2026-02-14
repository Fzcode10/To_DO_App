import { useContext, useState, useEffect } from 'react'
//  import {ReducerContext} from '../hooks/useReducer'
import { BioContext } from '../contextProvider/contextapi'

const FullDetials = ({ todo }) => {


    const [status, setStatus] = useState(false);
    const [isEditable, setEditable] = useState(false);
    const [text, setText] = useState(`${todo.name}`);
    const [taskDone, setTaskDone] = useState(false);
    
    // const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);

    const { dispatch } = useContext(BioContext);

    const BACKEND_URL = process.env.BACKEND_URL;

    // const {dispatch} = ReducerContext();


    const handleClickEdit = () => {
        setEditable(true);
    }

    const handleDone = async () => {
        try {
            setEdited(false);
            const response = await fetch(`${BACKEND_URL}/api/todos/${todo._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: text })
            });

            if (!response.ok) {
                throw new Error("Failed to update todo");
            }else{
                setEdited(true);
            }


        } catch (error) {
            console.error(error.message);
        }
        setEditable(false);

    }

    // const onDeletedSuccess = () => {
    //     setDeleted(true);
    // } 

    const handleClickDelete = async () => {
        
        
        const response = await fetch(`${BACKEND_URL}/api/todos/${todo._id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // setDeleted(true);
            dispatch({ type: 'DELETE_TODO', payload: todo._id });
            // onDeletedSuccess();
        }
        // onDeletedSuccess();
    }

    // const handleClickCheckbox = async () => {
    //     const newStatus = !status;
    //     setStatus(newStatus);

    //     const updateTodo = { status: newStatus };

    //     const response = await fetch(`/todos/${todo._id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(updateTodo)
    //     });

    //     const json = await response.json();

    //     if (response.ok) {
    //         setStatus(json.todo.status);
    //     }
    // };

    // useEffect(() => {
    //     if (isFirstRender.current) {
    //         isFirstRender.current = false;
    //         return;
    //     }

    //     const statusHandler = async () => {
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_API_URL}/todos/${todo._id}`, {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ status })
    //             });

    //             if (!response.ok) {
    //                 throw new Error("Failed to update data");
    //             }
    //         } catch (err) {
    //             console.error(err.message);
    //         }
    //     };

    //     statusHandler();
    // }, [status, todo._id]);


    useEffect(() => {
        // console.log(todo.status);
        setStatus(todo.status);
    }, [todo.status]);

    useEffect(() => {
        // console.log(`deleted : ${deleted}`);
        // console.log(edited);
        // if(deleted){
        //     const timer = setTimeout(() => {
        //         setDeleted(false);
        //     }, 1000);

        //     return () => clearTimeout(timer);
        // }

        if(edited){
            const timer = setTimeout( () => {
                setEdited(false);
            }, 1000);

            return () => clearTimeout(timer);
        }

        if(taskDone){
            // console.log(taskDone);
            const timer = setTimeout(() => {
                setTaskDone(false);
            }, 2000)

            return () => clearTimeout(timer);
        }

    }, [ edited, taskDone])


    const handleCheckBox = async () => {
        const newStatus = !status;
        setStatus(newStatus);


        try {
            const response = await fetch(`${BACKEND_URL}/api/todos/${todo._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Update failed');
            }else{
                setTaskDone(true);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className='todo-continer'>

            {console.log(todo._id)}

            <label>
                <input
                    type='checkbox'
                    name='status'
                    checked={status}
                    onChange={handleCheckBox}
                />
                {(!status) ? "Do_Fast" : "complated"}
            </label>
 
            {/* <p>{myName}</p> */}

            {isEditable ? (
                <div className="edit-tooldiv">
                    <label className="edit-label">
                        <input
                            type="text"
                            className="edit-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button className="done-btn" onClick={handleDone}>
                            Done
                        </button>
                    </label>
                </div>
            ) : (
                <p className="todoName">{text}</p>
            )}


            <button className='edit-button' onClick={handleClickEdit}>Edit</button>


            <button className='delete-button' onClick={handleClickDelete}>Delete</button>

            {edited && <div className='edited'>Edited</div>}
            {taskDone && <div className='taskDone'>Task Completed!</div>}

            <hr></hr>

            {/* {console.log(todo)} */}

        </div>
    )
}

export default FullDetials 