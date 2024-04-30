import { useState } from "react";

const AddFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img_path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    if (!name || !price || !img_path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let resto_id;

    const restoData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restoData) {
      resto_id = restoData._id;
    }
    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({ name, price, img_path, description, resto_id }),
    });
    response = await response.json();

    if (response.success) {
      alert("Food Item Added");
      props.setAddFood(false);
    } else {
      alert("Food Item Not Added");
    }
  };
  return (
    <>
      <div className="container">
        <h1>Add New Food Item</h1>
        <div className="input-wrapper">
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              placeholder="Enter Food Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {error && !name && (
              <span className="input-error">Please Enter Valid Food Name</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              placeholder="Enter Food Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            {error && !price && (
              <span className="input-error">Please Enter Valid Food Price</span>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              placeholder="Enter Food Path"
              value={img_path}
              onChange={(event) => setPath(event.target.value)}
            />
            {error && !img_path && (
              <span className="input-error">Please Enter Valid Food Path</span>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              placeholder="Enter Food Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            {error && !description && (
              <span className="input-error">
                Please Enter Valid Food Description
              </span>
            )}
          </div>

          <div className="input-wrapper">
            <button className="button" onClick={handleSubmit}>
              {" "}
              Add Food Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddFoodItem;
