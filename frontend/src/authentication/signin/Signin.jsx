import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles/loginform.module.css";

const Signin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data.email)
    const url = "http://localhost:3000/login";
    // console.log(data.email)
    const response = await axios.post(url, {email: data.email, password: data.password},{ withCredentials: true });
    console.log(response.data.role)
    if(response.status===200){
      // console.log(response.data.role)
      if(response.data.role === "student"){
        console.log(response.role)
        localStorage.setItem("role","student");
        window.location.replace("/student")
      }else if(response.data.role === "teacher"){
        localStorage.setItem("role","teacher");
        window.location.replace("/teacher")
      }else{
        alert("Incorrect password or email!")
      }
    }else {
      alert ("Incorrect password or email!")
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container}>
            <h1>Sign in to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button onClick={handleSubmit} type="submit" className={styles.green_btn}>
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;