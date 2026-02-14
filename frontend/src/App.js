import {BrowserRouter } from 'react-router-dom'

import Navbar from './components/navbar';
import Home from './pages/home'
import {Bioprovider} from './contextProvider/contextapi'
import SearchBar from './components/searchbar'


function App() {
  return ( 
    <> 
    <Bioprovider>
     <BrowserRouter>
      <Navbar/>
      <SearchBar/>
      <Home/>
     </BrowserRouter> 
    </Bioprovider>
    </>
  );
}

export default App;
