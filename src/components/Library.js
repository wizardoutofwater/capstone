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
    console.log(headers);
    axios.get("/api/user/snippets", { headers }).then((response) => {
      console.log(response);
      setSnippetsResponse(response.data.snippets);
    });

    // use effect runs before props passed the token on refresh, adding the props.token as a dependency ensures the call runs once props sends the token
  }, [props.token]);

  const renderSnippets = () => {
    if (
      !snippetsResponse ||
      snippetsResponse === null ||
      snippetsResponse === []
    ) {
      return;
      //   return <div>No Snippets in Library</div>;
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
