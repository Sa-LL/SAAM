import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login/Login"
import Registro from "./Components/Registro/Registro"
import Mapa from "./Components/Mapa/Mapa";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/registro" component={Registro} />
      <Route exact path="/mapa" component={Mapa} />
    </Router>
  );
}

export default App;
