import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';


function App() {



  const user = {name: "ph", role: "ADMINISTRADOR"};

  return (

    
    <div className="App"> 
      <header className="App-header">
       <Navbar user={user}/>
      </header>

    </div>
  );
}

export default App;
