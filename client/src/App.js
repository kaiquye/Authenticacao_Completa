import './App.css';
import React, { useContext } from 'react';
import AppBar from '../src/components/AppBar/index.jsx'
import { FormularioLogin } from './components/FormularioLogin';
import { AuthContext } from './context/Authentication';

function App() {

  const { Login } = useContext(AuthContext)

  return (
    <section className='sectionApp'>
      <div className="App">
        <AppBar />
        <FormularioLogin login={Login} />
      </div>
    </section>
  );
}

export default App;
