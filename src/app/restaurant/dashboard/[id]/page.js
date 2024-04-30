"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItem = (props) => {
  const id = props?.params?.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img_path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id
    );
    response = await response.json();
    if (response.success) {
      setName(response?.result?.name);
      setPrice(response?.result?.price);
      setPath(response?.result?.img_path);
      setDescription(response?.result?.description);
    }
  };

  const handleEditFoodItem = async () => {
    if (!name || !img_path || !price || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,
      {
        method: "PUT",
        body: JSON.stringify({ name, price, img_path, description }),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("data has been updated ");
      router.push("../dashboard");
    } else {
      alert("data is not updated please try again");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Update Food Item</h1>
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
              placeholder="Enter Image Path"
              value={img_path}
              onChange={(event) => setPath(event.target.value)}
            />
            {error && !img_path && (
              <span className="input-error">
                Please Enter Valid Food Image Path
              </span>
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
            <button className="button" onClick={handleEditFoodItem}>
              {" "}
              Update Food Item
            </button>
          </div>

          <div className="input-wrapper">
            <button
              className="button"
              onClick={() => router.push("../dashboard")}
            >
              {" "}
              Back to Food Item List
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditFoodItem;
