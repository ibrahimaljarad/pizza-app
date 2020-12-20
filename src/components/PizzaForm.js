import React, { Component, useState, useEffect} from "react";

// editpizza state is passed here, now reflect it to form. edit it then update it locally and send it to DB

const PizzaForm = (props) => {

  const [newPizza,setNewPizza]= useState({
    size:"",
    topping:"",
    vegetarian:false
  })

  const addPizza = async (event) =>{
    if(newPizza.id){
      event.preventDefault()
      fetch(`http://localhost:3000/pizzas/${newPizza.id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newPizza)
    }).then(request=>fetch(`http://localhost:3000/pizzas`))
      .then(resp=>resp.json())
      .then(data=>props.setAllPizzas([...data]))
      .then(setNewPizza({
        size:"",
        topping:"",
        vegetarian:false
      }))
      .catch(err=>console.log("put failed!",err))
      
    }
    else{
      event.preventDefault()
      //pushes data to database
    fetch("http://localhost:3000/pizzas",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newPizza)
    }).then(props.setAllPizzas([
      ...props.allPizzas,newPizza
    ])).catch(err=>console.log("post failed",err))
    // passes new pizza to the state in pizzaList locally
    //console.log(props)
    
    }
    
  }
  const textInput = React.useRef();
  const dropdownInput = React.useRef();
  const radioInput = React.useRef();

  const handleInput = (event)=>{
    if (event.target.type === "text"){
      setNewPizza({
        ...newPizza,
        topping:event.target.value
      })
    
    }else if (event.target.type === "select-one" ){
         setNewPizza({
           ...newPizza,
           size : event.target.value
         })
    }else if( event.target.type==="radio"){
        event.target.value==="Vegetarian"?setNewPizza({...newPizza,vegetarian:true}):setNewPizza({...newPizza,vegetarian:false})
    }
  }

  console.log(props.editPizza)

  useEffect(()=>{
    setNewPizza({...props.editPizza})
  },[props.editPizza])

  



  return(
    <form onSubmit={addPizza}>
      <div className="form-row">
        <div className="col-5">
            <input ref={textInput} onChange={handleInput} type="text" className="form-control" placeholder="Pizza Topping" value={newPizza.topping}/>
        </div>
        <div className="col">
          <select ref={dropdownInput}  onChange={handleInput} className="form-control" value={newPizza.size}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div  className="col">
          <div ref={radioInput} className="form-check">
            <input  className="form-check-input" onChange={handleInput} name="vegetarian" type="radio" value="Vegetarian" checked={newPizza.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" onChange={handleInput} name="vegetarian" type="radio" value="Not Vegetarian" checked={!newPizza.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button  type="submit" className="btn btn-success">Submit</button>
        </div>
      </div>
      </form>
  )
}

export default PizzaForm
