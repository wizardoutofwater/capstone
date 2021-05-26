import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div className="columns is-vcentered has-text-centered pt-5">
      <div className="column">
        <h1 className="title is-size-3">
          <i className="fas fa-exclamation-circle"></i>
        </h1>
        <h5 className="title is-size-4">{errorMessage}</h5>
      </div>
    </div>
  );
};

export default Error;
