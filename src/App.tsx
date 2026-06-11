import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./app/components/login";
import { Inicio } from "./app/components/inicio";
import { ListadoProducto } from "./app/components/listadoproducto";
import { FormularioProducto } from "./app/components/form/formularioproducto";
import { IA } from "./app/components/ia/IA";
import { RutaProtegida } from "./app/components/RutaProtegida";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RutaProtegida>
              <Inicio />
            </RutaProtegida>
          }
        />

        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <ListadoProducto />
            </RutaProtegida>
          }
        />

        <Route
          path="/crear"
          element={
            <RutaProtegida>
              <FormularioProducto />
            </RutaProtegida>
          }
        />

        <Route
          path="/ia"
          element={
            <RutaProtegida>
              <IA />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;