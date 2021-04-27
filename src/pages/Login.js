import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Login() {
    // form validation rules 
    const validationSchema = Yup.object().shape({
       
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Ts & Cs is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
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
      “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
    </p>
    <p class="subtitle">
      Jeff Atwood
    </p>
  </div>
     </div>
     </div>
     <div className="column">
     <form>
  <div className="field has-text-left">
    <label className="label">Email</label>
    <div className="control">
      <input className="input" type="email" placeholder="e.g. ex@mple.com"/>
    </div>
  </div>

  <div className="field has-text-left">
    <label className="label">Password</label>
    <div className="control">
      <input className="input" type="password" placeholder="********"/>
    </div>
  </div>

  <button className="button is-primary">Sign In</button>
  <hr/>
  <p>New Here? <a href="#">Sign Up</a></p>
</form>
</div>
</div>
</div>
      </>
    )
}

export { Login };