import  {useContext}from 'react';
import { BioContext } from '../contextProvider/contextapi';

export const ReducerContext = () => {
    const context = useContext(BioContext);

    if(!context){ 
        throw Error('userWorkoutContext must be used inside a  WorkoutsContextprovider') 
    }

    return context;
} 
