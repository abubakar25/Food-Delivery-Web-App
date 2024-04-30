import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // console.log(name, email, password, confirmPassword, city, address, mobile);
    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !city ||
      !address ||
      !mobile
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch("http://localhost:3000/api/user", {
      method: "post",
      body: JSON.stringify({ name, email, password, city, address, mobile }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      console.log(response, "response");
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      alert("User Registered Successfully");
      if (props?.redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("failed");
    }
  };

  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter name"
        />
        {error && !name && (
          <span className="input-error">Please Enter Valid User Name </span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
        />
        {error && !email && (
          <span className="input-error">Please Enter Valid Email Address</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
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
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm password"
        />
        {error && !confirmPassword && (
          <span className="input-error">
            Please Enter Valid Confirm Password{" "}
          </span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter city"
        />
        {error && !city && (
          <span className="input-error">Please Enter Valid City</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Enter address"
        />
        {error && !address && (
          <span className="input-error">Please Enter Valid Address</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          placeholder="Enter mobile"
        />
        {error && !mobile && (
          <span className="input-error">Please Enter Valid Contact</span>
        )}
      </div>
      <div className="input-wrapper">
        <button onClick={handleSignUp} className="button">
          Signup
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
