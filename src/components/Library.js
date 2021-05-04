import React, { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import Snippet from "./Snippet";
import { supportedLanguages, languageAlias } from "../supported-languages";
import "./Library.css";

function Library(props) {
  const [snippetsResponse, setSnippetsResponse] = useState(null);

  useEffect(() => {
    if (!props.token) return;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    };
    axios.get("/api/user/snippets", { headers }).then((response) => {
      console.log(response);
      setSnippetsResponse(response.data.snippets);
    });

    // use effect runs before props passed the token on refresh, adding the props.token as a dependency ensures the call runs once props sends the token
  }, [props.token]);

  const renderSnippets = () => {
    // if null render nothing, this will help the flashing issues
    if (snippetsResponse === null) {
      return;
    }
    if (!snippetsResponse || snippetsResponse.length == 0) {
      return (
        <div className="columns is-vcentered has-text-centered pt-5 mt-5">
          <div className="column">
            <h5 className="title is-size-4">
              Your library is empty. Add a snippet to start collecting useful
              code bits and say goodbye to bookmarks!
            </h5>
          </div>
        </div>
      );
    }
    return (
      <>
        {snippetsResponse.map((snippet) => {
          let languageName = languageAlias[snippet.language_id.toString()];
          return (
            <Snippet
              key={snippet.id}
              id={snippet.id}
              title={snippet.title}
              code={snippet.snippet}
              note={snippet.note}
              langId={snippet.language_id}
              langName={languageName}
              token={props.token}
            />
          );
        })}
      </>
    );
  };
  return <>{renderSnippets()}</>;
}
export default Library;
