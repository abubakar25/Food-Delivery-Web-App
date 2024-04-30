import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !email ||
      !password ||
      !c_password ||
      !name ||
      !city ||
      !address ||
      !contact
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, name, city, address, contact }),
    });
    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;

      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };
  return (
    <>
      <h1>SignUp Component</h1>
      <div className="input-wrapper">
        <div className="input-wrapper">
          <input
            type="email"
            className="input-field"
            placeholder="Enter Email id"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error && !email && (
            <span className="input-error">
              Please Enter Valid Email Address
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            className="input-field"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && (
            <span className="input-error">
              Password and Confirm Password not match
            </span>
          )}
          {error && !password && (
            <span className="input-error">Please Enter Valid Password</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            className="input-field"
            placeholder="Enter Confirm Password"
            value={c_password}
            onChange={(event) => setC_password(event.target.value)}
          />
          {passwordError && (
            <span className="input-error">
              Password and Confirm Password not match
            </span>
          )}
          {error && !c_password && (
            <span className="input-error">
              Please Enter Valid Confirm Password
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Retautant Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {error && !name && (
            <span className="input-error">Please Enter Valid Resto Name</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter City Name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          {error && !city && (
            <span className="input-error">Please Enter Valid City</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Full Adress"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {error && !address && (
            <span className="input-error">Please Enter Valid Adress</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Contact No."
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
          {error && !contact && (
            <span className="input-error">Please Enter Valid Contact</span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleSubmit}>
            {" "}
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};
export default RestaurantSignUp;
