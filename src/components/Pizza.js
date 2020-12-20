import React from "react"

const Pizza = (props) => {
  //console.log(props) 
  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
       <td>{props.vegetarian ? "Yes": "no"}</td>
      <td><button onClick={props.editPizza} id={props.id}  type="button" className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
