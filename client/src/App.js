import './App.css';
import React, { useContext } from 'react';
import { Router } from '../src/Routes/Routes/index'

function App() {

  return (
    <section className='sectionApp'>
      <div className="App">
        <Router />
      </div>
    </section>
  );
}

export default App;
