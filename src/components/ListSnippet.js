import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import axios from "axios";
import "../assets/css/prism-okadia.css";
// import { supportedLanguages, languageAlias } from "../supported-languages";
import "./ListSnippit.css";

function ListSnippit({ id, title, code, note, langId, langName, token }) {
  const [copied, setCopied] = useState(false);
  const [markdown, setMarkdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const _handleClick = (event) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .delete(`/api/user/snippets/${id}`, {
        headers,
      })
      .then((response) => {
        window.location.reload();
      });
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="listSnippit">
      <div className="level" key={id}>
        <div
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className="level-left pointer"
        >
          <span className="icon is-small">
            <i
              className={
                isExpanded ? "fas fa-angle-down" : "fas fa-angle-right"
              }
            ></i>
          </span>
          <h5 className="title is-size-4 level-item">{title}</h5>
        </div>
        <div className="level-right">
          <div className="control">
            <div className="tags has-addons is-right">
              <span className="butag is-info is-light">{langName}</span>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
                className={
                  copied ? "butag is-primary" : "butag is-light is-clickable"
                }
              >
                {copied ? "Copied to Clipboard" : "Copy to Clipboard"}
              </span>
              <span
                onClick={() => {
                  let markDownCode = "```\n" + code + "\n```";
                  navigator.clipboard.writeText(markDownCode);
                  setMarkdown(true);
                  setTimeout(() => {
                    setMarkdown(false);
                  }, 1000);
                }}
                className={
                  markdown ? "butag is-primary" : "butag is-link is-clickable"
                }
              >
                {markdown ? "Copied to Markdown" : "Copy to Markdown"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={isExpanded ? "card-body mb-4" : "is-hidden"}>
        <pre>
          <code className={`language-${langName}`}>{code}</code>
        </pre>
        <div className="columns is-vcentered">
          <div className="column">
            <p>{note}</p>
          </div>
        </div>
        <div>
          <div className="buttons is-right">
            {/* <button className="button is-primary  is-small">Edit</button> */}
            <button
              id={id}
              onClick={(event) => _handleClick(event)}
              className="button is-small"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSnippit;
