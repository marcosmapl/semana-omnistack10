import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DeveloperItem from './components/DeveloperItem'
import DeveloperForm from './components/DeveloperForm'

function App() {
  // useState is for update component state (value of atributes)
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    async function loadDevelopers() {
      const response = await api.get('/developers');

      setDevelopers(response.data);
    };

    loadDevelopers();
  }, []);

  async function handleAddDeveloper(data) {
    const response = await api.post('/developers', data);

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