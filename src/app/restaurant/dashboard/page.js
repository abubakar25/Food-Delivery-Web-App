"use client";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useState } from "react";
import "./../style.css";

const Dashboard = () => {
  const [addFood, setAddFood] = useState(false);
  return (
    <>
      <div>
        <RestaurantHeader />{" "}
        <button onClick={(e) => setAddFood(true)}>Add Food</button>
        <button onClick={(e) => setAddFood(false)}>DashBoard</button>
        {addFood ? <AddFoodItem setAddFood={setAddFood} /> : <FoodItemList />}
      </div>
    </>
  );
};
export default Dashboard;
