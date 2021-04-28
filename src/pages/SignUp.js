import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function SignUp() {
  const [error, setError] = useState(null);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        "Oops! Your password must be at least 8 characters long and contain a mix of letters, numbers, and symbols"
      ),
      // confirmEmail -- Add in
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // TEST -- display form data on success
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    // return false;
    data = JSON.stringify(data);
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://localhost:3001/api/signup", data, { headers })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user-token", response.token);
        this.props.updateToken(response.token);
        this.props.history.push("/dashboard");
      });
  }

  return (
    <>
      <div className="sign-up  box has-text-centered">
        <h1 className="title">Sign Up</h1>
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
          <div className="column ">
            <div className="box">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field has-text-left">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      {...register("email")}
                      className="input"
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
                  <p className="help">
                    Use at least 8 characters and a mix of letters, numbers, and
                    symbols
                  </p>
                  <p className="help is-danger">{errors.password?.message}</p>
                </div>

                <div className="field has-text-left ">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input
                      {...register("confirmPassword")}
                      className="input"
                      type="password"
                      placeholder="********"
                    />
                  </div>
                  <p className="help is-danger">
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                <button className="button is-primary">Sign Up</button>
                <hr />
                <p>
                  Already have an account? <Link to="/login">Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default SignUp;
