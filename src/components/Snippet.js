import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import '../assets/prism-okadia.css'
import { supportedLanguages, languageAlias } from "../supported-languages";
import "./Snippet.css";

function Snippet({ id, title, code, note, langId, langName }) {
  // const [languageName, setLanguageName] = useState(null);

  // useEffect(() => {
  //   let languageName = languageAlias[langId.toString()];
  //   // console.log(languageName);
  //   languageName = `language-${languageName}`;

  //   setLanguageName(languageName);
  // }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div key={id} className="Snippet mb-2">
      <div className="box">
      <div>
        <h5 className="title">{title}</h5>
        <div className="control">
          <div className="tags has-addons">
            <span className="butag is-dark">{langName}</span>
            <span className="butag is-info">0.9.2</span>
          </div>
        </div>
        </div>

        <div className="card-body">
          <pre>
            <code className={`language-${langName}`}>{code}</code>
          </pre>
          <p>{note}</p>
        </div>
      </div>
    </div>
  );
}

export default Snippet;
