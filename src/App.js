import logo from './logo.svg';
import './App.css';
import './components/Navbar';

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
