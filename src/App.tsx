import React from 'react';
import logo from './logo.svg';
import {FormularioProducto} from './app/components/form/formularioproducto'
import { ListadoProducto } from './app/components/listadoproducto';
import { Login } from './app/components/login';
function App() {
  return (
    <div className="App">
      <FormularioProducto />
      <ListadoProducto />
      <Login />
      
     
       
    </div>
  );
}

export default App;
