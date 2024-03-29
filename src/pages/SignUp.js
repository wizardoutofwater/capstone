import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function SignUp(props) {
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

  const onSubmit = (data) => {
    data = JSON.stringify(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("/api/signup", data, { headers })
      .then((response) => {
        localStorage.setItem("user-token", response.data.accessToken);
        props.updateToken(response.data.accessToken);
        props.history.push("/dashboard/add");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong");
        }
      });
  };

  return (
    <>
    <section className="hero is-fullheight-with-navbar is-justify-content-center">
      <div className="sign-up  box has-text-centered">
        <h1 className="title">Sign Up</h1>
        <div className="columns is-vcentered">
          <div className="column is-half">
         
                <p className="title">
                  “There are two hard things in computer science: cache
                  invalidation, naming things, and off-by-one errors.”
                </p>
                <p className="subtitle">Jeff Atwood</p>
            
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
                  <p className="help is-danger">{error ? error : ""}</p>
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
      </section>
    </>
  );
}

export default SignUp;
