import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  // Initialize state variables
  // Set initial values to imported array and first value of the dropdown menu
  const [foods, setFoods] = useState(spicyFoods);
  const [cuisine, setCuisine] = useState("All");

  function handleAddFood() {
    // Add a new food by creating a copy of the foods array using the spread operator
    // and adding the new food on to the end of the array
    const newFood = getNewSpicyFood();
    setFoods(() => [...foods, newFood]);
  }

  function handleLiClick(id) {
    // To delete foods from the list when clicked:
    // setFoods(() => foods.filter((food) => food.id !== id));

    // To update the heat level of a food when it's clicked
    // Create a copy and transform the foods array using .map()
    // Use conditional logic to only update one element by comparing the element's id to the desired id
    //    and returning a nondestructively updated food object if it's a match (or the original obj if not)
    const updatedFoods = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    // Use the transformed array to update the state of foods variable
    setFoods(updatedFoods);
  }

  // Get the cuisine selection
  // Use it to update cuisine's state
  function handleDropdown(e) {
    setCuisine(e.target.value);
  }

  // Create a copy of the foods array
  // Call .filter on the copied array
  // Use the state variable to return an array with all food objects that have a matching cuisine property
  const foodsToDisplay = foods.filter((food) => {
    if (cuisine === "All") {
      return true;
    } else {
      return food.cuisine === cuisine;
    }
  });

  // Create a copy of the foodsToDisplay array
  // Use .map() to transform the array of objects into an array of DOM elements
  // Refernce the array of DOM elements in the return statement when rendering the <ul>
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // Return JSX that includes
  //    a select element with an onChange event listener
  //    a button with an onClick listener
  //    and a dynamically rendered food list based on the value of the foodList array
  return (
    <div>
      <select name="filter" onChange={handleDropdown}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
