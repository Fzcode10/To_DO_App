import {BrowserRouter } from 'react-router-dom'

import Navbar from './components/navbar';
import Home from './pages/home'
import {Bioprovider} from './contextProvider/contextapi'


function App() {
  return ( 
    <>
    <Bioprovider>
     <BrowserRouter>
      <Navbar/>
      <Home/>
     </BrowserRouter> 
    </Bioprovider>
    </>
  );
}

export default App;
