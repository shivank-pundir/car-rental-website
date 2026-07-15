import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Send correct data according to login/register
      const payload =
        state === "register"
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(`/api/user/${state}`, payload);

      if (data.success) {
        // Save token
        localStorage.setItem("token", data.token);

        // Set axios authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;

        // Update context
        setToken(data.token);

        // Clear form
        setName("");
        setEmail("");
        setPassword("");

        toast.success(data.message);

        setShowLogin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
   <div
  onClick={() => setShowLogin(false)}
  className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center bg-black/50"
>
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-80 sm:w-[360px] bg-white rounded-xl shadow-xl p-8 text-gray-600"
      >
        <h2 className="text-2xl font-semibold text-center">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "register" && (
          <div>
            <p className="mb-1">Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-md p-2 outline-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <p className="mb-1">Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md p-2 outline-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="mb-1">Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-md p-2 outline-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer font-medium"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer font-medium"
            >
              Register
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-primary hover:bg-blue-700 transition text-white py-2 rounded-md font-medium"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;