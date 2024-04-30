import { useState } from "react";
import { useRouter } from "next/navigation";

const RestaurantLlogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleLogin = async () => {
    // console.log(email, password);
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, login: true }),
    });
    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;

      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <h1> Login Component</h1>
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

          {error && !password && (
            <span className="input-error">Please Enter Valid Password</span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleLogin}>
            {" "}
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default RestaurantLlogin;
