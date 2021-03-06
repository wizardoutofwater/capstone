import React, { useState, useEffect } from "react";
import axios from "axios";
import Snippet from "./Snippet";
import ListSnippit from "./ListSnippet";
import { languageAlias } from "../supported-languages";
import "./Library.css";
import PaginationList from "./PaginationList";

function Library(props) {
  const [snippetsResponse, setSnippetsResponse] = useState(null);
  const [listView, isListView] = useState(false);
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState()


  useEffect(() => {
    if (!props.token) return;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    };
    axios.get("/api/user/snippets", { headers }).then((response) => {
      setSnippetsResponse(response.data.response.snippits);
      setTotalPages(response.data.response.totalPages)
      setCurrentPage(response.data.response.currentPage)
    })

  
  
    
    // use effect runs before props passed the token on refresh, adding the props.token as a dependency ensures the call runs once props sends the token
  }, [props.token]);

  const pageList = []
  for (let i =  1; i <= totalPages; i++) {
    pageList.push(i)
  }


  const handlePageChange = (page) => {
    setCurrentPage(page)
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    };
    axios.get(`/api/user/snippets?page=${page - 1}`, { headers }).then((response) => {
      console.log(response.data.response.snippits)
      setSnippetsResponse(response.data.response.snippits);
    })
}

  const renderSnippets = () => {

    // if null render nothing, this will help the flashing issues

    if (snippetsResponse === null) {
      return;
    }
    if (!snippetsResponse || snippetsResponse.length === 0) {
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



    if (!listView) {
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
    } else {
      return (
        <>
          {snippetsResponse.map((snippet) => {
            let languageName = languageAlias[snippet.language_id.toString()];
            return (
              <ListSnippit
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
    }
  };
  return (
    <>
      <div className="is-flex flex-right">
        <button
          className="button d-shadow mb-4"
          onClick={(event) => {
            event.preventDefault();
            isListView(!listView);
          }}
        >
          <span className="icon">
            <i
              className={!listView ? "fas fa-list" : "fas fa-grip-horizontal"}
            ></i>
          </span>
          <span>{!listView ? "List View" : "Grid View"}</span>
        </button>
      </div>

      {renderSnippets()}
      <PaginationList totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange}/>
    </>
  );
}
export default Library;
