import React, { Component, useState, useEffect} from "react";
import Pizza from "../components/Pizza";
function PizzaList(props) {

  // get the id  - DONE
  // reflect selected pizza's info to form
  //    create ref for form elements you want to change
  //    get pizza data and put the data back into the form
  //    for submit, add extra functionality for editing, if editing:true it should make a different request
  // edit pizza there
  // locally change the pizza
  // make put request to db

  const handleEditPizza = async (e)=>{
    const pizzaID = e.target.id;
    const resp = await fetch("http://localhost:3000/pizzas")
    const data = await resp.json();
    const targetPizza =data.find(x=>x.id==pizzaID)
    props.setEditPizza(targetPizza)
  }
  
  const fetchData = async ()=>{
      const resp = await fetch("http://localhost:3000/pizzas")
      const data = await resp.json();
      
      props.setAllPizzas(data)
      
  }
  //console.log(pizzas)
  //line 19 and 26 is fucked up
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        
        {
         
         props.allPizzas.map(pizza=> <Pizza editPizza={handleEditPizza} key={pizza.id} id={pizza.id} size={pizza.size} topping={pizza.topping} vegetarian={pizza.vegetarian} />
         
        )
        }
      </tbody>
    </table>
  );
}

export default PizzaList;
