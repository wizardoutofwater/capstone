import React, { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import Snippet from "./Snippet";
import { supportedLanguages, languageAlias } from "../supported-languages";
import "./Library.css";

function Library(props) {
  const [snippetsResponse, setSnippetsResponse] = useState(null);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    };
    axios.get("/api/user/snippets", { headers }).then((response) => {
      console.log(response);
      setSnippetsResponse(response.data.snippets);
    });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const renderSnippets= () => {
    if (
      !snippetsResponse ||
      snippetsResponse === null ||
      snippetsResponse === []
    ) {
        return
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
