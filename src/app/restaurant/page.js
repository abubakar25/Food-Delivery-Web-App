"use client";
import { useState } from "react";
import Footer from "../_components/Footer";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import "./style.css";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      {" "}
      <div className="container">
        <RestaurantHeader />
        <h1>Restautant Login/SignUp Page</h1>
        <div>
          {login ? <RestaurantLogin /> : <RestaurantSignUp />}

          <button onClick={() => setLogin(!login)} className="button-link">
            {login
              ? "Do not have any account ? SignUp"
              : "Already Have a account ? Login"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Restaurant;
