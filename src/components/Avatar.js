import React from "react";
import './Avatar.css';


const Avatar = () => {
  return (
    <div className ="Avatar">
      <figure className="image is-flex is-128x128 has-text-centered mb-4">
        <img
          className="is-rounded  has-background-link-light"
          src="./avatar-color-75.svg"
          alt="user avatar"
        />
        {/* <div className="">@username</div> */}
      </figure>
    </div>
  );
};

export default Avatar;
