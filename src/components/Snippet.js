import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import { supportedLanguages, languageAlias } from "../supported-languages";
import "./Snippet.css";

function Snippet({ id, title, code, note, langId }) {
  const [languageName, setLanguageName] = useState(null);

  useEffect(() => {
    let languageName = languageAlias[langId.toString()];
    // console.log(languageName);
    languageName = `language-${languageName}`;

    setLanguageName(languageName);
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <div key={id} className="Snippet mb-2">
      <div className="box">
        <h5 className="subtitle">{title}</h5>
        <div className="card-body">
          <pre>
            <code className={languageName}>{code}</code>
          </pre>
          <p>{note}</p>
        </div>
      </div>
    </div>
  );
}

export default Snippet;
