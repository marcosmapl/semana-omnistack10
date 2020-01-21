import React, {useState} from 'react';
import Header from './Header';

/*
  Example of principals concepts about React
    * Component: Isolated and autonomous block of some content (HTML, CSS, JS)
    * Property: Component atributes
    * State: Component informatios (note: are immutable)
*/
function Exemplo01() {
  
  // useState - creates a new immutable variable (component state)
  // and a function to update it value when necessary
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter+1);
  }
  
  return (
    // <> ... </> 'fragments', container of components
    <>
      <Header title="Meu Painel 09"/>
      <Header title="Meu Painel 01"/>
      <Header title="Meu Painel 02"/>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default Exemplo01;
