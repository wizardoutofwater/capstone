import React from "react";
import landingImage from "../assets/marginalia-programming.png";
function Landing() {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="columns is-vcentered">
          <div className="column">
            <div className="box">
              <h1 className="title has-text-centered is-1 mb-2">A Place for Code</h1>
              
              <p className="block mb-2">
                Build your library by adding the useful code snippets you find yourself
                using over and over.  
              </p>
            
              <p className="block mb-2">
              Keep track of those cool tricks you read on a blog, yet 
                can never seem to find again.  
              </p>
             
              <p className="block mb-2">
                That perfect answer you found while scrolling through StackOverflow?
                Save it to Snippit and you'll always have it readily available when you need it.
              </p>

              <p className="subtitle has-text-centered">
                Skip the bookmarks. <br/>
                 Save it to Snippit instead!
              </p>
              <div className="field is-grouped is-justify-content-center ">
              <p className="control">
                <a className="button is-medium" href="/signup">Sign Up</a>
                </p>
                <p className="control">
                <a className="button is-medium" href="/login">Log In</a>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="">
              <figure className="image has-text-centered">
                <img
                  src={landingImage}
                  alt="stylized person sitting at computer looking at code"
                />
                {/* <div className="">@username</div> */}
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Landing;
