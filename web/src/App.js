import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DeveloperItem from './components/DeveloperItem'
import DeveloperForm from './components/DeveloperForm'

/**
 * The Web Application
 * Load and list all registered developers.
 * Display a register form for new developers.
 */
function App() {

  // useState is for update component state (value of atributes)
  const [developers, setDevelopers] = useState([]);

  // useEffect - runs only once
  useEffect(() => {
    async function loadDevelopers() {
      // perform a request to backend api, requesting all registered developers.
      const response = await api.get('/developers');

      // sets initial value for developers array (list of registered developers)
      setDevelopers(response.data);
    };

    // run load developers functions
    loadDevelopers();
  }, []);

  // handler function for new developer submit event
  async function handleAddDeveloper(data) {
    // makes a post to backend, sending new developer data
    const response = await api.post('/developers', data);

    // updates developers arrays (list of registered developers)
    setDevelopers([...developers, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DeveloperForm onSubmit={handleAddDeveloper} />
      </aside>
      <main>
        <ul>
          {developers.map(dev => (
            <DeveloperItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;