import React, { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import Snippet from "./Snippet";
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
  }, [props.token]);

  console.log(snippetsResponse);
  const renderSnippets= () => {
    if (
      !snippetsResponse ||
      snippetsResponse === null ||
      snippetsResponse === []
    ) {
      return <div>No Snippets in Library</div>;
    }
    return (
      <>
        {snippetsResponse.map((snippet) => {
          return (
            <Snippet 
                key={snippet.id}
                title={snippet.title}
                code={snippet.snippet}
                note={snippet.note}
                langId={snippet.language_id}
                />
          );
        })}
      </>
    );
  };
  return <div>{renderSnippets()}</div>;
}
export default Library;
