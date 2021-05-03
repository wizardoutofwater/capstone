import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import axios from 'axios'
import "../assets/css/prism-okadia.css";
import { supportedLanguages, languageAlias } from "../supported-languages";
import "./Snippet.css";

function Snippet({ id, title, code, note, langId, langName, token }) {
  // const [languageName, setLanguageName] = useState(null);

  // useEffect(() => {
  //   let languageName = languageAlias[langId.toString()];
  //   // console.log(languageName);
  //   languageName = `language-${languageName}`;

  //   setLanguageName(languageName);
  // }, []);

 const _handleClick = (event) => {
   console.log(title)
      console.log(`delete clicked for ${id}`)
    
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .delete(`/api/user/snippets/${id}`, {
        headers,
      })
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div key={id} className="Snippet mb-4">
      <div className="box">
        <div className="columns is-vcentered">
          <div className="column">
            <h5 className="title is-size-4">{title}</h5>
          </div>
          <div className="control">
            <div className="tags has-addons is-right">
              <span className="butag is-info is-light">{langName}</span>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }}
                className="butag is-light is-clickable"
              >
                COPY
              </span>
            </div>
          </div>
        </div>

        <div className="card-body">
          <pre>
            <code className={`language-${langName}`}>{code}</code>
          </pre>
          <div className="columns is-vcentered">
            <div className="column">
              <p>{note}</p>
            </div>
          </div>
          <div className=" ">
            <div className="buttons is-right">
              <button className="button is-primary  is-small">Edit</button>
              <button 
              id={id}
              onClick={(event) =>_handleClick(event)}
              className="button is-small">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Snippet;
