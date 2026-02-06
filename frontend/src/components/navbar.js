import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import {BioContext} from '../contextProvider/contextapi'


const Navbar = () => {
    const {myName } = useContext(BioContext);
    return (
        <header>
            <div className='container'> 

            <Link>
             <h1>I will add navbuttons later after adding the new functions.</h1>
              
            </Link>
            </div>

        </header>
    )
}

export default Navbar