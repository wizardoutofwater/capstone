import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function Login() {
  // form validation rules
  const validationSchema = Yup.object().shape({

    eMail: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      // .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        "Oops! Your password must be at least 8 characters long and contain a mix of letters, numbers, and symbols"
      ),
  
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    // return false;
    data = JSON.stringify(data);
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("https://localhost:3001/api/login", data, { headers })
      .then((response) => {
        localStorage.setItem("user-token", response.token);
        this.props.updateToken(response.token);
        this.props.history.push("/dashboard");
      });
  }

  return (
    <>
      <div className="sign-up  box has-text-centered">
        <h1 className="title">Log In</h1>
        <div className="columns is-vcentered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <p className="title">
                  “There are two hard things in computer science: cache
                  invalidation, naming things, and off-by-one errors.”
                </p>
                <p className="subtitle">Jeff Atwood</p>
              </div>
            </div>
          </div>
          <div className="column">
            <form>
              <div className="field has-text-left">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="e.g. ex@mple.com"
                  />
                </div>
              </div>

              <div className="field has-text-left">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="********"
                  />
                </div>
              </div>

              <button className="button is-primary">Sign In</button>
              <hr />
              <p>
                New Here? <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
