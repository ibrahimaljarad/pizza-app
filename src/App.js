import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
function App() {
  const [pizzas,setPizzas]= React.useState([])

  const [editPizza, setEditPizza] = React.useState({})

  return (
    <Fragment>
      <Header />

        <PizzaForm allPizzas={pizzas} setAllPizzas={setPizzas} editPizza={editPizza} setEditPizza={setEditPizza}/>
        <PizzaList allPizzas={pizzas} setAllPizzas={setPizzas}  editPizza={editPizza} setEditPizza={setEditPizza}/>

    </Fragment>
  );
}

export default App;
