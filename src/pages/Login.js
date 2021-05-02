import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function Login(props) {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    data = JSON.stringify(data);
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("/api/login", data, { headers })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user-token", response.data.accessToken);
        props.updateToken(response.data.accessToken);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(
          err.response ? err.response.data.error : "Something went wrong"
        );
      });
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field has-text-left">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    {...register("email")}
                    className="input"
                    type="email"
                    placeholder="e.g. ex@mple.com"
                  />
                </div>
                <p className="help is-danger">{errors.email?.message}</p>
              </div>

              <div className="field has-text-left">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    {...register("password")}
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
