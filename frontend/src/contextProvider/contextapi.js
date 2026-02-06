import { createContext, useReducer } from 'react'

export const BioContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODO':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return { ...state, 
                todos: [ ...state.todos, action.payload] 
            }
        case 'DELETE_TODO': {
            return {
                todos: state.todos.filter(
                    todo => todo._id !== action.payload
                )
            }
        }
        default:
            return state
    }
}


export const Bioprovider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, {
        todos: null
    });

    const myName = "Faiz";

    return <BioContext.Provider value={{ ...state, dispatch, myName }}>
        {children}
    </BioContext.Provider>
}