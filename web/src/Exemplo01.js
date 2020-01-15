import React, {useState} from 'react';
import Header from './Header';
/*
  Conceitos principais do React
    * Componente: Bloco isolado e autônomo de algum tipo de conteúdo (HTML, CSS, JS)
    * Propriedade: Atributos de um compontente
    * Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
*/
function Exemplo01() {
  // useState retorna uma variável e uma função para atualizar seu estado
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter+1);
  }
  
  return (
    // <> ... </> 'fragments', containers de componentes
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
