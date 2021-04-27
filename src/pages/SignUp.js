import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function SignUp() {
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
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
                    {...register("eMail")}
                    className="input"
                    placeholder="e.g. ex@mple.com"
                  />
                </div>
                <p className="help is-danger">{errors.eMail?.message}</p>
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
                <p className="help">Use at least 8 characters and a mix of letters, numbers, and symbols</p>
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
                <p className="help is-danger">{errors.confirmPassword?.message}</p>
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
